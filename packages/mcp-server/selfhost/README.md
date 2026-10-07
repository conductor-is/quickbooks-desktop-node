# Self-hosting runbook home

This directory holds the parity baselines, verification script, and deploy log for the self-hosted Conductor MCP server at mcp.conductor.is.
The full implementation plan and runbook live in the conductor repo at plans/mcp-self-hosting-implementation.md.
The package's stdio transport is a bridge to this server; `CONDUCTOR_MCP_URL` overrides its upstream (default `https://mcp.conductor.is/`), which is how tests/execute-smoke.mjs drives the bridge against a local `--transport=http` instance.
