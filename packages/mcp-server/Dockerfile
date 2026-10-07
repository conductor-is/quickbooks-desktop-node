# Dockerfile for the hosted Conductor MCP server (https://mcp.conductor.is/)
#
# This image is the server that executes the `execute` and `search_docs`
# tools. Render runs it with --transport=http (see render.yaml in the
# conductor repo); clients reach it over Streamable HTTP with their secret key
# in the Authorization header. The package's stdio transport is only a bridge
# to this hosted server (src/bridge.ts), so the container is never run over
# stdio.
#
# To build the image locally:
#   docker build -f packages/mcp-server/Dockerfile -t conductor-node-mcp:local .
#
# To run the image:
#   docker run -p 3000:3000 conductor-node-mcp:local --transport=http --port=3000
#
# For a full list of options:
#   docker run conductor-node-mcp:local --help

# Build stage
FROM node:24-alpine AS builder

# Install bash for build script. git is no longer needed by any dependency (the
# Deno worker fork is vendored under src/deno-http-worker) but is kept so a
# future git-pinned package cannot break the image build.
RUN apk add --no-cache bash openssl git

# Set working directory
WORKDIR /build

# Copy entire repository
COPY . .

# Install all dependencies and build everything
RUN yarn install --frozen-lockfile && \
    yarn build && \
    # Remove the symlink to the SDK so it doesn't interfere with the explicit COPY below
    rm -Rf packages/mcp-server/node_modules/conductor-node

FROM denoland/deno:alpine-2.7.1

# Install node and npm
RUN apk add --no-cache nodejs npm

ENV LD_LIBRARY_PATH=/usr/lib:/usr/local/lib

# Add non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy the built mcp-server dist directory
COPY --from=builder /build/packages/mcp-server/dist ./

# Copy node_modules from mcp-server (includes all production deps)
COPY --from=builder /build/packages/mcp-server/node_modules ./node_modules

# Copy the built conductor-node into node_modules
COPY --from=builder /build/dist ./node_modules/conductor-node

# Pinned MCP instructions snapshot, served verbatim at initialize
# via --custom-instructions-path (see src/instructions.ts).
COPY --from=builder /build/packages/mcp-server/instructions.md ./instructions.md

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app
RUN chown -R nodejs:nodejs /deno-dir

# Switch to non-root user
USER nodejs

# Pass --transport=http --port=<port> as the command (Render does); without
# arguments the entrypoint falls back to the stdio bridge, which needs
# CONDUCTOR_SECRET_KEY and is not what this image is for.

# Set the entrypoint to the MCP server
ENTRYPOINT ["node", "index.js"]

# Allow passing arguments to the MCP server
CMD []
