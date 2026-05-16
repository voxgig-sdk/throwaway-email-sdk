# ThrowawayEmail SDK exists test

require "minitest/autorun"
require_relative "../ThrowawayEmail_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ThrowawayEmailSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
