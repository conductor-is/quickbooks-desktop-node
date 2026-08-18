#!/usr/bin/env bash
# Parity verification for the self-hosted Conductor MCP server.
# Source of truth: conductor repo, plans/mcp-self-hosting-implementation.md, section 5.
#
# Usage:
#   NEW=http://localhost:3000 ./verify.sh              # unauthenticated probes only
#   NEW=https://mcp.conductor.is TEST_KEY=sk_... ./verify.sh          # + auth probes
#   NEW=... TEST_KEY=... RUN_SLOW=1 ./verify.sh        # + slow probes 8/8b/9 (~12 min)
#
# OLD defaults to the retired Stainless host; parity diffs against it only work
# while it is still live (pre Sept 1, 2026). After that, self-diff against
# production instead (plan section 8).
#
# Header-parity note: match on status, content-type, body, mcp-session-id echo,
# and x-powered-by only. Infra headers legitimately differ between hosts.
set -uo pipefail

OLD="${OLD:-https://conductor.stlmcp.com}"
NEW="${NEW:?set NEW to the server under test, e.g. http://localhost:3000}"
ACC='accept: application/json, text/event-stream'
CT='content-type: application/json'
FAILURES=0

pass() { echo "PASS: $1"; }
fail() { echo "FAIL: $1"; FAILURES=$((FAILURES + 1)); }

# Never diff stale captures from a previous pass (a leftover pair from a
# live-vs-live run would otherwise produce a false PASS on the localhost pass).
rm -f /tmp/init-*.json /tmp/tools-*.json

# --- 1. initialize parity at BOTH negotiated protocol versions (serverInfo,
# ---    capabilities, negotiated protocolVersion, instructions byte for byte)
for PV in 2025-06-18 2025-03-26; do
  for H in "$OLD" "$NEW"; do
    curl -s -X POST "$H/" -H "$CT" -H "$ACC" \
      -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\",\"params\":{\"protocolVersion\":\"$PV\",\"capabilities\":{},\"clientInfo\":{\"name\":\"parity\",\"version\":\"1.0.0\"}}}" \
      | sed -n 's/^data: //p' | jq -S '.result' > "/tmp/init-$PV-${H##*/}.json"
  done
  if diff -q "/tmp/init-$PV-${OLD##*/}.json" "/tmp/init-$PV-${NEW##*/}.json" > /dev/null; then
    pass "initialize parity at $PV"
  else
    fail "initialize parity at $PV"
    diff "/tmp/init-$PV-${OLD##*/}.json" "/tmp/init-$PV-${NEW##*/}.json" | head -20
  fi
done
# Note: the capture files store the .result object itself, so the key is
# .instructions here (the plan's section 5 text had .result.instructions).
SHA=$(jq -j '.instructions' "/tmp/init-2025-06-18-${NEW##*/}.json" | shasum -a 256 | cut -d' ' -f1)
if [ "$SHA" = "12d949698a7af3eb700034fac64e71b8f7d6abc7467fbb33bd08b202a63cf5af" ]; then
  pass "instructions sha256"
else
  fail "instructions sha256 (got $SHA)"
fi

# --- 2. tools/list parity (no auth, no prior initialize; proves statelessness too)
for H in "$OLD" "$NEW"; do
  curl -s -X POST "$H/" -H "$CT" -H "$ACC" \
    -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \
    | sed -n 's/^data: //p' | jq -S '.result' > "/tmp/tools-${H##*/}.json"
done
if diff -q "/tmp/tools-${OLD##*/}.json" "/tmp/tools-${NEW##*/}.json" > /dev/null; then
  pass "tools/list parity"
else
  fail "tools/list parity"
  diff "/tmp/tools-${OLD##*/}.json" "/tmp/tools-${NEW##*/}.json" | head -20
fi

# --- 3. Edge behaviors (expected values from edge-behaviors.txt)
S=$(curl -s -o /dev/null -w '%{http_code}' "$NEW/")
[ "$S" = "405" ] && pass "GET / is 405" || fail "GET / expected 405, got $S"
S=$(curl -s -o /dev/null -w '%{http_code}' -X DELETE "$NEW/")
[ "$S" = "405" ] && pass "DELETE / is 405" || fail "DELETE / expected 405, got $S"
B=$(curl -s "$NEW/health")
[ "$B" = "OK" ] && pass "/health returns OK" || fail "/health expected OK, got: $B"
R=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$NEW/" -H "$CT" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"x","version":"1"}}}')
[ "$R" = "406" ] && pass "POST without SSE Accept is 406" || fail "expected 406, got $R"

