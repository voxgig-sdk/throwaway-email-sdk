

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('V3nEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when THROWAWAY_EMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('THROWAWAY_EMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ThrowawayEmailSDK.test()
    const ent = testsdk.V3n()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THROWAWAY_EMAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v3n.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"records","req":false,"short":"DNS records for the domain (when available)","type":"`$OBJECT`","index$":0},{"active":true,"name":"success","req":true,"type":"`$BOOLEAN`","index$":1},{"active":true,"name":"traits","req":true,"short":"Array of traits identified for the domain","type":"`$ARRAY`","index$":2}],"name":"v3n","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"test@example.com","kind":"param","name":"subject","orig":"subject","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v3/{subject}","json":"{\"parameters\":[{\"description\":\"Email address or domain name to analyze\",\"in\":\"path\",\"name\":\"subject\",\"required\":true,\"schema\":{\"example\":\"test@example.com\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"clean-domain\":{\"summary\":\"Clean domain with no issues\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"mail.example.com\",\"ips\":[\"203.0.113.10\",\"2001:db8::1\"]}],\"mx_records\":[{\"exchange\":\"mail.example.com\",\"priority\":10}],\"nameservers\":[{\"nameserver\":\"ns1.example.com\"},{\"nameserver\":\"ns2.example.com\"}]},\"success\":true,\"traits\":[]}},\"disposable\":{\"summary\":\"Disposable domain\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"mail.tempmail-service.com\",\"ips\":[\"192.168.1.100\"]}],\"mx_records\":[{\"exchange\":\"mail.tempmail-service.com\",\"priority\":10}],\"nameservers\":[{\"nameserver\":\"ns1.suspicious-provider.com\"}]},\"success\":true,\"traits\":[\"disposable\"]}},\"disposable-no-mx-ip\":{\"summary\":\"Disposable domain with MX but no A/AAAA records\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"nonexistent.mail.com\",\"ips\":[]}],\"mx_records\":[{\"exchange\":\"nonexistent.mail.com\",\"priority\":10}],\"nameservers\":[{\"nameserver\":\"ns1.suspicious-provider.com\"}]},\"success\":true,\"traits\":[\"disposable\",\"no_mx_ip\"]}},\"legitimate-domain\":{\"summary\":\"Legitimate domain (allowlisted)\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"smtp.gmail.com\",\"ips\":[\"142.251.30.27\",\"2a00:1450:400c:c09::1a\"]},{\"exchange\":\"alt1.gmail-smtp-in.l.google.com\",\"ips\":[\"172.253.113.26\"]}],\"mx_records\":[{\"exchange\":\"smtp.gmail.com\",\"priority\":10},{\"exchange\":\"alt1.gmail-smtp-in.l.google.com\",\"priority\":20}],\"nameservers\":[{\"nameserver\":\"ns1.google.com\"},{\"nameserver\":\"ns2.google.com\"}]},\"success\":true,\"traits\":[\"allowlist\"]}},\"minimal-response\":{\"summary\":\"Minimal response without DNS records\",\"value\":{\"success\":true,\"traits\":[\"suspicious_pattern\"]}},\"no-mx-domain\":{\"summary\":\"Domain with no MX record\",\"value\":{\"records\":{\"nameservers\":[{\"nameserver\":\"ns1.example.com\"}]},\"success\":true,\"traits\":[\"no_mx\"]}}},\"schema\":{\"properties\":{\"records\":{\"description\":\"DNS records for the domain (when available)\",\"properties\":{\"mx_ips\":{\"description\":\"IP addresses for MX records\",\"items\":{\"properties\":{\"exchange\":{\"description\":\"Mail exchange hostname\",\"example\":\"mail.example.com\",\"type\":\"string\"},\"ips\":{\"description\":\"IP addresses (IPv4 and IPv6) for the MX server\",\"example\":[\"192.168.1.100\",\"2001:db8::1\"],\"items\":{\"description\":\"IP address\",\"example\":\"192.168.1.100\",\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"exchange\",\"ips\"],\"type\":\"object\"},\"type\":\"array\"},\"mx_records\":{\"description\":\"MX records for the domain\",\"items\":{\"properties\":{\"exchange\":{\"description\":\"Mail exchange hostname\",\"example\":\"mail.example.com\",\"type\":\"string\"},\"priority\":{\"description\":\"MX priority value\",\"example\":10,\"type\":\"integer\"}},\"required\":[\"priority\",\"exchange\"],\"type\":\"object\"},\"type\":\"array\"},\"nameservers\":{\"description\":\"NS records for the domain\",\"items\":{\"properties\":{\"nameserver\":{\"description\":\"Nameserver hostname\",\"example\":\"ns1.example.com\",\"type\":\"string\"}},\"required\":[\"nameserver\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"traits\":{\"description\":\"Array of traits identified for the domain\",\"examples\":[[\"allowlist\"],[\"disposable\"],[\"disposable\",\"no_mx_ip\"],[\"no_mx\"],[\"no_mx_ip\"],[\"suspicious_mx\"],[\"suspicious_ns\"],[\"suspicious_ip\"],[\"suspicious_pattern\"],[\"suspicious_tld\"],[\"rbl_listed\"],[]],\"items\":{\"enum\":[\"disposable\",\"allowlist\",\"no_mx\",\"no_mx_ip\",\"suspicious_mx\",\"suspicious_ns\",\"suspicious_ip\",\"suspicious_pattern\",\"suspicious_tld\",\"rbl_listed\"],\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"success\",\"traits\"],\"type\":\"object\"}}},\"description\":\"Trait analysis result\",\"headers\":{\"X-RateLimit-Limit\":{\"description\":\"Rate limit maximum requests\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"description\":\"Rate limit remaining requests\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Reset\":{\"description\":\"Rate limit reset time (unix timestamp)\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid input\"},\"429\":{\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds to wait before retry\",\"schema\":{\"type\":\"integer\"}}}}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v3/{subject}","segments":[{"lit":"api"},{"lit":"v3"},{"var":"subject"}],"select":{"exist":["subject"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["v3"]]},"key$":"v3n","name__orig":"v3n","Name":"V3n","name_":"v3n","name-":"v3n","NAME":"V3N","index$":6}, {"active":true,"entity":"v3n","key$":"BasicV3nFlow","kind":"basic","name":"BasicV3nFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"v3n_ref01","srcdatavar":"v3n_ref01_data","suffix":"_dt0"},"match":{"id":"v3n01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v3n_ref01"}}],"index$":0}]}, 'V3n')
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

  const env = envOverride({
    'THROWAWAY_EMAIL_TEST_V3N_ENTID': idmap,
    'THROWAWAY_EMAIL_TEST_LIVE': 'FALSE',
    'THROWAWAY_EMAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['THROWAWAY_EMAIL_TEST_V3N_ENTID']

  const live = 'TRUE' === env.THROWAWAY_EMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['THROWAWAY_EMAIL_TEST_V3N_ENTID']
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
  
