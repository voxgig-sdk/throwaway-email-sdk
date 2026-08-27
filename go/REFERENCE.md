# ThrowawayEmail Golang SDK Reference

Complete API reference for the ThrowawayEmail Golang SDK.


## ThrowawayEmailSDK

### Constructor

```go
func NewThrowawayEmailSDK(options map[string]any) *ThrowawayEmailSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ThrowawayEmailSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ThrowawayEmailSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `DnsQuery(data map[string]any) ThrowawayEmailEntity`

Create a new `DnsQuery` entity instance. Pass `nil` for no initial data.

#### `Domain(data map[string]any) ThrowawayEmailEntity`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `Email(data map[string]any) ThrowawayEmailEntity`

Create a new `Email` entity instance. Pass `nil` for no initial data.

#### `List(data map[string]any) ThrowawayEmailEntity`

Create a new `List` entity instance. Pass `nil` for no initial data.

#### `Resolve(data map[string]any) ThrowawayEmailEntity`

Create a new `Resolve` entity instance. Pass `nil` for no initial data.

#### `V2n(data map[string]any) ThrowawayEmailEntity`

Create a new `V2n` entity instance. Pass `nil` for no initial data.

#### `V3n(data map[string]any) ThrowawayEmailEntity`

Create a new `V3n` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DnsQueryEntity

```go
dnsQuery := client.DnsQuery(nil)
fmt.Println(dnsQuery.GetName()) // "dns_query"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DnsQuery(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.DnsQuery(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DnsQueryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DomainEntity

```go
domain := client.Domain(nil)
fmt.Println(domain.GetName()) // "domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `isDisposable` | `bool` | No |  |
| `success` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Domain(nil).Load(map[string]any{"id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EmailEntity

```go
email := client.Email(nil)
fmt.Println(email.GetName()) // "email"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `isDisposable` | `bool` | No |  |
| `success` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Email(nil).Load(map[string]any{"id": "email_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ListEntity

```go
list := client.List(nil)
fmt.Println(list.GetName()) // "list"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.List(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.List(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResolveEntity

```go
resolve := client.Resolve(nil)
fmt.Println(resolve.GetName()) // "resolve"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Resolve(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResolveEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V2nEntity

```go
v2n := client.V2n(nil)
fmt.Println(v2n.GetName()) // "v2n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isDisposable` | `bool` | No |  |
| `success` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2n(nil).Load(map[string]any{"subject": "subject"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V2nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V3nEntity

```go
v3n := client.V3n(nil)
fmt.Println(v3n.GetName()) // "v3n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `records` | `map[string]any` | No | DNS records for the domain (when available) |
| `success` | `bool` | Yes |  |
| `traits` | `[]any` | Yes | Array of traits identified for the domain |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V3n(nil).Load(map[string]any{"subject": "subject"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V3nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewThrowawayEmailSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

