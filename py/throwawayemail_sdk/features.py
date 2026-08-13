# ThrowawayEmail SDK feature factory

from throwawayemail_sdk.feature.base_feature import ThrowawayEmailBaseFeature
from throwawayemail_sdk.feature.test_feature import ThrowawayEmailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ThrowawayEmailBaseFeature(),
        "test": lambda: ThrowawayEmailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
