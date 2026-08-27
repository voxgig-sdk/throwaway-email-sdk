
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ThrowawayEmail',
        slug: "throwaway-email",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://throwaway.cloud",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      dns_query: {
      },

      domain: {
      },

      email: {
      },

      list: {
      },

      resolve: {
      },

      v2n: {
      },

      v3n: {
      },

    }
  }


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
              "parts": [
                "dns-query"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "dns-query"
              ],
              "select": {
                "exist": [
                  "dns"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/list.json",
              "parts": [
                "list.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "list.txt"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/list.yaml",
              "parts": [
                "list.yaml"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
              "parts": [
                "resolve"
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
              "parts": [
                "api",
                "v2",
                "{subject}"
              ],
              "select": {
                "exist": [
                  "subject"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "v3",
                "{subject}"
              ],
              "select": {
                "exist": [
                  "subject"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  }
}


const config = new Config()

export {
  config
}

