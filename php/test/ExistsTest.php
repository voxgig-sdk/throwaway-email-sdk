<?php
declare(strict_types=1);

// ThrowawayEmail SDK exists test

require_once __DIR__ . '/../throwawayemail_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ThrowawayEmailSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
