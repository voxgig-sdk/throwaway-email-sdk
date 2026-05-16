# ThrowawayEmail PHP SDK Reference

Complete API reference for the ThrowawayEmail PHP SDK.


## ThrowawayEmailSDK

### Constructor

```php
require_once __DIR__ . '/throwaway-email_sdk.php';

$client = new ThrowawayEmailSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ThrowawayEmailSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ThrowawayEmailSDK::test();
```


### Instance Methods

#### `DnsQuery($data = null)`

Create a new `DnsQueryEntity` instance. Pass `null` for no initial data.

#### `Domain($data = null)`

Create a new `DomainEntity` instance. Pass `null` for no initial data.

#### `Email($data = null)`

Create a new `EmailEntity` instance. Pass `null` for no initial data.

#### `List($data = null)`

Create a new `ListEntity` instance. Pass `null` for no initial data.

#### `Resolve($data = null)`

Create a new `ResolveEntity` instance. Pass `null` for no initial data.

#### `V2n($data = null)`

Create a new `V2nEntity` instance. Pass `null` for no initial data.

#### `V3n($data = null)`

Create a new `V3nEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## DnsQueryEntity

```php
$dns_query = $client->DnsQuery();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->DnsQuery()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->DnsQuery()->load(["id" => "dns_query_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DnsQueryEntity`

Create a new `DnsQueryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DomainEntity

```php
$domain = $client->Domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Domain()->load(["id" => "domain_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DomainEntity`

Create a new `DomainEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EmailEntity

```php
$email = $client->Email();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Email()->load(["id" => "email_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EmailEntity`

Create a new `EmailEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ListEntity

```php
$list = $client->List();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->List()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->List()->load(["id" => "list_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ListEntity`

Create a new `ListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ResolveEntity

```php
$resolve = $client->Resolve();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Resolve()->load(["id" => "resolve_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ResolveEntity`

Create a new `ResolveEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V2nEntity

```php
$v2n = $client->V2n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_disposable` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->V2n()->load(["id" => "v2n_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V2nEntity`

Create a new `V2nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V3nEntity

```php
$v3n = $client->V3n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | ``$OBJECT`` | No |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `trait` | ``$ARRAY`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->V3n()->load(["id" => "v3n_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V3nEntity`

Create a new `V3nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ThrowawayEmailSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

