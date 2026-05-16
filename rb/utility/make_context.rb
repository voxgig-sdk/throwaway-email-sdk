# ThrowawayEmail SDK utility: make_context
require_relative '../core/context'
module ThrowawayEmailUtilities
  MakeContext = ->(ctxmap, basectx) {
    ThrowawayEmailContext.new(ctxmap, basectx)
  }
end
