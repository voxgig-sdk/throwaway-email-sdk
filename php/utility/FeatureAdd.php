<?php
declare(strict_types=1);

// ThrowawayEmail SDK utility: feature_add

class ThrowawayEmailFeatureAdd
{
    public static function call(ThrowawayEmailContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
