<?php
declare(strict_types=1);

// ThrowawayEmail SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ThrowawayEmailFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ThrowawayEmailBaseFeature();
            case "test":
                return new ThrowawayEmailTestFeature();
            default:
                return new ThrowawayEmailBaseFeature();
        }
    }
}
