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

func TestV3nEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.V3n(nil)
		if ent == nil {
			t.Fatal("expected non-nil V3nEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := v3nBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "v3n." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set THROWAWAYEMAIL_TEST_V_N_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		v3nRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.v3n", setup.data)))
		var v3nRef01Data map[string]any
		if len(v3nRef01DataRaw) > 0 {
			v3nRef01Data = core.ToMapAny(v3nRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = v3nRef01Data

		// LOAD
		v3nRef01Ent := client.V3n(nil)
		v3nRef01MatchDt0 := map[string]any{}
		v3nRef01DataDt0Loaded, err := v3nRef01Ent.Load(v3nRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if v3nRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func v3nBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "v3n", "V3nTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read v3n test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse v3n test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"v3n01", "v3n02", "v3n03", "v301", "v302", "v303"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("THROWAWAYEMAIL_TEST_V_N_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"THROWAWAYEMAIL_TEST_V_N_ENTID": idmap,
		"THROWAWAYEMAIL_TEST_LIVE":      "FALSE",
		"THROWAWAYEMAIL_TEST_EXPLAIN":   "FALSE",
		"THROWAWAYEMAIL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["THROWAWAYEMAIL_TEST_V_N_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["THROWAWAYEMAIL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["THROWAWAYEMAIL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewThrowawayEmailSDK(core.ToMapAny(mergedOpts))
	}

	live := env["THROWAWAYEMAIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["THROWAWAYEMAIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
