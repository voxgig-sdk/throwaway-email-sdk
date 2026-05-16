<?php
declare(strict_types=1);

// ThrowawayEmail SDK utility: result_body

class ThrowawayEmailResultBody
{
    public static function call(ThrowawayEmailContext $ctx): ?ThrowawayEmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
