# ThrowawayEmail SDK

Check whether an email address or domain belongs to a disposable / throwaway mail service

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About throwaway.cloud API

[throwaway.cloud](https://throwaway.cloud) is a disposable-email detection service operated by iocium. Given an email address or a bare domain, it tells you whether that address points at a temporary / throwaway mailbox provider so you can keep them out of signups, newsletters, and abuse-prone forms.

What you get from the API:

- A simple boolean check on a domain — e.g. `GET /api/v1/domain/{domain}` — answering "is this a disposable mail domain?"
- The same check on a full email address — `GET /api/v1/email/{email}` — which extracts and evaluates the domain.
- A combined v2 endpoint, `GET /api/v2/{subject}`, that accepts either an email or a domain.
- DNS-based lookup paths (`/dns-query` for DNS-over-HTTPS and `/resolve` for DNS-over-JSON) plus a `*.throwaway.zone` reverse-DNS zone, returning sinkhole IPs (`10.0.0.1` / `fc00::1`) for flagged domains.

Operational notes: no API key is required, CORS is enabled, and rate limits are described as "generous" but not numerically published. Detection is built on continuous automated DNS monitoring combined with curated lists and pattern analysis.

## Try it

**TypeScript**
```bash
npm install throwaway-email
```

**Python**
```bash
pip install throwaway-email-sdk
```

**PHP**
```bash
composer require voxgig/throwaway-email-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/throwaway-email-sdk/go
```

**Ruby**
```bash
gem install throwaway-email-sdk
```

**Lua**
```bash
luarocks install throwaway-email-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ThrowawayEmailSDK } from 'throwaway-email'

const client = new ThrowawayEmailSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o throwaway-email-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "throwaway-email": {
      "command": "/abs/path/to/throwaway-email-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **DnsQuery** | DNS-over-HTTPS lookup interface at `/dns-query` — query a domain and receive a sinkhole answer if it is a known disposable provider. | `/dns-query` |
| **Domain** | Direct domain check — `GET /api/v1/domain/{domain}` returns whether that domain operates as a disposable email service. | `/api/v1/domain/{domain}` |
| **Email** | Direct email-address check — `GET /api/v1/email/{email}` extracts the domain and reports whether it is disposable. | `/api/v1/email/{email}` |
| **List** | Bulk / list views of the disposable-domain dataset that backs the detection service. | `/list.json` |
| **Resolve** | DNS-over-JSON lookup interface at `/resolve`, returning a JSON-formatted resolver response for a queried name. | `/resolve` |
| **V2n** | Combined v2 endpoint — `GET /api/v2/{subject}` — that accepts either an email address or a domain and returns a `{ success, isDisposable }` JSON result. | `/api/v2/{subject}` |
| **V3n** | Newer v3 detection endpoint exposed by the throwaway.cloud API surface for disposable / temporary mail lookups. | `/api/v3/{subject}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from throwawayemail_sdk import ThrowawayEmailSDK

client = ThrowawayEmailSDK({})


# Load a specific dnsquery
dnsquery, err = client.DnsQuery(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'throwawayemail_sdk.php';

$client = new ThrowawayEmailSDK([]);


// Load a specific dnsquery
[$dnsquery, $err] = $client->DnsQuery(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/throwaway-email-sdk/go"

client := sdk.NewThrowawayEmailSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ThrowawayEmail_sdk"

client = ThrowawayEmailSDK.new({})


# Load a specific dnsquery
dnsquery, err = client.DnsQuery(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("throwaway-email_sdk")

local client = sdk.new({})


-- Load a specific dnsquery
local dnsquery, err = client:DnsQuery(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ThrowawayEmailSDK.test()
const result = await client.DnsQuery().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ThrowawayEmailSDK.test(None, None)
result, err = client.DnsQuery(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ThrowawayEmailSDK::test(null, null);
[$result, $err] = $client->DnsQuery(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.DnsQuery(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ThrowawayEmailSDK.test(nil, nil)
result, err = client.DnsQuery(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:DnsQuery(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the throwaway.cloud API

- Upstream: [https://throwaway.cloud](https://throwaway.cloud)

- SDK is distributed under the Apache-2.0 license.
- The upstream throwaway.cloud service describes itself as "open source and free forever" with no API keys required.
- No specific upstream licence is named on the homepage; treat licence terms as those stated by throwaway.cloud / iocium.
- Attribute throwaway.cloud (iocium) if you surface results in a UI.

---

Generated from the throwaway.cloud API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
