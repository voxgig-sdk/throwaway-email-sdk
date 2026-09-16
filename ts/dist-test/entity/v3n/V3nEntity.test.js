"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('V3nEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when THROWAWAY_EMAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('THROWAWAY_EMAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ThrowawayEmailSDK.test();
        const ent = testsdk.V3n();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.THROWAWAY_EMAIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'v3n.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "records", "req": false, "short": "DNS records for the domain (when available)", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "success", "req": true, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "traits", "req": true, "short": "Array of traits identified for the domain", "type": "`$ARRAY`", "index$": 2 }], "name": "v3n", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "test@example.com", "kind": "param", "name": "subject", "orig": "subject", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/v3/{subject}", "json": "{\"parameters\":[{\"description\":\"Email address or domain name to analyze\",\"in\":\"path\",\"name\":\"subject\",\"required\":true,\"schema\":{\"example\":\"test@example.com\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"clean-domain\":{\"summary\":\"Clean domain with no issues\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"mail.example.com\",\"ips\":[\"203.0.113.10\",\"2001:db8::1\"]}],\"mx_records\":[{\"exchange\":\"mail.example.com\",\"priority\":10}],\"nameservers\":[{\"nameserver\":\"ns1.example.com\"},{\"nameserver\":\"ns2.example.com\"}]},\"success\":true,\"traits\":[]}},\"disposable\":{\"summary\":\"Disposable domain\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"mail.tempmail-service.com\",\"ips\":[\"192.168.1.100\"]}],\"mx_records\":[{\"exchange\":\"mail.tempmail-service.com\",\"priority\":10}],\"nameservers\":[{\"nameserver\":\"ns1.suspicious-provider.com\"}]},\"success\":true,\"traits\":[\"disposable\"]}},\"disposable-no-mx-ip\":{\"summary\":\"Disposable domain with MX but no A/AAAA records\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"nonexistent.mail.com\",\"ips\":[]}],\"mx_records\":[{\"exchange\":\"nonexistent.mail.com\",\"priority\":10}],\"nameservers\":[{\"nameserver\":\"ns1.suspicious-provider.com\"}]},\"success\":true,\"traits\":[\"disposable\",\"no_mx_ip\"]}},\"legitimate-domain\":{\"summary\":\"Legitimate domain (allowlisted)\",\"value\":{\"records\":{\"mx_ips\":[{\"exchange\":\"smtp.gmail.com\",\"ips\":[\"142.251.30.27\",\"2a00:1450:400c:c09::1a\"]},{\"exchange\":\"alt1.gmail-smtp-in.l.google.com\",\"ips\":[\"172.253.113.26\"]}],\"mx_records\":[{\"exchange\":\"smtp.gmail.com\",\"priority\":10},{\"exchange\":\"alt1.gmail-smtp-in.l.google.com\",\"priority\":20}],\"nameservers\":[{\"nameserver\":\"ns1.google.com\"},{\"nameserver\":\"ns2.google.com\"}]},\"success\":true,\"traits\":[\"allowlist\"]}},\"minimal-response\":{\"summary\":\"Minimal response without DNS records\",\"value\":{\"success\":true,\"traits\":[\"suspicious_pattern\"]}},\"no-mx-domain\":{\"summary\":\"Domain with no MX record\",\"value\":{\"records\":{\"nameservers\":[{\"nameserver\":\"ns1.example.com\"}]},\"success\":true,\"traits\":[\"no_mx\"]}}},\"schema\":{\"properties\":{\"records\":{\"description\":\"DNS records for the domain (when available)\",\"properties\":{\"mx_ips\":{\"description\":\"IP addresses for MX records\",\"items\":{\"properties\":{\"exchange\":{\"description\":\"Mail exchange hostname\",\"example\":\"mail.example.com\",\"type\":\"string\"},\"ips\":{\"description\":\"IP addresses (IPv4 and IPv6) for the MX server\",\"example\":[\"192.168.1.100\",\"2001:db8::1\"],\"items\":{\"description\":\"IP address\",\"example\":\"192.168.1.100\",\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"exchange\",\"ips\"],\"type\":\"object\"},\"type\":\"array\"},\"mx_records\":{\"description\":\"MX records for the domain\",\"items\":{\"properties\":{\"exchange\":{\"description\":\"Mail exchange hostname\",\"example\":\"mail.example.com\",\"type\":\"string\"},\"priority\":{\"description\":\"MX priority value\",\"example\":10,\"type\":\"integer\"}},\"required\":[\"priority\",\"exchange\"],\"type\":\"object\"},\"type\":\"array\"},\"nameservers\":{\"description\":\"NS records for the domain\",\"items\":{\"properties\":{\"nameserver\":{\"description\":\"Nameserver hostname\",\"example\":\"ns1.example.com\",\"type\":\"string\"}},\"required\":[\"nameserver\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"traits\":{\"description\":\"Array of traits identified for the domain\",\"examples\":[[\"allowlist\"],[\"disposable\"],[\"disposable\",\"no_mx_ip\"],[\"no_mx\"],[\"no_mx_ip\"],[\"suspicious_mx\"],[\"suspicious_ns\"],[\"suspicious_ip\"],[\"suspicious_pattern\"],[\"suspicious_tld\"],[\"rbl_listed\"],[]],\"items\":{\"enum\":[\"disposable\",\"allowlist\",\"no_mx\",\"no_mx_ip\",\"suspicious_mx\",\"suspicious_ns\",\"suspicious_ip\",\"suspicious_pattern\",\"suspicious_tld\",\"rbl_listed\"],\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"success\",\"traits\"],\"type\":\"object\"}}},\"description\":\"Trait analysis result\",\"headers\":{\"X-RateLimit-Limit\":{\"description\":\"Rate limit maximum requests\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"description\":\"Rate limit remaining requests\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Reset\":{\"description\":\"Rate limit reset time (unix timestamp)\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid input\"},\"429\":{\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds to wait before retry\",\"schema\":{\"type\":\"integer\"}}}}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/v3/{subject}", "segments": [{ "lit": "api" }, { "lit": "v3" }, { "var": "subject" }], "select": { "exist": ["subject"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["v3"]] }, "key$": "v3n", "name__orig": "v3n", "Name": "V3n", "name_": "v3n", "name-": "v3n", "NAME": "V3N", "index$": 6 }, { "active": true, "entity": "v3n", "key$": "BasicV3nFlow", "kind": "basic", "name": "BasicV3nFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "v3n_ref01", "srcdatavar": "v3n_ref01_data", "suffix": "_dt0" }, "match": { "id": "v3n01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-v3n_ref01" } }], "index$": 0 }] }, 'V3n');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let v3n_ref01_data = Object.values(setup.data.existing.v3n)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const v3n_ref01_ent = client.V3n();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/v3n/V3nTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ThrowawayEmailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['v3n01', 'v3n02', 'v3n03', 'v301', 'v302', 'v303'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'THROWAWAY_EMAIL_TEST_V3N_ENTID': idmap,
        'THROWAWAY_EMAIL_TEST_LIVE': 'FALSE',
        'THROWAWAY_EMAIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['THROWAWAY_EMAIL_TEST_V3N_ENTID'];
    const live = 'TRUE' === env.THROWAWAY_EMAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['THROWAWAY_EMAIL_TEST_V3N_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ThrowawayEmailSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=V3nEntity.test.js.map