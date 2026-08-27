<?php
declare(strict_types=1);

// Typed models for the ThrowawayEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** DnsQuery entity data model. */
class DnsQuery
{
}

/** Request payload for DnsQuery#load. */
class DnsQueryLoadMatch
{
}

/** Request payload for DnsQuery#create. */
class DnsQueryCreateData
{
}

/** Domain entity data model. */
class Domain
{
    public ?string $id = null;
    public ?bool $isDisposable = null;
    public ?bool $success = null;
}

/** Request payload for Domain#load. */
class DomainLoadMatch
{
    public string $id;
}

/** Email entity data model. */
class Email
{
    public ?string $id = null;
    public ?bool $isDisposable = null;
    public ?bool $success = null;
}

/** Request payload for Email#load. */
class EmailLoadMatch
{
    public string $id;
}

/** List entity data model. */
class ListType
{
}

/** Request payload for List#load. */
class ListLoadMatch
{
}

/** Request payload for List#list. */
class ListListMatch
{
}

/** Resolve entity data model. */
class Resolve
{
}

/** Request payload for Resolve#load. */
class ResolveLoadMatch
{
}

/** V2n entity data model. */
class V2n
{
    public ?bool $isDisposable = null;
    public ?bool $success = null;
}

/** Request payload for V2n#load. */
class V2nLoadMatch
{
    public string $subject;
}

/** V3n entity data model. */
class V3n
{
    public ?array $records = null;
    public bool $success;
    public array $traits;
}

/** Request payload for V3n#load. */
class V3nLoadMatch
{
    public string $subject;
}

