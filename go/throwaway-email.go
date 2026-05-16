package voxgigthrowawayemailsdk

import (
	"github.com/voxgig-sdk/throwaway-email-sdk/core"
	"github.com/voxgig-sdk/throwaway-email-sdk/entity"
	"github.com/voxgig-sdk/throwaway-email-sdk/feature"
	_ "github.com/voxgig-sdk/throwaway-email-sdk/utility"
)

// Type aliases preserve external API.
type ThrowawayEmailSDK = core.ThrowawayEmailSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ThrowawayEmailEntity = core.ThrowawayEmailEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ThrowawayEmailError = core.ThrowawayEmailError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDnsQueryEntityFunc = func(client *core.ThrowawayEmailSDK, entopts map[string]any) core.ThrowawayEmailEntity {
		return entity.NewDnsQueryEntity(client, entopts)
	}
	core.NewDomainEntityFunc = func(client *core.ThrowawayEmailSDK, entopts map[string]any) core.ThrowawayEmailEntity {
		return entity.NewDomainEntity(client, entopts)
	}
	core.NewEmailEntityFunc = func(client *core.ThrowawayEmailSDK, entopts map[string]any) core.ThrowawayEmailEntity {
		return entity.NewEmailEntity(client, entopts)
	}
	core.NewListEntityFunc = func(client *core.ThrowawayEmailSDK, entopts map[string]any) core.ThrowawayEmailEntity {
		return entity.NewListEntity(client, entopts)
	}
	core.NewResolveEntityFunc = func(client *core.ThrowawayEmailSDK, entopts map[string]any) core.ThrowawayEmailEntity {
		return entity.NewResolveEntity(client, entopts)
	}
	core.NewV2nEntityFunc = func(client *core.ThrowawayEmailSDK, entopts map[string]any) core.ThrowawayEmailEntity {
		return entity.NewV2nEntity(client, entopts)
	}
	core.NewV3nEntityFunc = func(client *core.ThrowawayEmailSDK, entopts map[string]any) core.ThrowawayEmailEntity {
		return entity.NewV3nEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewThrowawayEmailSDK = core.NewThrowawayEmailSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
