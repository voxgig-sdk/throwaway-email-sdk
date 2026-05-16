<?php
declare(strict_types=1);

// ThrowawayEmail SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ThrowawayEmailMakeContext
{
    public static function call(array $ctxmap, ?ThrowawayEmailContext $basectx): ThrowawayEmailContext
    {
        return new ThrowawayEmailContext($ctxmap, $basectx);
    }
}
