# Typed models for the ThrowawayEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class DnsQuery(TypedDict):
    pass


class DnsQueryLoadMatch(TypedDict):
    dns: str


class DnsQueryCreateData(TypedDict):
    pass


class Domain(TypedDict, total=False):
    id: str
    isDisposable: bool
    success: bool


class DomainLoadMatch(TypedDict):
    id: str


class Email(TypedDict, total=False):
    id: str
    isDisposable: bool
    success: bool


class EmailLoadMatch(TypedDict):
    id: str


class List(TypedDict):
    pass


class ListLoadMatch(TypedDict):
    pass


class ListListMatch(TypedDict):
    pass


class Resolve(TypedDict):
    pass


class ResolveLoadMatchRequired(TypedDict):
    name: str


class ResolveLoadMatch(ResolveLoadMatchRequired, total=False):
    cd: bool
    do: bool
    type: str


class V2n(TypedDict, total=False):
    isDisposable: bool
    success: bool


class V2nLoadMatch(TypedDict):
    subject: str


class V3nRequired(TypedDict):
    success: bool
    traits: list


class V3n(V3nRequired, total=False):
    records: dict


class V3nLoadMatch(TypedDict):
    subject: str
