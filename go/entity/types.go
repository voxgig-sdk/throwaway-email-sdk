// Typed models for the ThrowawayEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// DnsQuery is the typed data model for the dns_query entity.
type DnsQuery struct {
}

// DnsQueryLoadMatch mirrors the dns_query fields as an all-optional match
// filter (Go analog of Partial<DnsQuery>).
type DnsQueryLoadMatch struct {
}

// DnsQueryCreateData mirrors the dns_query fields as an all-optional match
// filter (Go analog of Partial<DnsQuery>).
type DnsQueryCreateData struct {
}

// Domain is the typed data model for the domain entity.
type Domain struct {
	IsDisposable *bool `json:"is_disposable,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// DomainLoadMatch is the typed request payload for Domain.LoadTyped.
type DomainLoadMatch struct {
	Id string `json:"id"`
}

// Email is the typed data model for the email entity.
type Email struct {
	IsDisposable *bool `json:"is_disposable,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// EmailLoadMatch is the typed request payload for Email.LoadTyped.
type EmailLoadMatch struct {
	Id string `json:"id"`
}

// List is the typed data model for the list entity.
type List struct {
}

// ListLoadMatch mirrors the list fields as an all-optional match
// filter (Go analog of Partial<List>).
type ListLoadMatch struct {
}

// ListListMatch mirrors the list fields as an all-optional match
// filter (Go analog of Partial<List>).
type ListListMatch struct {
}

// Resolve is the typed data model for the resolve entity.
type Resolve struct {
}

// ResolveLoadMatch mirrors the resolve fields as an all-optional match
// filter (Go analog of Partial<Resolve>).
type ResolveLoadMatch struct {
}

// V2n is the typed data model for the v2n entity.
type V2n struct {
	IsDisposable *bool `json:"is_disposable,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// V2nLoadMatch is the typed request payload for V2n.LoadTyped.
type V2nLoadMatch struct {
	Subject string `json:"subject"`
}

// V3n is the typed data model for the v3n entity.
type V3n struct {
	Record *map[string]any `json:"record,omitempty"`
	Success bool `json:"success"`
	Trait []any `json:"trait"`
}

// V3nLoadMatch is the typed request payload for V3n.LoadTyped.
type V3nLoadMatch struct {
	Subject string `json:"subject"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
