<?php
declare(strict_types=1);

// ThrowawayEmail SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ThrowawayEmailUtility::setRegistrar(function (ThrowawayEmailUtility $u): void {
    $u->clean = [ThrowawayEmailClean::class, 'call'];
    $u->done = [ThrowawayEmailDone::class, 'call'];
    $u->make_error = [ThrowawayEmailMakeError::class, 'call'];
    $u->feature_add = [ThrowawayEmailFeatureAdd::class, 'call'];
    $u->feature_hook = [ThrowawayEmailFeatureHook::class, 'call'];
    $u->feature_init = [ThrowawayEmailFeatureInit::class, 'call'];
    $u->fetcher = [ThrowawayEmailFetcher::class, 'call'];
    $u->make_fetch_def = [ThrowawayEmailMakeFetchDef::class, 'call'];
    $u->make_context = [ThrowawayEmailMakeContext::class, 'call'];
    $u->make_options = [ThrowawayEmailMakeOptions::class, 'call'];
    $u->make_request = [ThrowawayEmailMakeRequest::class, 'call'];
    $u->make_response = [ThrowawayEmailMakeResponse::class, 'call'];
    $u->make_result = [ThrowawayEmailMakeResult::class, 'call'];
    $u->make_point = [ThrowawayEmailMakePoint::class, 'call'];
    $u->make_spec = [ThrowawayEmailMakeSpec::class, 'call'];
    $u->make_url = [ThrowawayEmailMakeUrl::class, 'call'];
    $u->param = [ThrowawayEmailParam::class, 'call'];
    $u->prepare_auth = [ThrowawayEmailPrepareAuth::class, 'call'];
    $u->prepare_body = [ThrowawayEmailPrepareBody::class, 'call'];
    $u->prepare_headers = [ThrowawayEmailPrepareHeaders::class, 'call'];
    $u->prepare_method = [ThrowawayEmailPrepareMethod::class, 'call'];
    $u->prepare_params = [ThrowawayEmailPrepareParams::class, 'call'];
    $u->prepare_path = [ThrowawayEmailPreparePath::class, 'call'];
    $u->prepare_query = [ThrowawayEmailPrepareQuery::class, 'call'];
    $u->result_basic = [ThrowawayEmailResultBasic::class, 'call'];
    $u->result_body = [ThrowawayEmailResultBody::class, 'call'];
    $u->result_headers = [ThrowawayEmailResultHeaders::class, 'call'];
    $u->transform_request = [ThrowawayEmailTransformRequest::class, 'call'];
    $u->transform_response = [ThrowawayEmailTransformResponse::class, 'call'];
});
