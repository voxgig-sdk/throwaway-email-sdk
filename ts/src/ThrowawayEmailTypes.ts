// Typed models for the ThrowawayEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface DnsQuery {
}

export interface DnsQueryLoadMatch {
}

export interface DnsQueryCreateData {
}

export interface Domain {
  is_disposable?: boolean
  success?: boolean
}

export interface DomainLoadMatch {
  id: string
}

export interface Email {
  is_disposable?: boolean
  success?: boolean
}

export interface EmailLoadMatch {
  id: string
}

export interface List {
}

export interface ListLoadMatch {
}

export interface ListListMatch {
}

export interface Resolve {
}

export interface ResolveLoadMatch {
}

export interface V2n {
  is_disposable?: boolean
  success?: boolean
}

export interface V2nLoadMatch {
  subject: string
}

export interface V3n {
  record?: Record<string, any>
  success: boolean
  trait: any[]
}

export interface V3nLoadMatch {
  subject: string
}

