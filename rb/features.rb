# ThrowawayEmail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ThrowawayEmailFeatures
  def self.make_feature(name)
    case name
    when "base"
      ThrowawayEmailBaseFeature.new
    when "test"
      ThrowawayEmailTestFeature.new
    else
      ThrowawayEmailBaseFeature.new
    end
  end
end
