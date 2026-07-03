
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ThrowawayEmailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('V3nEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when THROWAWAYEMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('THROWAWAYEMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ThrowawayEmailSDK.test()
    const ent = testsdk.V3n()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THROWAWAY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'v3n.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set THROWAWAY_EMAIL_TEST_V_N_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v3n_ref01_data = Object.values(setup.data.existing.v3n)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const v3n_ref01_ent = client.V3n()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v3n/V3nTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ThrowawayEmailSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['v3n01','v3n02','v3n03','v301','v302','v303'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['THROWAWAY_EMAIL_TEST_V_N_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'THROWAWAY_EMAIL_TEST_V_N_ENTID': idmap,
    'THROWAWAY_EMAIL_TEST_LIVE': 'FALSE',
    'THROWAWAY_EMAIL_TEST_EXPLAIN': 'FALSE',
    'THROWAWAY_EMAIL_APIKEY': 'NONE',
  })

  idmap = env['THROWAWAY_EMAIL_TEST_V_N_ENTID']

  const live = 'TRUE' === env.THROWAWAY_EMAIL_TEST_LIVE

  if (live) {
    client = new ThrowawayEmailSDK(merge([
      {
        apikey: env.THROWAWAY_EMAIL_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.THROWAWAY_EMAIL_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
