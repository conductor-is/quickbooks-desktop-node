# Self-hosting runbook home

This directory holds the parity baselines, verification script, and deploy log for the self-hosted Conductor MCP server at mcp.conductor.is.
The Render service (`conductor-mcp`, mcp.conductor.is) is defined in the conductor repo's `render.yaml`: blueprint-managed, and it auto-deploys every commit on this repo's main after CI passes. `DEPLOYS.md` is the deploy and rollback history; `verify.sh` is the parity gate to re-run after any runtime change (regen, MCP SDK bump, deno base image), diffing against the snapshot files beside it.
The package's stdio transport is a bridge to this server; `CONDUCTOR_MCP_URL` overrides its upstream (default `https://mcp.conductor.is/`), which is how tests/execute-smoke.mjs drives the bridge against a local `--transport=http` instance.
