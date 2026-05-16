package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/throwaway-email-sdk"
	"github.com/voxgig-sdk/throwaway-email-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestV2nEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.V2n(nil)
		if ent == nil {
			t.Fatal("expected non-nil V2nEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := v2nBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "v2n." + _op, _mode); _shouldSkip {
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
		v2nRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.v2n", setup.data)))
		var v2nRef01Data map[string]any
		if len(v2nRef01DataRaw) > 0 {
			v2nRef01Data = core.ToMapAny(v2nRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = v2nRef01Data

		// LOAD
		v2nRef01Ent := client.V2n(nil)
		v2nRef01MatchDt0 := map[string]any{}
		v2nRef01DataDt0Loaded, err := v2nRef01Ent.Load(v2nRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if v2nRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func v2nBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "v2n", "V2nTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read v2n test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse v2n test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"v2n01", "v2n02", "v2n03", "v201", "v202", "v203"},
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
