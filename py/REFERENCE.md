# ThrowawayEmail Python SDK Reference

Complete API reference for the ThrowawayEmail Python SDK.


## ThrowawayEmailSDK

### Constructor

```python
from throwaway-email_sdk import ThrowawayEmailSDK

client = ThrowawayEmailSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ThrowawayEmailSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ThrowawayEmailSDK.test()
```


### Instance Methods

#### `DnsQuery(data=None)`

Create a new `DnsQueryEntity` instance. Pass `None` for no initial data.

#### `Domain(data=None)`

Create a new `DomainEntity` instance. Pass `None` for no initial data.

#### `Email(data=None)`

Create a new `EmailEntity` instance. Pass `None` for no initial data.

#### `List(data=None)`

Create a new `ListEntity` instance. Pass `None` for no initial data.

#### `Resolve(data=None)`

Create a new `ResolveEntity` instance. Pass `None` for no initial data.

#### `V2n(data=None)`

Create a new `V2nEntity` instance. Pass `None` for no initial data.

#### `V3n(data=None)`

Create a new `V3nEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DnsQueryEntity

```python
dns_query = client.DnsQuery()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DnsQuery().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DnsQuery().load({"id": "dns_query_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DnsQueryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainEntity

```python
domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Domain().load({"id": "domain_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailEntity

```python
email = client.Email()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Email().load({"id": "email_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListEntity

```python
list = client.List()
```

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.List().list({})
for list in results:
    print(list)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.List().load({"id": "list_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResolveEntity

```python
resolve = client.Resolve()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Resolve().load({"id": "resolve_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResolveEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V2nEntity

```python
v2n = client.V2n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V2n().load({"id": "v2n_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V3nEntity

```python
v3n = client.V3n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `trait` | ``$ARRAY`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V3n().load({"id": "v3n_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V3nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ThrowawayEmailSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

