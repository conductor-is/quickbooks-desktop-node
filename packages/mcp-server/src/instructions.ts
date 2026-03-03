// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { readEnv } from './util';
import { getLogger } from './logger';

const INSTRUCTIONS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface InstructionsCacheEntry {
  fetchedInstructions: string;
  fetchedAt: number;
}

const instructionsCache = new Map<string, InstructionsCacheEntry>();

// Periodically evict stale entries so the cache doesn't grow unboundedly.
const _cacheCleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of instructionsCache) {
    if (now - entry.fetchedAt > INSTRUCTIONS_CACHE_TTL_MS) {
      instructionsCache.delete(key);
    }
  }
}, INSTRUCTIONS_CACHE_TTL_MS);

// Don't keep the process alive just for cleanup.
_cacheCleanupInterval.unref();

export async function getInstructions(stainlessApiKey: string | undefined): Promise<string> {
  const cacheKey = stainlessApiKey ?? '';
  const cached = instructionsCache.get(cacheKey);

  if (cached && Date.now() - cached.fetchedAt <= INSTRUCTIONS_CACHE_TTL_MS) {
    return cached.fetchedInstructions;
  }

  const fetchedInstructions = await fetchLatestInstructions(stainlessApiKey);
  instructionsCache.set(cacheKey, { fetchedInstructions, fetchedAt: Date.now() });
  return fetchedInstructions;
}

async function fetchLatestInstructions(stainlessApiKey: string | undefined): Promise<string> {
  // Setting the stainless API key is optional, but may be required
  // to authenticate requests to the Stainless API.
  const response = await fetch(
    readEnv('CODE_MODE_INSTRUCTIONS_URL') ?? 'https://api.stainless.com/api/ai/instructions/conductor',
    {
      method: 'GET',
      headers: { ...(stainlessApiKey && { Authorization: stainlessApiKey }) },
    },
  );

  let instructions: string | undefined;
  if (!response.ok) {
    getLogger().warn(
      'Warning: failed to retrieve MCP server instructions. Proceeding with default instructions...',
    );

    instructions = `
      This is the conductor MCP server. You will use Code Mode to help the user perform
      actions. You can use search_docs tool to learn about how to take action with this server. Then,
      you will write TypeScript code using the execute tool take action. It is CRITICAL that you be
      thoughtful and deliberate when executing code. Always try to entirely solve the problem in code
      block: it can be as long as you need to get the job done!
    `;
  }

  instructions ??= ((await response.json()) as { instructions: string }).instructions;
  instructions = `
    If needed, you can get the current time by executing Date.now().

    ${instructions}
  `;

  return instructions;
}
