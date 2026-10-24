

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ThrowawayEmailSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('ListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when THROWAWAY_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('THROWAWAY_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ThrowawayEmailSDK.test()
    const ent = testsdk.List()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('list hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ThrowawayEmailSDK.test(offline).List().stream('list')) { }
    }, /offline/)

    for await (const _item of ThrowawayEmailSDK.test(offline).List()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ThrowawayEmailSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.List().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ThrowawayEmailSDK.test().List().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ThrowawayEmailSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.List().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.List().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THROWAWAY_EMAIL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /list.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/list.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"list.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /list.txt","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/list.txt","q":{},"r":{},"rs":{"kind":"raw","media":"text/plain"},"s":[{"lit":"list.txt"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /list.yaml","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/list.yaml","q":{},"r":{},"rs":{"binary":true,"kind":"raw","media":"application/yaml"},"s":[{"lit":"list.yaml"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"list","name__orig":"list","Name":"List","name_":"list","name-":"list","NAME":"LIST","index$":3}, {"active":true,"entity":"list","key$":"BasicListFlow","kind":"basic","name":"BasicListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"list_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"list_ref01","srcdatavar":"list_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-list_ref01"}}],"index$":1}]}, 'List', {"GET /list.json":{"protocol":"http","parameters":[]},"GET /list.txt":{"protocol":"http","parameters":[]},"GET /list.yaml":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let list_ref01_data = Object.values(setup.data.existing.list)[0] as any

    // LIST
    const list_ref01_ent = client.List()
    const list_ref01_match: any = {}

    const list_ref01_list = (await list_ref01_ent.list(list_ref01_match)).map((e: any) => e.data())


    // LOAD
    const list_ref01_match_dt0: any = {}
    const list_ref01_data_dt0 = (await list_ref01_ent.load(list_ref01_match_dt0)).data()
    assert(null != list_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/list/ListTestData.json')

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
    ['list01','list02','list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'THROWAWAY_EMAIL_TEST_LIST_ENTID': idmap,
    'THROWAWAY_EMAIL_TEST_LIVE': 'FALSE',
    'THROWAWAY_EMAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['THROWAWAY_EMAIL_TEST_LIST_ENTID']

  const live = 'TRUE' === env.THROWAWAY_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['THROWAWAY_EMAIL_TEST_LIST_ENTID']
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
  
