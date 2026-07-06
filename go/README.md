# ThrowawayEmail Golang SDK



The Golang SDK for the ThrowawayEmail API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.DnsQuery(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/throwaway-email-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/throwaway-email-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/throwaway-email-sdk/go=../throwaway-email-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/throwaway-email-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single dnsquery — the value is the loaded record.
    dnsquery, err := client.DnsQuery(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(dnsquery)

    // Create a dnsquery.
    created, err := client.DnsQuery(nil).Create(map[string]any{}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
dnsquery, err := client.DnsQuery(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = dnsquery
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

dnsquery, err := client.DnsQuery(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(dnsquery) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewThrowawayEmailSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
THROWAWAY_EMAIL_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewThrowawayEmailSDK

```go
func NewThrowawayEmailSDK(options map[string]any) *ThrowawayEmailSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ThrowawayEmailSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ThrowawayEmailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `DnsQuery` | `(data map[string]any) ThrowawayEmailEntity` | Create a DnsQuery entity instance. |
| `Domain` | `(data map[string]any) ThrowawayEmailEntity` | Create a Domain entity instance. |
| `Email` | `(data map[string]any) ThrowawayEmailEntity` | Create an Email entity instance. |
| `List` | `(data map[string]any) ThrowawayEmailEntity` | Create a List entity instance. |
| `Resolve` | `(data map[string]any) ThrowawayEmailEntity` | Create a Resolve entity instance. |
| `V2n` | `(data map[string]any) ThrowawayEmailEntity` | Create a V2n entity instance. |
| `V3n` | `(data map[string]any) ThrowawayEmailEntity` | Create a V3n entity instance. |

### Entity interface (ThrowawayEmailEntity)

All entities implement the `ThrowawayEmailEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    dnsquery, err := client.DnsQuery(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // dnsquery is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### DnsQuery

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/dns-query`

#### Domain

| Field | Description |
| --- | --- |
| `"is_disposable"` |  |
| `"success"` |  |

Operations: Load.

API path: `/api/v1/domain/{domain}`

#### Email

| Field | Description |
| --- | --- |
| `"is_disposable"` |  |
| `"success"` |  |

Operations: Load.

API path: `/api/v1/email/{email}`

#### List

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/list.json`

#### Resolve

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/resolve`

#### V2n

| Field | Description |
| --- | --- |
| `"is_disposable"` |  |
| `"success"` |  |

Operations: Load.

API path: `/api/v2/{subject}`

#### V3n

| Field | Description |
| --- | --- |
| `"record"` |  |
| `"success"` |  |
| `"trait"` |  |

Operations: Load.

API path: `/api/v3/{subject}`



## Entities


### DnsQuery

Create an instance: `dns_query := client.DnsQuery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
dns_query, err := client.DnsQuery(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dns_query) // the loaded record
```

#### Example: Create

```go
result, err := client.DnsQuery(nil).Create(map[string]any{
}, nil)
```


### Domain

Create an instance: `domain := client.Domain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_disposable` | `bool` |  |
| `success` | `bool` |  |

#### Example: Load

```go
domain, err := client.Domain(nil).Load(map[string]any{"id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domain) // the loaded record
```


### Email

Create an instance: `email := client.Email(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_disposable` | `bool` |  |
| `success` | `bool` |  |

#### Example: Load

```go
email, err := client.Email(nil).Load(map[string]any{"id": "email_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(email) // the loaded record
```


### List

Create an instance: `list := client.List(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
list, err := client.List(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(list) // the loaded record
```

#### Example: List

```go
lists, err := client.List(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(lists) // the array of records
```


### Resolve

Create an instance: `resolve := client.Resolve(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
resolve, err := client.Resolve(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(resolve) // the loaded record
```


### V2n

Create an instance: `v2n := client.V2n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_disposable` | `bool` |  |
| `success` | `bool` |  |

#### Example: Load

```go
v2n, err := client.V2n(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v2n) // the loaded record
```


### V3n

Create an instance: `v3n := client.V3n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `record` | `map[string]any` |  |
| `success` | `bool` |  |
| `trait` | `[]any` |  |

#### Example: Load

```go
v3n, err := client.V3n(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v3n) // the loaded record
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/throwaway-email-sdk/go/
├── throwaway-email.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/throwaway-email-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
dnsquery := client.DnsQuery(nil)
dnsquery.Load(nil, nil)

// dnsquery.Data() now returns the dnsquery data from the last load
// dnsquery.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
