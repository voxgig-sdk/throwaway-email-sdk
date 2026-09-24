

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"records":{"a":true,"h":"Records","n":"records","r":false,"sh":"DNS records for the domain (when available)","t":"`$OBJECT`","key$":"records","index$":0},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":1},"traits":{"a":true,"h":"Traits","n":"traits","r":true,"sh":"Array of traits identified for the domain","t":"`$ARRAY`","key$":"traits","index$":2}},"name":"v3n","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v3/{subject}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"test@example.com","k":"param","n":"subject","or":"subject","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v3/{subject}","q":{"exist":["subject"]},"r":{},"s":[{"lit":"api"},{"lit":"v3"},{"var":"subject"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"v3n","name__orig":"v3n","Name":"V3n","name_":"v3n","name-":"v3n","NAME":"V3N","index$":6}, {"active":true,"entity":"v3n","key$":"BasicV3nFlow","kind":"basic","name":"BasicV3nFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"v3n_ref01","srcdatavar":"v3n_ref01_data","suffix":"_dt0"},"m":{"id":"v3n01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v3n_ref01"}}],"index$":0}]}, 'V3n', {"GET /api/v3/{subject}":{"protocol":"http","responses":{"200":{"description":"Trait analysis result","headers":{"X-RateLimit-Limit":{"description":"Rate limit maximum requests","schema":{"type":"integer"}},"X-RateLimit-Remaining":{"description":"Rate limit remaining requests","schema":{"type":"integer"}},"X-RateLimit-Reset":{"description":"Rate limit reset time (unix timestamp)","schema":{"type":"integer"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true,"key$":"success"},"traits":{"type":"array","items":{"type":"string","enum":["disposable","allowlist","no_mx","no_mx_ip","suspicious_mx","suspicious_ns","suspicious_ip","suspicious_pattern","suspicious_tld","rbl_listed"]},"description":"Array of traits identified for the domain","examples":[["allowlist"],["disposable"],["disposable","no_mx_ip"],["no_mx"],["no_mx_ip"],["suspicious_mx"],["suspicious_ns"],["suspicious_ip"],["suspicious_pattern"],["suspicious_tld"],["rbl_listed"],[]],"key$":"traits"},"records":{"type":"object","description":"DNS records for the domain (when available)","properties":{"nameservers":{"type":"array","description":"NS records for the domain","items":{"type":"object","properties":{"nameserver":{"type":"string","description":"Nameserver hostname","example":"ns1.example.com"}},"required":["nameserver"]}},"mx_records":{"type":"array","description":"MX records for the domain","items":{"type":"object","properties":{"priority":{"type":"integer","description":"MX priority value","example":10},"exchange":{"type":"string","description":"Mail exchange hostname","example":"mail.example.com"}},"required":["priority","exchange"]}},"mx_ips":{"type":"array","description":"IP addresses for MX records","items":{"type":"object","properties":{"exchange":{"type":"string","description":"Mail exchange hostname","example":"mail.example.com"},"ips":{"type":"array","description":"IP addresses (IPv4 and IPv6) for the MX server","items":{"type":"string","description":"IP address","example":"192.168.1.100"},"example":["192.168.1.100","2001:db8::1"]}},"required":["exchange","ips"]}}},"key$":"records"}},"required":["success","traits"],"index$":0},"examples":{"legitimate-domain":{"summary":"Legitimate domain (allowlisted)","value":{"success":true,"traits":["allowlist"],"records":{"nameservers":[{"nameserver":"ns1.google.com"},{"nameserver":"ns2.google.com"}],"mx_records":[{"priority":10,"exchange":"smtp.gmail.com"},{"priority":20,"exchange":"alt1.gmail-smtp-in.l.google.com"}],"mx_ips":[{"exchange":"smtp.gmail.com","ips":["142.251.30.27","2a00:1450:400c:c09::1a"]},{"exchange":"alt1.gmail-smtp-in.l.google.com","ips":["172.253.113.26"]}]}}},"disposable":{"summary":"Disposable domain","value":{"success":true,"traits":["disposable"],"records":{"nameservers":[{"nameserver":"ns1.suspicious-provider.com"}],"mx_records":[{"priority":10,"exchange":"mail.tempmail-service.com"}],"mx_ips":[{"exchange":"mail.tempmail-service.com","ips":["192.168.1.100"]}]}}},"no-mx-domain":{"summary":"Domain with no MX record","value":{"success":true,"traits":["no_mx"],"records":{"nameservers":[{"nameserver":"ns1.example.com"}]}}},"disposable-no-mx-ip":{"summary":"Disposable domain with MX but no A/AAAA records","value":{"success":true,"traits":["disposable","no_mx_ip"],"records":{"nameservers":[{"nameserver":"ns1.suspicious-provider.com"}],"mx_records":[{"priority":10,"exchange":"nonexistent.mail.com"}],"mx_ips":[{"exchange":"nonexistent.mail.com","ips":[]}]}}},"clean-domain":{"summary":"Clean domain with no issues","value":{"success":true,"traits":[],"records":{"nameservers":[{"nameserver":"ns1.example.com"},{"nameserver":"ns2.example.com"}],"mx_records":[{"priority":10,"exchange":"mail.example.com"}],"mx_ips":[{"exchange":"mail.example.com","ips":["203.0.113.10","2001:db8::1"]}]}}},"minimal-response":{"summary":"Minimal response without DNS records","value":{"success":true,"traits":["suspicious_pattern"]}}}}}},"400":{"description":"Invalid input","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"message":{"type":"string"}}}}}},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"description":"Seconds to wait before retry","schema":{"type":"integer"}}}}},"parameters":[{"name":"subject","in":"path","required":true,"description":"Email address or domain name to analyze","schema":{"type":"string","example":"test@example.com"},"index$":0}],"securitySource":"unspecified"}})
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
    ['v3n01','v3n02','v3n03'],
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
  
