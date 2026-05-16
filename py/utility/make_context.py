# ThrowawayEmail SDK utility: make_context

from core.context import ThrowawayEmailContext


def make_context_util(ctxmap, basectx):
    return ThrowawayEmailContext(ctxmap, basectx)
