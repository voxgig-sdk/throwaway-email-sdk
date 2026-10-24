# Domain entity test

require "minitest/autorun"
require "json"
require_relative "../ThrowawayEmail_sdk"
require_relative "runner"

class DomainEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ThrowawayEmailSDK.test(nil, nil)
    ent = testsdk.Domain(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ThrowawayEmailConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ThrowawayEmailSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Domain(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = domain_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "domain." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a domain record it has no list to find")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    domain_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.domain")))
    domain_ref01_data = nil
    if domain_ref01_data_raw.length > 0
      domain_ref01_data = Helpers.to_map(domain_ref01_data_raw[0][1])
    end

    # LOAD
    domain_ref01_ent = client.Domain(nil)
    domain_ref01_match_dt0 = {
      "id" => domain_ref01_data["id"],
    }
    domain_ref01_data_dt0_loaded = domain_ref01_ent.load(domain_ref01_match_dt0, nil)
    domain_ref01_data_dt0_load_result = Helpers.to_map(domain_ref01_data_dt0_loaded.respond_to?(:data_get) ? domain_ref01_data_dt0_loaded.data_get : domain_ref01_data_dt0_loaded)
    assert !domain_ref01_data_dt0_load_result.nil?
    assert_equal domain_ref01_data_dt0_load_result["id"], domain_ref01_data["id"]

  end
end

def domain_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "domain", "DomainTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ThrowawayEmailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["domain01", "domain02", "domain03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["THROWAWAY_EMAIL_TEST_DOMAIN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "THROWAWAY_EMAIL_TEST_DOMAIN_ENTID" => idmap,
    "THROWAWAY_EMAIL_TEST_LIVE" => "FALSE",
    "THROWAWAY_EMAIL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["THROWAWAY_EMAIL_TEST_DOMAIN_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["THROWAWAY_EMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = ThrowawayEmailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["THROWAWAY_EMAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["THROWAWAY_EMAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
