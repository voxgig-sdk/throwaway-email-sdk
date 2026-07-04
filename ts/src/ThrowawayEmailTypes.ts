// Typed models for the ThrowawayEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface DnsQuery {
}

export type DnsQueryLoadMatch = Partial<DnsQuery>

export type DnsQueryCreateData = Partial<DnsQuery>

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

export type ListLoadMatch = Partial<List>

export type ListListMatch = Partial<List>

export interface Resolve {
}

export type ResolveLoadMatch = Partial<Resolve>

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

