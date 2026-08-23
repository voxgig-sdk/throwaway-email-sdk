# ThrowawayEmail SDK configuration

module ThrowawayEmailConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ThrowawayEmail",
        "slug" => "throwaway-email",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://throwaway.cloud",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "dns_query" => {},
          "domain" => {},
          "email" => {},
          "list" => {},
          "resolve" => {},
          "v2n" => {},
          "v3n" => {},
        },
      },
      "entity" => {
        "dns_query" => {
          "fields" => [],
          "name" => "dns_query",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/dns-query",
                  "parts" => [
                    "dns-query",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB",
                        "kind" => "query",
                        "name" => "dns",
                        "orig" => "dns",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dns-query",
                  "parts" => [
                    "dns-query",
                  ],
                  "select" => {
                    "exist" => [
                      "dns",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "domain" => {
          "fields" => [
            {
              "name" => "isDisposable",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "domain",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "example.com",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/domain/{domain}",
                  "parts" => [
                    "api",
                    "v1",
                    "domain",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "domain" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "email" => {
          "fields" => [
            {
              "name" => "isDisposable",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "email",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "test@example.com",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "email",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/email/{email}",
                  "parts" => [
                    "api",
                    "v1",
                    "email",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "email" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "list" => {
          "fields" => [],
          "name" => "list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/list.json",
                  "parts" => [
                    "list.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/list.txt",
                  "parts" => [
                    "list.txt",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/list.yaml",
                  "parts" => [
                    "list.yaml",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "resolve" => {
          "fields" => [],
          "name" => "resolve",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "cd",
                        "orig" => "cd",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "do",
                        "orig" => "do",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => "testmail.ares",
                        "kind" => "query",
                        "name" => "name",
                        "orig" => "name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "A",
                        "kind" => "query",
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/resolve",
                  "parts" => [
                    "resolve",
                  ],
                  "select" => {
                    "exist" => [
                      "cd",
                      "do",
                      "name",
                      "type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "v2n" => {
          "fields" => [
            {
              "name" => "isDisposable",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "v2n",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "test@example.com",
                        "kind" => "param",
                        "name" => "subject",
                        "orig" => "subject",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v2/{subject}",
                  "parts" => [
                    "api",
                    "v2",
                    "{subject}",
                  ],
                  "select" => {
                    "exist" => [
                      "subject",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v2",
              ],
            ],
          },
        },
        "v3n" => {
          "fields" => [
            {
              "name" => "records",
              "short" => "DNS records for the domain (when available)",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "success",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "traits",
              "req" => true,
              "short" => "Array of traits identified for the domain",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "v3n",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "test@example.com",
                        "kind" => "param",
                        "name" => "subject",
                        "orig" => "subject",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v3/{subject}",
                  "parts" => [
                    "api",
                    "v3",
                    "{subject}",
                  ],
                  "select" => {
                    "exist" => [
                      "subject",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v3",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ThrowawayEmailFeatures.make_feature(name)
  end
end
