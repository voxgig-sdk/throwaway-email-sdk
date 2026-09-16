package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDnsQueryEntityFunc func(client *ThrowawayEmailSDK, entopts map[string]any) ThrowawayEmailEntity

var NewDomainEntityFunc func(client *ThrowawayEmailSDK, entopts map[string]any) ThrowawayEmailEntity

var NewEmailEntityFunc func(client *ThrowawayEmailSDK, entopts map[string]any) ThrowawayEmailEntity

var NewListEntityFunc func(client *ThrowawayEmailSDK, entopts map[string]any) ThrowawayEmailEntity

var NewResolveEntityFunc func(client *ThrowawayEmailSDK, entopts map[string]any) ThrowawayEmailEntity

var NewV2nEntityFunc func(client *ThrowawayEmailSDK, entopts map[string]any) ThrowawayEmailEntity

var NewV3nEntityFunc func(client *ThrowawayEmailSDK, entopts map[string]any) ThrowawayEmailEntity

