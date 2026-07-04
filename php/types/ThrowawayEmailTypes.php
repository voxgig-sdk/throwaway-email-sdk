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

/** Match filter for DnsQuery#load (any subset of DnsQuery fields). */
class DnsQueryLoadMatch
{
}

/** Match filter for DnsQuery#create (any subset of DnsQuery fields). */
class DnsQueryCreateData
{
}

/** Domain entity data model. */
class Domain
{
    public ?bool $is_disposable = null;
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
    public ?bool $is_disposable = null;
    public ?bool $success = null;
}

/** Request payload for Email#load. */
class EmailLoadMatch
{
    public string $id;
}

/** List entity data model. */
class List
{
}

/** Match filter for List#load (any subset of List fields). */
class ListLoadMatch
{
}

/** Match filter for List#list (any subset of List fields). */
class ListListMatch
{
}

/** Resolve entity data model. */
class Resolve
{
}

/** Match filter for Resolve#load (any subset of Resolve fields). */
class ResolveLoadMatch
{
}

/** V2n entity data model. */
class V2n
{
    public ?bool $is_disposable = null;
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
    public ?array $record = null;
    public bool $success;
    public array $trait;
}

/** Request payload for V3n#load. */
class V3nLoadMatch
{
    public string $subject;
}