# --- 4. Unauthenticated tools/call: HTTP 200, SSE, in-band isError naming
# ---    CONDUCTOR_SECRET_KEY (this also PROVES the service env has no key)
B=$(curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(conductor) { return 1; }"}}}')
if echo "$B" | grep -q 'The CONDUCTOR_SECRET_KEY environment' && echo "$B" | grep -q '"isError":true'; then
  pass "unauthenticated execute returns in-band missing-key isError"
else
  fail "unauthenticated execute expected missing-key isError; got: $(echo "$B" | head -c 300)"
fi

# --- 5. Unknown tool and bad auth scheme
B=$(curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" \
  -d '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"nope","arguments":{}}}')
echo "$B" | grep -q 'Unknown tool: nope' && pass "unknown tool error" || fail "unknown tool error; got: $(echo "$B" | head -c 200)"
S=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$NEW/" -H "$CT" -H "$ACC" -H 'authorization: Basic foo' \
  -d '{"jsonrpc":"2.0","id":5,"method":"tools/list"}')
[ "$S" = "500" ] && pass "non-Bearer auth scheme is HTTP 500 (current hosted behavior)" || fail "expected 500, got $S"

# --- 10. Streaming shape and session-id echo
H10=$(curl -si -X POST "$NEW/" -H "$CT" -H "$ACC" -H 'mcp-session-id: echo-test-123' \
  -d '{"jsonrpc":"2.0","id":10,"method":"tools/list"}')
echo "$H10" | grep -qi '^content-type: text/event-stream' && pass "SSE content-type" || fail "SSE content-type"
echo "$H10" | grep -qi '^mcp-session-id: echo-test-123' && pass "mcp-session-id echoed" || fail "mcp-session-id echo"
echo "$H10" | grep -qi '^x-powered-by: Express' && pass "x-powered-by: Express" || fail "x-powered-by: Express"
echo "$H10" | grep -q '^event: message' && pass "body starts with event: message" || fail "SSE event line"
H10B=$(curl -si -X POST "$NEW/" -H "$CT" -H "$ACC" -d '{"jsonrpc":"2.0","id":10,"method":"tools/list"}' | grep -i '^mcp-session-id:')
echo "$H10B" | grep -qiE 'mcp-session-id: [0-9a-f-]{36}' && pass "fresh UUID session id without header" || fail "fresh UUID session id; got: $H10B"

if [ -n "${TEST_KEY:-}" ]; then
  # --- 6. execute with BOTH auth headers (real local Deno execution against the API)
  BODY=$(jq -n '{jsonrpc:"2.0",id:6,method:"tools/call",params:{name:"execute",arguments:{code:"async function run(conductor) { const page = await conductor.endUsers.list(); console.log(page.data.length); return \"ok\"; }"}}}')
  B=$(curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" -H "authorization: Bearer $TEST_KEY" -d "$BODY")
  echo "$B" | grep -q '"ok"' && ! echo "$B" | grep -q '"isError":true' && pass "execute via Authorization: Bearer" || fail "execute via Bearer; got: $(echo "$B" | head -c 300)"
  B=$(curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" -H "x-conductor-secret-key: $TEST_KEY" -d "$BODY")
  echo "$B" | grep -q '"ok"' && ! echo "$B" | grep -q '"isError":true' && pass "execute via x-conductor-secret-key" || fail "execute via x-conductor-secret-key; got: $(echo "$B" | head -c 300)"
  # NOTE (accepted content-shape difference, plan section 5 probe 6): the retired
  # hosted server returned ONE text block (JSON of {result, log_lines}); local
  # mode returns SEPARATE return-value/log text blocks. Eyeball; do not diff.

  # --- 7. search_docs (local index; content differs from the retired Stainless
  # ---    search API by design; tool name/schema/shape identical)
  B=$(curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" -H "authorization: Bearer $TEST_KEY" \
    -d '{"jsonrpc":"2.0","id":7,"method":"tools/call","params":{"name":"search_docs","arguments":{"query":"create invoice","language":"typescript"}}}')
  echo "$B" | grep -q 'invoices' && ! echo "$B" | grep -q '"isError":true' && pass "search_docs returns results" || fail "search_docs; got: $(echo "$B" | head -c 300)"

  # --- 11. Containment probe: the STATIC service env holds only the five configured
  # ---     MCP_SERVER_* vars plus platform/base-image vars, and no secrets.
  # ---     (Static baseline only; callers can add env to their OWN worker via
  # ---     x-stainless-mcp-client-envs, which is per-request, not cross-tenant.)
  BODY=$(jq -n '{jsonrpc:"2.0",id:11,method:"tools/call",params:{name:"execute",arguments:{code:"async function run(conductor) { return Object.keys((globalThis as any).Deno.env.toObject()).sort(); }"}}}')
  B=$(curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" -H "authorization: Bearer $TEST_KEY" -d "$BODY")
  if echo "$B" | grep -qE 'CONDUCTOR_|STAINLESS_'; then
    fail "containment probe: found CONDUCTOR_/STAINLESS_ vars in worker env: $(echo "$B" | head -c 400)"
  else
    pass "containment probe: no secrets in static worker env"
  fi
  echo "worker env keys: $(echo "$B" | head -c 600)"

  # --- 12. Concurrency cap is invisible to well-behaved callers
  N=$(seq 1 6 | xargs -P 6 -I{} curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" -H "authorization: Bearer $TEST_KEY" \
    -d '{"jsonrpc":"2.0","id":12,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(conductor) { return \"c-ok\"; }"}}}' \
    | grep -c 'c-ok')
  [ "$N" = "6" ] && pass "6 concurrent executes all succeed through the 4-slot cap" || fail "concurrency: expected 6 c-ok, got $N"
else
  echo "SKIP: probes 6, 7, 11, 12 (set TEST_KEY to run authenticated probes)"
fi

if [ -n "${TEST_KEY:-}" ] && [ -n "${RUN_SLOW:-}" ]; then
  # --- 8. Long-running call end to end with explicit time-to-first-byte
  BODY=$(jq -n '{jsonrpc:"2.0",id:8,method:"tools/call",params:{name:"execute",arguments:{code:"async function run(conductor) { await new Promise((r) => setTimeout(r, 150000)); return \"slept-150s\"; }"}}}')
  TIMING=$(curl -sN --max-time 400 -o /tmp/slow.out -w 'ttfb=%{time_starttransfer}s total=%{time_total}s' \
    -X POST "$NEW/" -H "$CT" -H "$ACC" -H "authorization: Bearer $TEST_KEY" -d "$BODY")
  echo "probe 8 timing: $TIMING"
  grep -q 'slept-150s' /tmp/slow.out && pass "150 s execute survives end to end" || fail "150 s execute"

  # --- 8b. Longer silent window, still BELOW the 300 s execution timeout
  BODY=$(jq -n '{jsonrpc:"2.0",id:88,method:"tools/call",params:{name:"execute",arguments:{code:"async function run(conductor) { await new Promise((r) => setTimeout(r, 240000)); return \"slept-240s\"; }"}}}')
  curl -sN --max-time 400 -X POST "$NEW/" -H "$CT" -H "$ACC" -H "authorization: Bearer $TEST_KEY" -d "$BODY" | grep -q 'slept-240s' \
    && pass "240 s execute survives end to end" || fail "240 s execute (see plan section 5 probe 8b contingency)"

  # --- 9. Execution timeout fires, THEN the server must still be alive
  BODY=$(jq -n '{jsonrpc:"2.0",id:9,method:"tools/call",params:{name:"execute",arguments:{code:"async function run(conductor) { await new Promise((r) => setTimeout(r, 320000)); return \"never\"; }"}}}')
  B=$(curl -s --max-time 400 -X POST "$NEW/" -H "$CT" -H "$ACC" -H "authorization: Bearer $TEST_KEY" -d "$BODY")
  echo "$B" | grep -q 'Code execution timed out after' && pass "execution timeout fires as in-band isError" || fail "timeout probe; got: $(echo "$B" | head -c 300)"
  sleep 2
  S=$(curl -s -o /dev/null -w '%{http_code}' "$NEW/health")
  [ "$S" = "200" ] && pass "/health 200 immediately after timeout (no crash)" || fail "server health after timeout: $S"
  N=$(curl -s -X POST "$NEW/" -H "$CT" -H "$ACC" -d '{"jsonrpc":"2.0","id":90,"method":"tools/list"}' | grep -c 'search_docs')
  [ "$N" -ge 1 ] && pass "tools/list still serves after timeout" || fail "tools/list after timeout"
else
  echo "SKIP: probes 8, 8b, 9 (set TEST_KEY and RUN_SLOW=1; takes ~12 minutes)"
fi

echo
if [ "$FAILURES" = "0" ]; then
  echo "ALL RUN PROBES PASSED"
else
  echo "$FAILURES PROBE(S) FAILED"
  exit 1
fi
