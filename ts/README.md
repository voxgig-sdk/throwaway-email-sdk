# ThrowawayEmail TypeScript SDK



The TypeScript SDK for the ThrowawayEmail API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/throwaway-email-sdk/releases](https://github.com/voxgig-sdk/throwaway-email-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ThrowawayEmailSDK } from '@voxgig-sdk/throwaway-email'

const client = new ThrowawayEmailSDK()
```

### 3. Load a dnsquery

`load()` returns the entity directly and throws on failure:

```ts
try {
  const dnsquery = await client.DnsQuery().load({ id: 'example_id' })
  console.log(dnsquery)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created DnsQuery
const created = await client.DnsQuery().create({
  name: 'Example',
})

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ThrowawayEmailSDK.test()

const dnsquery = await client.DnsQuery().load({ id: 'test01' })
// dnsquery is a bare entity populated with mock response data
console.log(dnsquery)
```

You can also use the instance method:

```ts
const client = new ThrowawayEmailSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.DnsQuery()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ThrowawayEmailSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
THROWAWAY_EMAIL_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### ThrowawayEmailSDK

#### Constructor

```ts
new ThrowawayEmailSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `DnsQuery(data?)` | `DnsQueryEntity` | Create a DnsQuery entity instance. |
| `Domain(data?)` | `DomainEntity` | Create a Domain entity instance. |
| `Email(data?)` | `EmailEntity` | Create an Email entity instance. |
| `List(data?)` | `ListEntity` | Create a List entity instance. |
| `Resolve(data?)` | `ResolveEntity` | Create a Resolve entity instance. |
| `V2n(data?)` | `V2nEntity` | Create a V2n entity instance. |
| `V3n(data?)` | `V3nEntity` | Create a V3n entity instance. |
| `tester(testopts?, sdkopts?)` | `ThrowawayEmailSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ThrowawayEmailSDK.test(testopts?, sdkopts?)` | `ThrowawayEmailSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ThrowawayEmailSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### DnsQuery

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/dns-query`

#### Domain

| Field | Description |
| --- | --- |
| `is_disposable` |  |
| `success` |  |

Operations: load.

API path: `/api/v1/domain/{domain}`

#### Email

| Field | Description |
| --- | --- |
| `is_disposable` |  |
| `success` |  |

Operations: load.

API path: `/api/v1/email/{email}`

#### List

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/list.json`

#### Resolve

| Field | Description |
| --- | --- |

Operations: load.

API path: `/resolve`

#### V2n

| Field | Description |
| --- | --- |
| `is_disposable` |  |
| `success` |  |

Operations: load.

API path: `/api/v2/{subject}`

#### V3n

| Field | Description |
| --- | --- |
| `record` |  |
| `success` |  |
| `trait` |  |

Operations: load.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
throwaway-email/
├── src/
│   ├── ThrowawayEmailSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ThrowawayEmailSDK } from '@voxgig-sdk/throwaway-email'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const dnsquery = client.DnsQuery()
await dnsquery.load({ id: "example_id" })

// dnsquery.data() now returns the loaded dnsquery data
// dnsquery.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
