# V2n entity test

require "minitest/autorun"
require "json"
require_relative "../ThrowawayEmail_sdk"
require_relative "runner"

class V2nEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ThrowawayEmailSDK.test(nil, nil)
    ent = testsdk.V2n(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = v2n_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "v2n." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set THROWAWAYEMAIL_TEST_V_N_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    v2n_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.v2n")))
    v2n_ref01_data = nil
    if v2n_ref01_data_raw.length > 0
      v2n_ref01_data = Helpers.to_map(v2n_ref01_data_raw[0][1])
    end

    # LOAD
    v2n_ref01_ent = client.V2n(nil)
    v2n_ref01_match_dt0 = {}
    v2n_ref01_data_dt0_loaded = v2n_ref01_ent.load(v2n_ref01_match_dt0, nil)
    assert !v2n_ref01_data_dt0_loaded.nil?

  end
end

def v2n_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "v2n", "V2nTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ThrowawayEmailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["v2n01", "v2n02", "v2n03", "v201", "v202", "v203"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["THROWAWAYEMAIL_TEST_V_N_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "THROWAWAYEMAIL_TEST_V_N_ENTID" => idmap,
    "THROWAWAYEMAIL_TEST_LIVE" => "FALSE",
    "THROWAWAYEMAIL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["THROWAWAYEMAIL_TEST_V_N_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["THROWAWAYEMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = ThrowawayEmailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["THROWAWAYEMAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["THROWAWAYEMAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
