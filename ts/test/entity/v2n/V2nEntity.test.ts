

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ThrowawayEmailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('V2nEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when THROWAWAY_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('THROWAWAY_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ThrowawayEmailSDK.test()
    const ent = testsdk.V2n()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THROWAWAY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v2n.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"isDisposable":{"a":true,"h":"Is Disposable","n":"isDisposable","r":false,"t":"`$BOOLEAN`","key$":"isDisposable","index$":0},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":1}},"name":"v2n","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v2/{subject}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"test@example.com","k":"param","n":"subject","or":"subject","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v2/{subject}","q":{"exist":["subject"]},"r":{},"s":[{"lit":"api"},{"lit":"v2"},{"var":"subject"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"v2n","name__orig":"v2n","Name":"V2n","name_":"v2n","name-":"v2n","NAME":"V2N","index$":5}, {"active":true,"entity":"v2n","key$":"BasicV2nFlow","kind":"basic","name":"BasicV2nFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"v2n_ref01","srcdatavar":"v2n_ref01_data","suffix":"_dt0"},"m":{"id":"v2n01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v2n_ref01"}}],"index$":0}]}, 'V2n', {"GET /api/v2/{subject}":{"protocol":"http","responses":{"200":{"description":"Check result","headers":{"X-RateLimit-Limit":{"description":"Rate limit maximum requests","schema":{"type":"integer"}},"X-RateLimit-Remaining":{"description":"Rate limit remaining requests","schema":{"type":"integer"}},"X-RateLimit-Reset":{"description":"Rate limit reset time (unix timestamp)","schema":{"type":"integer"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","key$":"success"},"isDisposable":{"type":"boolean","key$":"isDisposable"}},"index$":0}}}},"400":{"description":"Invalid input","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"message":{"type":"string"}}}}}},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"description":"Seconds to wait before retry","schema":{"type":"integer"}}}}},"parameters":[{"name":"subject","in":"path","required":true,"description":"Email address or domain name to check","schema":{"type":"string","example":"test@example.com"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v2n_ref01_data = Object.values(setup.data.existing.v2n)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const v2n_ref01_ent = client.V2n()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v2n/V2nTestData.json')

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
    ['v2n01','v2n02','v2n03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'THROWAWAY_EMAIL_TEST_V2N_ENTID': idmap,
    'THROWAWAY_EMAIL_TEST_LIVE': 'FALSE',
    'THROWAWAY_EMAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['THROWAWAY_EMAIL_TEST_V2N_ENTID']

  const live = 'TRUE' === env.THROWAWAY_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['THROWAWAY_EMAIL_TEST_V2N_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ThrowawayEmailSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
