"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "dns_query",
        "accessor": "DnsQuery",
        "op": "create",
        "method": "POST",
        "path": "/dns-query",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/dns-message"
        ],
        "rawBody": {
            "media": [
                "application/dns-message"
            ],
            "text": false
        },
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "dns_query",
        "accessor": "DnsQuery",
        "op": "load",
        "method": "GET",
        "path": "/dns-query",
        "args": [],
        "select": {
            "dns": "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/dns-message"
        ],
        "query": [
            "dns"
        ],
        "queryArgs": [
            {
                "name": "dns",
                "wire": "dns"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/domain/{domain}",
        "args": [
            {
                "name": "id",
                "wire": "domain",
                "value": "example.com"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "success": true,
            "isDisposable": true
        },
        "idField": "id"
    },
    {
        "entity": "email",
        "accessor": "Email",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/email/{email}",
        "args": [
            {
                "name": "id",
                "wire": "email",
                "value": "test@example.com"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "success": true,
            "isDisposable": true
        },
        "idField": "id"
    },
    {
        "entity": "list",
        "accessor": "List",
        "op": "list",
        "method": "GET",
        "path": "/list.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "resolve",
        "accessor": "Resolve",
        "op": "load",
        "method": "GET",
        "path": "/resolve",
        "args": [],
        "select": {
            "name": "testmail.ares",
            "cd": "v1",
            "do": "v1",
            "type": "A"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/dns-json"
        ],
        "query": [
            "name",
            "type",
            "cd",
            "do"
        ],
        "queryArgs": [
            {
                "name": "cd",
                "wire": "cd"
            },
            {
                "name": "do",
                "wire": "do"
            },
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "type",
                "wire": "type"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "Status": 1,
            "TC": true,
            "RD": true,
            "RA": true,
            "AD": true,
            "CD": true,
            "Question": [
                {
                    "name": "x",
                    "type": 1
                }
            ],
            "Answer": [
                {
                    "name": "x",
                    "type": 1,
                    "TTL": 1,
                    "data": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "v2n",
        "accessor": "V2n",
        "op": "load",
        "method": "GET",
        "path": "/api/v2/{subject}",
        "args": [
            {
                "name": "subject",
                "wire": "subject",
                "value": "test@example.com"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "success": true,
            "isDisposable": true
        },
        "idField": "id"
    },
    {
        "entity": "v3n",
        "accessor": "V3n",
        "op": "load",
        "method": "GET",
        "path": "/api/v3/{subject}",
        "args": [
            {
                "name": "subject",
                "wire": "subject",
                "value": "test@example.com"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "success": true,
            "traits": [
                "allowlist"
            ],
            "records": {
                "nameservers": [
                    {
                        "nameserver": "ns1.google.com"
                    },
                    {
                        "nameserver": "ns2.google.com"
                    }
                ],
                "mx_records": [
                    {
                        "priority": 10,
                        "exchange": "smtp.gmail.com"
                    },
                    {
                        "priority": 20,
                        "exchange": "alt1.gmail-smtp-in.l.google.com"
                    }
                ],
                "mx_ips": [
                    {
                        "exchange": "smtp.gmail.com",
                        "ips": [
                            "142.251.30.27",
                            "2a00:1450:400c:c09::1a"
                        ]
                    },
                    {
                        "exchange": "alt1.gmail-smtp-in.l.google.com",
                        "ips": [
                            "172.253.113.26"
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map