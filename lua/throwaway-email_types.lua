-- Typed models for the ThrowawayEmail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class DnsQuery

---@class DnsQueryLoadMatch

---@class DnsQueryCreateData

---@class Domain
---@field isDisposable? boolean
---@field success? boolean

---@class DomainLoadMatch
---@field id string

---@class Email
---@field isDisposable? boolean
---@field success? boolean

---@class EmailLoadMatch
---@field id string

---@class List

---@class ListLoadMatch

---@class ListListMatch

---@class Resolve

---@class ResolveLoadMatch

---@class V2n
---@field isDisposable? boolean
---@field success? boolean

---@class V2nLoadMatch
---@field subject string

---@class V3n
---@field records? table
---@field success boolean
---@field traits table

---@class V3nLoadMatch
---@field subject string

local M = {}

return M
