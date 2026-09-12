package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ThrowawayEmail",
			"slug": "throwaway-email",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://throwaway.cloud",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"dns_query": map[string]any{},
				"domain": map[string]any{},
				"email": map[string]any{},
				"list": map[string]any{},
				"resolve": map[string]any{},
				"v2n": map[string]any{},
				"v3n": map[string]any{},
			},
		},
		"entity": map[string]any{
			"dns_query": map[string]any{
				"fields": []any{},
				"name": "dns_query",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/dns-query",
								"segments": []any{
									map[string]any{
										"lit": "dns-query",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"dns-query",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "AAABAAABAAAAAAAAB3Rlc3RtYWlsBGFyZXMAAQAB",
											"kind": "query",
											"name": "dns",
											"orig": "dns",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/dns-query",
								"segments": []any{
									map[string]any{
										"lit": "dns-query",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"dns",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"dns-query",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isDisposable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "domain",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "example.com",
											"kind": "param",
											"name": "id",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/domain/{domain}",
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"domain",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isDisposable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "email",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "test@example.com",
											"kind": "param",
											"name": "id",
											"orig": "email",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/email/{email}",
								"rename": map[string]any{
									"param": map[string]any{
										"email": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v1",
									"email",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"list": map[string]any{
				"fields": []any{},
				"name": "list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/list.json",
								"segments": []any{
									map[string]any{
										"lit": "list.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"list.json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/list.txt",
								"segments": []any{
									map[string]any{
										"lit": "list.txt",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"list.txt",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/list.yaml",
								"segments": []any{
									map[string]any{
										"lit": "list.yaml",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"list.yaml",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"resolve": map[string]any{
				"fields": []any{},
				"name": "resolve",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "cd",
											"orig": "cd",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "do",
											"orig": "do",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "testmail.ares",
											"kind": "query",
											"name": "name",
											"orig": "name",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "A",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/resolve",
								"segments": []any{
									map[string]any{
										"lit": "resolve",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cd",
										"do",
										"name",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"resolve",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v2n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "isDisposable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "v2n",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "test@example.com",
											"kind": "param",
											"name": "subject",
											"orig": "subject",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v2/{subject}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"var": "subject",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"subject",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v2",
									"{subject}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v2",
						},
					},
				},
			},
			"v3n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "records",
						"short": "DNS records for the domain (when available)",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "traits",
						"req": true,
						"short": "Array of traits identified for the domain",
						"type": "`$ARRAY`",
					},
				},
				"name": "v3n",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "test@example.com",
											"kind": "param",
											"name": "subject",
											"orig": "subject",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v3/{subject}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v3",
									},
									map[string]any{
										"var": "subject",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"subject",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v3",
									"{subject}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v3",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
