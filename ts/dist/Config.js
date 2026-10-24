"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/dns-query",
                            "segments": [
                                {
                                    "lit": "dns-query"
                                }
                            ],
                            "parts": [
                                "dns-query"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "binary": true,
                                "kind": "raw",
                                "media": "application/dns-message"
                            },
                            "response": {
                                "binary": true,
                                "kind": "raw",
                                "media": "application/dns-message"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/dns-query",
                            "segments": [
                                {
                                    "lit": "dns-query"
                                }
                            ],
                            "parts": [
                                "dns-query"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "dns",
                                        "orig": "dns",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "dns"
                                ]
                            },
                            "response": {
                                "binary": true,
                                "kind": "raw",
                                "media": "application/dns-message"
                            }
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
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "isDisposable",
                    "title": "Is Disposable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "success",
                    "title": "Success",
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/domain/{domain}",
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
                            "parts": [
                                "api",
                                "v1",
                                "domain",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "example.com"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "isDisposable",
                    "title": "Is Disposable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "success",
                    "title": "Success",
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/email/{email}",
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
                            "parts": [
                                "api",
                                "v1",
                                "email",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "email": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "email",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "test@example.com"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/list.json",
                            "segments": [
                                {
                                    "lit": "list.json"
                                }
                            ],
                            "parts": [
                                "list.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/list.txt",
                            "segments": [
                                {
                                    "lit": "list.txt"
                                }
                            ],
                            "parts": [
                                "list.txt"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "raw",
                                "media": "text/plain"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/list.yaml",
                            "segments": [
                                {
                                    "lit": "list.yaml"
                                }
                            ],
                            "parts": [
                                "list.yaml"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "binary": true,
                                "kind": "raw",
                                "media": "application/yaml"
                            }
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/resolve",
                            "segments": [
                                {
                                    "lit": "resolve"
                                }
                            ],
                            "parts": [
                                "resolve"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cd",
                                        "orig": "cd",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "do",
                                        "orig": "do",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "testmail.ares"
                                    },
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "A"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "name"
                                ]
                            },
                            "response": {
                                "binary": true,
                                "kind": "raw",
                                "media": "application/dns-json"
                            }
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
                    "title": "Is Disposable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "success",
                    "title": "Success",
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
                            "parts": [
                                "api",
                                "v2",
                                "{subject}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subject",
                                        "orig": "subject",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "test@example.com"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "subject"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "v3n": {
            "fields": [
                {
                    "name": "records",
                    "title": "Records",
                    "type": "`$OBJECT`",
                    "short": "DNS records for the domain (when available)"
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "traits",
                    "title": "Traits",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Array of traits identified for the domain"
                }
            ],
            "name": "v3n",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "api",
                                "v3",
                                "{subject}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subject",
                                        "orig": "subject",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "test@example.com"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "subject"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map