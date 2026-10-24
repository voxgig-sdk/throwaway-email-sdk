# ThrowawayEmail SDK utility: prepare_body
require_relative 'media'
module ThrowawayEmailUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ThrowawayEmailUtilities.raw_body(ctx.reqdata) if ThrowawayEmailUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
