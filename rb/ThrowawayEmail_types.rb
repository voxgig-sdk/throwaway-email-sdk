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

# Request payload for DnsQuery#load.
#
# @!attribute [rw] dns
#   @return [String]
DnsQueryLoadMatch = Struct.new(
  :dns,
  keyword_init: true
)

# Request payload for DnsQuery#create.
class DnsQueryCreateData
end

# Domain entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isDisposable
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Domain = Struct.new(
  :id,
  :isDisposable,
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
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isDisposable
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Email = Struct.new(
  :id,
  :isDisposable,
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

# Request payload for List#load.
class ListLoadMatch
end

# Request payload for List#list.
class ListListMatch
end

# Resolve entity data model.
class Resolve
end

# Request payload for Resolve#load.
#
# @!attribute [rw] cd
#   @return [Boolean, nil]
#
# @!attribute [rw] do
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
ResolveLoadMatch = Struct.new(
  :cd,
  :do,
  :name,
  :type,
  keyword_init: true
)

# V2n entity data model.
#
# @!attribute [rw] isDisposable
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
V2n = Struct.new(
  :isDisposable,
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
# @!attribute [rw] records
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean]
#
# @!attribute [rw] traits
#   @return [Array]
V3n = Struct.new(
  :records,
  :success,
  :traits,
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

