// Typed models for the ThrowawayEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface DnsQuery {
}

export interface DnsQueryLoadMatch {
  dns: string
}

export interface DnsQueryCreateData {
}

export interface Domain {
  id?: string
  isDisposable?: boolean
  success?: boolean
}

export interface DomainLoadMatch {
  id: string
}

export interface Email {
  id?: string
  isDisposable?: boolean
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
  cd?: boolean
  do?: boolean
  name: string
  type?: string
}

export interface V2n {
  isDisposable?: boolean
  success?: boolean
}

export interface V2nLoadMatch {
  subject: string
}

export interface V3n {
  records?: Record<string, any>
  success: boolean
  traits: any[]
}

export interface V3nLoadMatch {
  subject: string
}

