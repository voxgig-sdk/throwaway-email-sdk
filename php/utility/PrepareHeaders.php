<?php
declare(strict_types=1);

// ThrowawayEmail SDK utility: prepare_headers

class ThrowawayEmailPrepareHeaders
{
    public static function call(ThrowawayEmailContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
