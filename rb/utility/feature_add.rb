# ThrowawayEmail SDK utility: feature_add
module ThrowawayEmailUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
