# ThrowawayEmail SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ThrowawayEmailUtility.registrar = ->(u) {
  u.clean = ThrowawayEmailUtilities::Clean
  u.done = ThrowawayEmailUtilities::Done
  u.make_error = ThrowawayEmailUtilities::MakeError
  u.feature_add = ThrowawayEmailUtilities::FeatureAdd
  u.feature_hook = ThrowawayEmailUtilities::FeatureHook
  u.feature_init = ThrowawayEmailUtilities::FeatureInit
  u.fetcher = ThrowawayEmailUtilities::Fetcher
  u.make_fetch_def = ThrowawayEmailUtilities::MakeFetchDef
  u.make_context = ThrowawayEmailUtilities::MakeContext
  u.make_options = ThrowawayEmailUtilities::MakeOptions
  u.make_request = ThrowawayEmailUtilities::MakeRequest
  u.make_response = ThrowawayEmailUtilities::MakeResponse
  u.make_result = ThrowawayEmailUtilities::MakeResult
  u.make_point = ThrowawayEmailUtilities::MakePoint
  u.make_spec = ThrowawayEmailUtilities::MakeSpec
  u.make_url = ThrowawayEmailUtilities::MakeUrl
  u.param = ThrowawayEmailUtilities::Param
  u.prepare_auth = ThrowawayEmailUtilities::PrepareAuth
  u.prepare_body = ThrowawayEmailUtilities::PrepareBody
  u.prepare_headers = ThrowawayEmailUtilities::PrepareHeaders
  u.prepare_method = ThrowawayEmailUtilities::PrepareMethod
  u.prepare_params = ThrowawayEmailUtilities::PrepareParams
  u.prepare_path = ThrowawayEmailUtilities::PreparePath
  u.prepare_query = ThrowawayEmailUtilities::PrepareQuery
  u.result_basic = ThrowawayEmailUtilities::ResultBasic
  u.result_body = ThrowawayEmailUtilities::ResultBody
  u.result_headers = ThrowawayEmailUtilities::ResultHeaders
  u.transform_request = ThrowawayEmailUtilities::TransformRequest
  u.transform_response = ThrowawayEmailUtilities::TransformResponse
}
