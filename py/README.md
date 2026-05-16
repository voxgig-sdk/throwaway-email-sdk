# ThrowawayEmail Python SDK

The Python SDK for the ThrowawayEmail API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install throwaway-email-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from throwawayemail_sdk import ThrowawayEmailSDK

client = ThrowawayEmailSDK({
    "apikey": os.environ.get("THROWAWAY-EMAIL_APIKEY"),
})
```

### 3. Load a dnsquery

```python
result, err = client.DnsQuery(None).load({"id": "example_id"}, None)
if err:
    raise Exception(err)
print(result)
```

### 4. Create, update, and remove

```python
# Create
created, _ = client.DnsQuery(None).create({"name": "Example"}, None)

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ThrowawayEmailSDK.test(None, None)

result, err = client.ThrowawayEmail(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
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
THROWAWAY-EMAIL_TEST_LIVE=TRUE
THROWAWAY-EMAIL_APIKEY=<your-key>
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
| `apikey` | `str` | API key for authentication. |
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
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `DnsQuery` | `(data) -> DnsQueryEntity` | Create a DnsQuery entity instance. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `Email` | `(data) -> EmailEntity` | Create a Email entity instance. |
| `List` | `(data) -> ListEntity` | Create a List entity instance. |
| `Resolve` | `(data) -> ResolveEntity` | Create a Resolve entity instance. |
| `V2n` | `(data) -> V2nEntity` | Create a V2n entity instance. |
| `V3n` | `(data) -> V3nEntity` | Create a V3n entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

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

Create an instance: `const dns_query = client.DnsQuery()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dns_query = await client.DnsQuery().load({ id: 'dns_query_id' })
```

#### Example: Create

```ts
const dns_query = await client.DnsQuery().create({
})
```


### Domain

Create an instance: `const domain = client.Domain()`

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

```ts
const domain = await client.Domain().load({ id: 'domain_id' })
```


### Email

Create an instance: `const email = client.Email()`

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

```ts
const email = await client.Email().load({ id: 'email_id' })
```


### List

Create an instance: `const list = client.List()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const list = await client.List().load({ id: 'list_id' })
```

#### Example: List

```ts
const lists = await client.List().list()
```


### Resolve

Create an instance: `const resolve = client.Resolve()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const resolve = await client.Resolve().load({ id: 'resolve_id' })
```


### V2n

Create an instance: `const v2n = client.V2n()`

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

```ts
const v2n = await client.V2n().load({ id: 'v2n_id' })
```


### V3n

Create an instance: `const v3n = client.V3n()`

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

```ts
const v3n = await client.V3n().load({ id: 'v3n_id' })
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
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
