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
(0, node_test_1.describe)('DnsQueryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when THROWAWAY_EMAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('THROWAWAY_EMAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ThrowawayEmailSDK.test();
        const ent = testsdk.DnsQuery();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.THROWAWAY_EMAIL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dns_query.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "dns_query", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /dns-query", "json": "{\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/dns-message\":{\"schema\":{\"description\":\"DNS query message in wire format\",\"format\":\"binary\",\"type\":\"string\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/dns-message\":{\"schema\":{\"description\":\"DNS response message in wire format\",\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"DNS response in wire format\"},\"400\":{\"description\":\"Invalid DNS query format\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/dns-query", "segments": [{ "lit": "dns-query" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB", "kind": "query", "name": "dns", "orig": "dns", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /dns-query", "json": "{\"parameters\":[{\"description\":\"Base64url-encoded DNS query message\",\"in\":\"query\",\"name\":\"dns\",\"required\":true,\"schema\":{\"example\":\"AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/dns-message\":{\"schema\":{\"description\":\"DNS response message in wire format\",\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"DNS response in wire format\"},\"400\":{\"description\":\"Invalid DNS query format\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/dns-query", "segments": [{ "lit": "dns-query" }], "select": { "exist": ["dns"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "dns_query", "name__orig": "dns_query", "Name": "DnsQuery", "name_": "dns_query", "name-": "dns-query", "NAME": "DNS_QUERY", "index$": 0 }, { "active": true, "entity": "dns_query", "key$": "BasicDnsQueryFlow", "kind": "basic", "name": "BasicDnsQueryFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "dns_query_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "dns_query_ref01", "srcdatavar": "dns_query_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dns_query_ref01" } }], "index$": 1 }] }, 'DnsQuery');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const dns_query_ref01_ent = client.DnsQuery();
        let dns_query_ref01_data = setup.data.new.dns_query['dns_query_ref01'];
        dns_query_ref01_data = (await dns_query_ref01_ent.create(dns_query_ref01_data)).data();
        (0, node_assert_1.default)(null != dns_query_ref01_data);
        // LOAD
        const dns_query_ref01_match_dt0 = {};
        const dns_query_ref01_data_dt0 = (await dns_query_ref01_ent.load(dns_query_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != dns_query_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dns_query/DnsQueryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ThrowawayEmailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dns_query01', 'dns_query02', 'dns_query03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'THROWAWAY_EMAIL_TEST_DNS_QUERY_ENTID': idmap,
        'THROWAWAY_EMAIL_TEST_LIVE': 'FALSE',
        'THROWAWAY_EMAIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['THROWAWAY_EMAIL_TEST_DNS_QUERY_ENTID'];
    const live = 'TRUE' === env.THROWAWAY_EMAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['THROWAWAY_EMAIL_TEST_DNS_QUERY_ENTID'];
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
//# sourceMappingURL=DnsQueryEntity.test.js.map