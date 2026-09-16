# ThrowawayEmail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ThrowawayEmailFeatures
  def self.make_feature(name)
    case name
    when "base"
      ThrowawayEmailBaseFeature.new
    when "ratelimit"
      ThrowawayEmailRatelimitFeature.new
    when "retry"
      ThrowawayEmailRetryFeature.new
    when "test"
      ThrowawayEmailTestFeature.new
    when "timeout"
      ThrowawayEmailTimeoutFeature.new
    else
      ThrowawayEmailBaseFeature.new
    end
  end
end
