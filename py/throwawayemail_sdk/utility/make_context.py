# ThrowawayEmail SDK utility: make_context

from throwawayemail_sdk.core.context import ThrowawayEmailContext


def make_context_util(ctxmap, basectx):
    return ThrowawayEmailContext(ctxmap, basectx)
