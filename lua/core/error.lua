-- ThrowawayEmail SDK error

local ThrowawayEmailError = {}
ThrowawayEmailError.__index = ThrowawayEmailError


function ThrowawayEmailError.new(code, msg, ctx)
  local self = setmetatable({}, ThrowawayEmailError)
  self.is_sdk_error = true
  self.sdk = "ThrowawayEmail"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ThrowawayEmailError:error()
  return self.msg
end


function ThrowawayEmailError:__tostring()
  return self.msg
end


return ThrowawayEmailError
