# Deploy log (append-only)

Every deploy of the conductor-mcp Render service records: date, SDK repo commit SHA, and deployed image digest.
See plans/mcp-self-hosting-implementation.md (conductor repo) sections 4 and 8.

## 2026-08-18: initial deploy (parity-gated)

- Render service: conductor-mcp (srv-da1udorutv3s73b4erg0), Conductor workspace, region oregon, plan standard, autoDeploy off.
- Deploy: dep-da1udpbutv3s73b4es5g, commit cab24b24b1149658e6b14b3861d401eb27cecef7 (main), live 2026-08-18T05:02:32Z. Render exposes no image digest for git-built docker deploys; the rollback anchor is this deploy ID.
- Domain: mcp.conductor.is (verified; Vercel DNS CNAME rec_46694906697d56a0c6c48e48 to conductor-mcp.onrender.com).
- Verification: selfhost/verify.sh fully green against live conductor.stlmcp.com, including auth probes with both headers, containment probe (no secrets in worker env), 6-way concurrency, ttfb 0.089s, 150s and 240s streams, 300s timeout with post-timeout liveness. Real-client smoke via mcp-remote passed.
- Drill: second deploy dep-da1ulngu01pc73dgkvn0 (live 05:18:19Z), then API rollback dep-da1unmjncjis7385anhg (live in 41s); an in-flight 150s execute started 6s before the rollback completed 107s AFTER switchover with the correct result. SIGTERM drain verified empirically; no SIGTERM-handler patch needed.
- Monitors: Betterstack 4826254 (GET /health, keyword OK, 60s), 4826256 (POST initialize, keyword conductor_node_api, 180s); status page resource 8993165 ("MCP server") backed by the initialize monitor.
