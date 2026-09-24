# ThrowawayEmail SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ThrowawayEmail",
            "slug": "throwaway-email",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://throwaway.cloud",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "dns_query": {},
                "domain": {},
                "email": {},
                "list": {},
                "resolve": {},
                "v2n": {},
                "v3n": {},
            },
        },
        "entity": {
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
                    "lit": "dns-query",
                  },
                ],
                "parts": [
                  "dns-query",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "dns-query",
                  },
                ],
                "parts": [
                  "dns-query",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "dns",
                      "orig": "dns",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dns",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "domain": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "isDisposable",
            "title": "Is Disposable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "domain",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "domain",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "domain": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "example.com",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "isDisposable",
            "title": "Is Disposable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "email",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "email",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "email": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "test@example.com",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "list.json",
                  },
                ],
                "parts": [
                  "list.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "list.txt",
                  },
                ],
                "parts": [
                  "list.txt",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/list.yaml",
                "segments": [
                  {
                    "lit": "list.yaml",
                  },
                ],
                "parts": [
                  "list.yaml",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "resolve",
                  },
                ],
                "parts": [
                  "resolve",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cd",
                      "orig": "cd",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "do",
                      "orig": "do",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "testmail.ares",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "A",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "cd",
                    "do",
                    "name",
                    "type",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "v2n": {
        "fields": [
          {
            "name": "isDisposable",
            "title": "Is Disposable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "v2",
                  },
                  {
                    "var": "subject",
                  },
                ],
                "parts": [
                  "api",
                  "v2",
                  "{subject}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subject",
                      "orig": "subject",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "test@example.com",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "subject",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "v3n": {
        "fields": [
          {
            "name": "records",
            "title": "Records",
            "type": "`$OBJECT`",
            "short": "DNS records for the domain (when available)",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "traits",
            "title": "Traits",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Array of traits identified for the domain",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "v3",
                  },
                  {
                    "var": "subject",
                  },
                ],
                "parts": [
                  "api",
                  "v3",
                  "{subject}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subject",
                      "orig": "subject",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "test@example.com",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "subject",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
