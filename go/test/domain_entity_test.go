package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/throwaway-email-sdk/go"
	"github.com/voxgig-sdk/throwaway-email-sdk/go/core"

	vs "github.com/voxgig-sdk/throwaway-email-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const domainEntityLiveStrict = true


func TestDomainEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Domain(nil)
		if ent == nil {
			t.Fatal("expected non-nil DomainEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Domain(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ThrowawayEmailError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := domainBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "domain." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			liveMiss(t, domainEntityLiveStrict, "Live entity test blocked: %s", "the flow loads a domain record it has no list to find")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		domainRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.domain")))
		var domainRef01Data map[string]any
		if len(domainRef01DataRaw) > 0 {
			domainRef01Data = core.ToMapAny(domainRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = domainRef01Data

		// LOAD
		domainRef01Ent := client.Domain(nil)
		domainRef01MatchDt0 := map[string]any{
			"id": domainRef01Data["id"],
		}
		domainRef01DataDt0Loaded, err := domainRef01Ent.Load(domainRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		domainRef01DataDt0LoadResult := core.ToMapAny(entityData(domainRef01DataDt0Loaded))
		if domainRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if domainRef01DataDt0LoadResult["id"] != domainRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func domainBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "domain", "DomainTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read domain test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse domain test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"domain01", "domain02", "domain03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("THROWAWAY_EMAIL_TEST_DOMAIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"THROWAWAY_EMAIL_TEST_DOMAIN_ENTID": idmap,
		"THROWAWAY_EMAIL_TEST_LIVE":      "FALSE",
		"THROWAWAY_EMAIL_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["THROWAWAY_EMAIL_TEST_DOMAIN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["THROWAWAY_EMAIL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewThrowawayEmailSDK(core.ToMapAny(mergedOpts))
	}

	live := env["THROWAWAY_EMAIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["THROWAWAY_EMAIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
