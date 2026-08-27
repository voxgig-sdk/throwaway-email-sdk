<?php
declare(strict_types=1);

// Domain entity test

require_once __DIR__ . '/../throwawayemail_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DomainEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ThrowawayEmailSDK::test(null, null);
        $ent = $testsdk->Domain(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = domain_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "domain." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set THROWAWAY_EMAIL_TEST_DOMAIN_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $domain_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.domain")));
        $domain_ref01_data = null;
        if (count($domain_ref01_data_raw) > 0) {
            $domain_ref01_data = Helpers::to_map($domain_ref01_data_raw[0][1]);
        }

        // LOAD
        $domain_ref01_ent = $client->Domain(null);
        $domain_ref01_match_dt0 = [
            "id" => $domain_ref01_data["id"],
        ];
        $domain_ref01_data_dt0_loaded = $domain_ref01_ent->load($domain_ref01_match_dt0, null);
        $domain_ref01_data_dt0_load_result = Helpers::to_map(is_object($domain_ref01_data_dt0_loaded) && method_exists($domain_ref01_data_dt0_loaded, 'data_get') ? $domain_ref01_data_dt0_loaded->data_get() : $domain_ref01_data_dt0_loaded);
        $this->assertNotNull($domain_ref01_data_dt0_load_result);
        $this->assertEquals($domain_ref01_data_dt0_load_result["id"], $domain_ref01_data["id"]);

    }
}

function domain_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/domain/DomainTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ThrowawayEmailSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["domain01", "domain02", "domain03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("THROWAWAY_EMAIL_TEST_DOMAIN_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "THROWAWAY_EMAIL_TEST_DOMAIN_ENTID" => $idmap,
        "THROWAWAY_EMAIL_TEST_LIVE" => "FALSE",
        "THROWAWAY_EMAIL_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["THROWAWAY_EMAIL_TEST_DOMAIN_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["THROWAWAY_EMAIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new ThrowawayEmailSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["THROWAWAY_EMAIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["THROWAWAY_EMAIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
