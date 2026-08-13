# ThrowawayEmail SDK exists test

import pytest
from throwawayemail_sdk import ThrowawayEmailSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ThrowawayEmailSDK.test(None, None)
        assert testsdk is not None
