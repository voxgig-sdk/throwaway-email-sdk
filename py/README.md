# ThrowawayEmail Python SDK



The Python SDK for the ThrowawayEmail API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/throwaway-email-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from throwawayemail_sdk import ThrowawayEmailSDK

client = ThrowawayEmailSDK()
```

### 3. Load a dnsquery

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    dnsquery = client.DnsQuery().load({"id": "example_id"})
    print(dnsquery)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the bare created record (a dict)
created = client.DnsQuery().create({"name": "Example"})

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    print(result["err"])     # error value
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ThrowawayEmailSDK.test()

# Entity ops return the bare record and raise on error.
dnsquery = client.DnsQuery().load({"id": "test01"})
# dnsquery contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ThrowawayEmailSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ThrowawayEmailSDK

```python
from throwawayemail_sdk import ThrowawayEmailSDK

client = ThrowawayEmailSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ThrowawayEmailSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ThrowawayEmailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `DnsQuery` | `(data) -> DnsQueryEntity` | Create a DnsQuery entity instance. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `Email` | `(data) -> EmailEntity` | Create an Email entity instance. |
| `List` | `(data) -> ListEntity` | Create a List entity instance. |
| `Resolve` | `(data) -> ResolveEntity` | Create a Resolve entity instance. |
| `V2n` | `(data) -> V2nEntity` | Create a V2n entity instance. |
| `V3n` | `(data) -> V3nEntity` | Create a V3n entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### DnsQuery

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/dns-query`

#### Domain

| Field | Description |
| --- | --- |
| `is_disposable` |  |
| `success` |  |

Operations: Load.

API path: `/api/v1/domain/{domain}`

#### Email

| Field | Description |
| --- | --- |
| `is_disposable` |  |
| `success` |  |

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
| `is_disposable` |  |
| `success` |  |

Operations: Load.

API path: `/api/v2/{subject}`

#### V3n

| Field | Description |
| --- | --- |
| `record` |  |
| `success` |  |
| `trait` |  |

Operations: Load.

API path: `/api/v3/{subject}`



## Entities


### DnsQuery

Create an instance: `dns_query = client.DnsQuery()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
dns_query = client.DnsQuery().load({"id": "dns_query_id"})
```

#### Example: Create

```python
dns_query = client.DnsQuery().create({
})
```


### Domain

Create an instance: `domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```python
domain = client.Domain().load({"id": "domain_id"})
```


### Email

Create an instance: `email = client.Email()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```python
email = client.Email().load({"id": "email_id"})
```


### List

Create an instance: `list = client.List()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
list = client.List().load({"id": "list_id"})
```

#### Example: List

```python
lists = client.List().list({})
```


### Resolve

Create an instance: `resolve = client.Resolve()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
resolve = client.Resolve().load({"id": "resolve_id"})
```


### V2n

Create an instance: `v2n = client.V2n()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```python
v2n = client.V2n().load({"id": "v2n_id"})
```


### V3n

Create an instance: `v3n = client.V3n()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `record` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |
| `trait` | ``$ARRAY`` |  |

#### Example: Load

```python
v3n = client.V3n().load({"id": "v3n_id"})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── throwawayemail_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`throwawayemail_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
dnsquery = client.DnsQuery()
dnsquery.load({"id": "example_id"})

# dnsquery.data_get() now returns the loaded dnsquery data
# dnsquery.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
