# Typed models for the ThrowawayEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class DnsQuery:
    pass


@dataclass
class DnsQueryLoadMatch:
    pass


@dataclass
class DnsQueryCreateData:
    pass


@dataclass
class Domain:
    is_disposable: Optional[bool] = None
    success: Optional[bool] = None


@dataclass
class DomainLoadMatch:
    id: str


@dataclass
class Email:
    is_disposable: Optional[bool] = None
    success: Optional[bool] = None


@dataclass
class EmailLoadMatch:
    id: str


@dataclass
class List:
    pass


@dataclass
class ListLoadMatch:
    pass


@dataclass
class ListListMatch:
    pass


@dataclass
class Resolve:
    pass


@dataclass
class ResolveLoadMatch:
    pass


@dataclass
class V2n:
    is_disposable: Optional[bool] = None
    success: Optional[bool] = None


@dataclass
class V2nLoadMatch:
    subject: str


@dataclass
class V3n:
    success: bool
    trait: list
    record: Optional[dict] = None


@dataclass
class V3nLoadMatch:
    subject: str

