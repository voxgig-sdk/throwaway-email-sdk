"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'ThrowawayEmail',
        slug: "throwaway-email",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://throwaway.cloud",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            dns_query: {},
            domain: {},
            email: {},
            list: {},
            resolve: {},
            v2n: {},
            v3n: {},
        }
    };
    entity = {
        "dns_query": {
            "fields": [],
            "name": "dns_query",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/dns-query",
                            "segments": [
                                {
                                    "lit": "dns-query"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "dns-query"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB",
                                        "kind": "query",
                                        "name": "dns",
                                        "orig": "dns",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/dns-query",
                            "segments": [
                                {
                                    "lit": "dns-query"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "dns"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "dns-query"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "domain": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "isDisposable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "success",
                    "type": "`$BOOLEAN`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "domain",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "example.com",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "domain",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/domain/{domain}",
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "domain"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "v1",
                                "domain",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "isDisposable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "success",
                    "type": "`$BOOLEAN`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "email",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "test@example.com",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "email",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/email/{email}",
                            "rename": {
                                "param": {
                                    "email": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "email"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "v1",
                                "email",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "list": {
            "fields": [],
            "name": "list",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/list.json",
                            "segments": [
                                {
                                    "lit": "list.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "list.json"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/list.txt",
                            "segments": [
                                {
                                    "lit": "list.txt"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "list.txt"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/list.yaml",
                            "segments": [
                                {
                                    "lit": "list.yaml"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "list.yaml"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "resolve": {
            "fields": [],
            "name": "resolve",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": false,
                                        "kind": "query",
                                        "name": "cd",
                                        "orig": "cd",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": false,
                                        "kind": "query",
                                        "name": "do",
                                        "orig": "do",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": "testmail.ares",
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "A",
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/resolve",
                            "segments": [
                                {
                                    "lit": "resolve"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "cd",
                                    "do",
                                    "name",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "resolve"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "v2n": {
            "fields": [
                {
                    "name": "isDisposable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "success",
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "v2n",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "test@example.com",
                                        "kind": "param",
                                        "name": "subject",
                                        "orig": "subject",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v2/{subject}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v2"
                                },
                                {
                                    "var": "subject"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "subject"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "v2",
                                "{subject}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "v2"
                    ]
                ]
            }
        },
        "v3n": {
            "fields": [
                {
                    "name": "records",
                    "short": "DNS records for the domain (when available)",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "success",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "traits",
                    "req": true,
                    "short": "Array of traits identified for the domain",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "v3n",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "test@example.com",
                                        "kind": "param",
                                        "name": "subject",
                                        "orig": "subject",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v3/{subject}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v3"
                                },
                                {
                                    "var": "subject"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "subject"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "v3",
                                "{subject}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "v3"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map