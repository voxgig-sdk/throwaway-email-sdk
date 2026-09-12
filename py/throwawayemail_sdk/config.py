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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/dns-query",
                "segments": [
                  {
                    "lit": "dns-query",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "dns-query",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/dns-query",
                "segments": [
                  {
                    "lit": "dns-query",
                  },
                ],
                "select": {
                  "exist": [
                    "dns",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "dns-query",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "isDisposable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "success",
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
                "args": {
                  "params": [
                    {
                      "example": "example.com",
                      "kind": "param",
                      "name": "id",
                      "orig": "domain",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/domain/{domain}",
                "rename": {
                  "param": {
                    "domain": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "domain",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "isDisposable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "success",
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
                "args": {
                  "params": [
                    {
                      "example": "test@example.com",
                      "kind": "param",
                      "name": "id",
                      "orig": "email",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/email/{email}",
                "rename": {
                  "param": {
                    "email": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v1",
                  "email",
                  "{id}",
                ],
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/list.json",
                "segments": [
                  {
                    "lit": "list.json",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "list.json",
                ],
              },
            ],
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
                    "lit": "list.txt",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "list.txt",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/list.yaml",
                "segments": [
                  {
                    "lit": "list.yaml",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "list.yaml",
                ],
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
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "cd",
                      "orig": "cd",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "do",
                      "orig": "do",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": "testmail.ares",
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "A",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/resolve",
                "segments": [
                  {
                    "lit": "resolve",
                  },
                ],
                "select": {
                  "exist": [
                    "cd",
                    "do",
                    "name",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "resolve",
                ],
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
            "type": "`$BOOLEAN`",
          },
          {
            "name": "success",
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
                "args": {
                  "params": [
                    {
                      "example": "test@example.com",
                      "kind": "param",
                      "name": "subject",
                      "orig": "subject",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "subject",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v2",
                  "{subject}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v2",
            ],
          ],
        },
      },
      "v3n": {
        "fields": [
          {
            "name": "records",
            "short": "DNS records for the domain (when available)",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "traits",
            "req": True,
            "short": "Array of traits identified for the domain",
            "type": "`$ARRAY`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "subject",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v3",
                  "{subject}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v3",
            ],
          ],
        },
      },
    },
    }
