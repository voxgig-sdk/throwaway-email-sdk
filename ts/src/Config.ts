
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://throwaway.cloud',

    auth: {
      prefix: 'Bearer',
    },

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
              "active": true,
              "args": {},
              "method": "POST",
              "orig": "/dns-query",
              "parts": [
                "dns-query"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB",
                    "kind": "query",
                    "name": "dns",
                    "orig": "dns",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "domain": {
      "fields": [
        {
          "active": true,
          "name": "is_disposable",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "success",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 1
        }
      ],
      "name": "domain",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "example.com",
                    "kind": "param",
                    "name": "id",
                    "orig": "domain",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "email": {
      "fields": [
        {
          "active": true,
          "name": "is_disposable",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "success",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 1
        }
      ],
      "name": "email",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "test@example.com",
                    "kind": "param",
                    "name": "id",
                    "orig": "email",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/list.json",
              "parts": [
                "list.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/list.txt",
              "parts": [
                "list.txt"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/list.yaml",
              "parts": [
                "list.yaml"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 1
            }
          ],
          "key$": "load"
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "cd",
                    "orig": "cd",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "do",
                    "orig": "do",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": "testmail.ares",
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "A",
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v2n": {
      "fields": [
        {
          "active": true,
          "name": "is_disposable",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 0
        },
        {
          "active": true,
          "name": "success",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 1
        }
      ],
      "name": "v2n",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "test@example.com",
                    "kind": "param",
                    "name": "subject",
                    "orig": "subject",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "record",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "success",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 1
        },
        {
          "active": true,
          "name": "trait",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 2
        }
      ],
      "name": "v3n",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "test@example.com",
                    "kind": "param",
                    "name": "subject",
                    "orig": "subject",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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

