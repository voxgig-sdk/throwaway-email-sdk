-- ProjectName SDK exists test

local sdk = require("throwaway-email_sdk")

describe("ThrowawayEmailSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
