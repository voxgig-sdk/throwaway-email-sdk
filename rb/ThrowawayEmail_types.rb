# frozen_string_literal: true

# Typed models for the ThrowawayEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# DnsQuery entity data model.
class DnsQuery
end

# Match filter for DnsQuery#load (any subset of DnsQuery fields).
class DnsQueryLoadMatch
end

# Match filter for DnsQuery#create (any subset of DnsQuery fields).
class DnsQueryCreateData
end

# Domain entity data model.
#
# @!attribute [rw] is_disposable
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Domain = Struct.new(
  :is_disposable,
  :success,
  keyword_init: true
)

# Request payload for Domain#load.
#
# @!attribute [rw] id
#   @return [String]
DomainLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Email entity data model.
#
# @!attribute [rw] is_disposable
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Email = Struct.new(
  :is_disposable,
  :success,
  keyword_init: true
)

# Request payload for Email#load.
#
# @!attribute [rw] id
#   @return [String]
EmailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# List entity data model.
class List
end

# Match filter for List#load (any subset of List fields).
class ListLoadMatch
end

# Match filter for List#list (any subset of List fields).
class ListListMatch
end

# Resolve entity data model.
class Resolve
end

# Match filter for Resolve#load (any subset of Resolve fields).
class ResolveLoadMatch
end

# V2n entity data model.
#
# @!attribute [rw] is_disposable
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
V2n = Struct.new(
  :is_disposable,
  :success,
  keyword_init: true
)

# Request payload for V2n#load.
#
# @!attribute [rw] subject
#   @return [String]
V2nLoadMatch = Struct.new(
  :subject,
  keyword_init: true
)

# V3n entity data model.
#
# @!attribute [rw] record
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
#
# @!attribute [rw] trait
#   @return [Array]
V3n = Struct.new(
  :record,
  :success,
  :trait,
  keyword_init: true
)

# Request payload for V3n#load.
#
# @!attribute [rw] subject
#   @return [String]
V3nLoadMatch = Struct.new(
  :subject,
  keyword_init: true
)

