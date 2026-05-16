<?php
declare(strict_types=1);

// ThrowawayEmail SDK utility: prepare_body

class ThrowawayEmailPrepareBody
{
    public static function call(ThrowawayEmailContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
