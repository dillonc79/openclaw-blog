#!/usr/bin/env node
import { installPlugins, parsePluginSource } from "./gitLoader.js"
import fs from "fs"
import path from "path"
import YAML from "yaml"

async function main() {
  // Parse quartz.config.yaml directly to avoid loading TypeScript files with SCSS imports
  const configPath = path.join(process.cwd(), "quartz.config.yaml")
  const raw = fs.readFileSync(configPath, "utf-8")
  const config = YAML.parse(raw)

  const plugins = config.plugins || []
  const externalPlugins = plugins
    .filter((p: any) => typeof p === "object" && p.source && String(p.source).startsWith("github:"))
    .map((p: any) => p.source)

  if (externalPlugins.length === 0) {
    console.log("No external plugins to install.")
    return
  }

  console.log(`Installing ${externalPlugins.length} plugin(s) from Git...`)

  const specs = externalPlugins.map((source: string) => parsePluginSource(source))
  const installed = await installPlugins(specs, { verbose: true })

  if (installed.size === externalPlugins.length) {
    console.log("✓ All plugins installed successfully")
  } else {
    console.error(`✗ Only ${installed.size}/${externalPlugins.length} plugins installed`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error("Failed to install plugins:", err)
  process.exit(1)
})
