# ThrowawayEmail Ruby SDK Reference

Complete API reference for the ThrowawayEmail Ruby SDK.


## ThrowawayEmailSDK

### Constructor

```ruby
require_relative 'ThrowawayEmail_sdk'

client = ThrowawayEmailSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ThrowawayEmailSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ThrowawayEmailSDK.test
```


### Instance Methods

#### `DnsQuery(data = nil)`

Create a new `DnsQuery` entity instance. Pass `nil` for no initial data.

#### `Domain(data = nil)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `Email(data = nil)`

Create a new `Email` entity instance. Pass `nil` for no initial data.

#### `List(data = nil)`

Create a new `List` entity instance. Pass `nil` for no initial data.

#### `Resolve(data = nil)`

Create a new `Resolve` entity instance. Pass `nil` for no initial data.

#### `V2n(data = nil)`

Create a new `V2n` entity instance. Pass `nil` for no initial data.

#### `V3n(data = nil)`

Create a new `V3n` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DnsQueryEntity

```ruby
dns_query = client.DnsQuery
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.DnsQuery.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.DnsQuery.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DnsQueryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainEntity

```ruby
domain = client.Domain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | `Boolean` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Domain.load({ "id" => "domain_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailEntity

```ruby
email = client.Email
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | `Boolean` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Email.load({ "id" => "email_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ListEntity

```ruby
list = client.List
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.List.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.List.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResolveEntity

```ruby
resolve = client.Resolve
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Resolve.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResolveEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V2nEntity

```ruby
v2n = client.V2n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | `Boolean` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V2n.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V2nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V3nEntity

```ruby
v3n = client.V3n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | `Hash` | No |  |
| `success` | `Boolean` | Yes |  |
| `trait` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V3n.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V3nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = ThrowawayEmailSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

