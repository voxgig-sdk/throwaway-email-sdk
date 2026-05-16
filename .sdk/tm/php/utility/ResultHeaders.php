<?php
declare(strict_types=1);

// ThrowawayEmail SDK utility: result_headers

class ThrowawayEmailResultHeaders
{
    public static function call(ThrowawayEmailContext $ctx): ?ThrowawayEmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
