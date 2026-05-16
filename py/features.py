# ThrowawayEmail SDK feature factory

from feature.base_feature import ThrowawayEmailBaseFeature
from feature.test_feature import ThrowawayEmailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ThrowawayEmailBaseFeature(),
        "test": lambda: ThrowawayEmailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
