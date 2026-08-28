// Typed models for the ThrowawayEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/throwaway-email-sdk/go/core"
)

// DnsQuery is the typed data model for the dns_query entity.
type DnsQuery struct {
}

// DnsQueryLoadMatch is the typed request payload for DnsQuery.LoadTyped.
type DnsQueryLoadMatch struct {
	Dns string `json:"dns"`
}

// DnsQueryCreateData is the typed request payload for DnsQuery.CreateTyped.
type DnsQueryCreateData struct {
}

// Domain is the typed data model for the domain entity.
type Domain struct {
	Id *string `json:"id,omitempty"`
	IsDisposable *bool `json:"isDisposable,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// DomainLoadMatch is the typed request payload for Domain.LoadTyped.
type DomainLoadMatch struct {
	Id string `json:"id"`
}

// Email is the typed data model for the email entity.
type Email struct {
	Id *string `json:"id,omitempty"`
	IsDisposable *bool `json:"isDisposable,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// EmailLoadMatch is the typed request payload for Email.LoadTyped.
type EmailLoadMatch struct {
	Id string `json:"id"`
}

// List is the typed data model for the list entity.
type List struct {
}

// ListLoadMatch is the typed request payload for List.LoadTyped.
type ListLoadMatch struct {
}

// ListListMatch is the typed request payload for List.ListTyped.
type ListListMatch struct {
}

// Resolve is the typed data model for the resolve entity.
type Resolve struct {
}

// ResolveLoadMatch is the typed request payload for Resolve.LoadTyped.
type ResolveLoadMatch struct {
	Cd *bool `json:"cd,omitempty"`
	Do *bool `json:"do,omitempty"`
	Name string `json:"name"`
	Type *string `json:"type,omitempty"`
}

// V2n is the typed data model for the v2n entity.
type V2n struct {
	IsDisposable *bool `json:"isDisposable,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// V2nLoadMatch is the typed request payload for V2n.LoadTyped.
type V2nLoadMatch struct {
	Subject string `json:"subject"`
}

// V3n is the typed data model for the v3n entity.
type V3n struct {
	Records *map[string]any `json:"records,omitempty"`
	Success bool `json:"success"`
	Traits []any `json:"traits"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
