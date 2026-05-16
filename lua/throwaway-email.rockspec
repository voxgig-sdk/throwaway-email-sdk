package = "voxgig-sdk-throwaway-email"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/throwaway-email-sdk.git"
}
description = {
  summary = "ThrowawayEmail SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["throwaway-email_sdk"] = "throwaway-email_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
