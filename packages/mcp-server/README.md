# QuickBooks Desktop Node.js MCP Server

## Installation

The tools run on Conductor's hosted MCP server at `https://mcp.conductor.is/`. Clients that support Streamable HTTP (Claude Code, Cursor, VS Code, Codex, Claude Cowork) connect to that URL directly with your secret key in the `Authorization` header. Clients that only speak stdio (Claude Desktop) run this package, which is a thin bridge to the hosted server: it needs only Node.js and `CONDUCTOR_SECRET_KEY`, and nothing executes on your machine. The full per-client guide is at [docs.conductor.is/usage/mcp](https://docs.conductor.is/usage/mcp).

### Direct invocation

You can run the bridge directly via `npx`:

```sh
export CONDUCTOR_SECRET_KEY="sk_conductor_..."
npx -y conductor-node-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For stdio clients with a configuration JSON (Claude Desktop on Mac and Windows), it looks like this; replace only `sk_conductor_...` with your secret key:

```json
{
  "mcpServers": {
    "conductor": {
      "command": "npx",
      "args": ["-y", "conductor-node-mcp"],
      "env": {
        "CONDUCTOR_SECRET_KEY": "sk_conductor_..."
      }
    }
  }
}
```

Add `"--code-allow-http-gets"` to `args` for read-only access. Set `CONDUCTOR_MCP_URL` in `env` to point the bridge at a different server, for example a self-hosted `--transport=http` instance (see "Running remotely" below).

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=conductor-node-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImNvbmR1Y3Rvci1ub2RlLW1jcCJdLCJlbnYiOnsiQ09ORFVDVE9SX1NFQ1JFVF9LRVkiOiJza19jb25kdWN0b3JfLi4uIn19)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.dev/redirect/mcp/install?name=conductor-node-mcp&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22conductor-node-mcp%22%5D%2C%22env%22%3A%7B%22CONDUCTOR_SECRET_KEY%22%3A%22sk_conductor_...%22%7D%7D)

### Claude Code

If you use Claude Code, connect it to the hosted server by running the command below in your terminal, replacing `sk_conductor_...` with your secret key.

```
claude mcp add --transport http conductor https://mcp.conductor.is/ --header "Authorization: Bearer sk_conductor_..."
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in an
isolated sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code will be executed in a sandbox environment without web or filesystem access. Then,
  anything the code returns or prints will be returned to the agent as the result of the
  tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

## Running remotely

Launching the package with `--transport=http` runs the actual MCP server (the mode `https://mcp.conductor.is/` runs) using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket. Code execution in this mode needs [Deno](https://deno.land) on the server.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------------ | ------------------------ | --------------- |
| `x-conductor-secret-key` | `apiKey` | BearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "conductor_node_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```
