"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructions = getInstructions;
const promises_1 = __importDefault(require("fs/promises"));
const logger_1 = require("./logger.js");
const INSTRUCTIONS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const instructionsCache = new Map();
async function getInstructions({ stainlessApiKey, customInstructionsPath, }) {
    const now = Date.now();
    const cacheKey = customInstructionsPath ?? stainlessApiKey ?? '';
    const cached = instructionsCache.get(cacheKey);
    if (cached && now - cached.fetchedAt <= INSTRUCTIONS_CACHE_TTL_MS) {
        return cached.fetchedInstructions;
    }
    // Evict stale entries so the cache doesn't grow unboundedly.
    for (const [key, entry] of instructionsCache) {
        if (now - entry.fetchedAt > INSTRUCTIONS_CACHE_TTL_MS) {
            instructionsCache.delete(key);
        }
    }
    let fetchedInstructions;
    if (customInstructionsPath) {
        fetchedInstructions = await fetchLatestInstructionsFromFile(customInstructionsPath);
    }
    else {
        fetchedInstructions =
            '\n  This is the conductor MCP server.\n\n  Available tools:\n  - search_docs: Search SDK documentation to find the right methods and parameters.\n  - execute: Run TypeScript code against a pre-authenticated SDK client. Define an async run(client) function.\n\n  Workflow:\n  - If unsure about the API, call search_docs first.\n  - Write complete solutions in a single execute call when possible. For large datasets, use API filters to narrow results or paginate within a single execute block.\n  - If execute returns an error, read the error and fix your code rather than retrying the same approach.\n  - Variables do not persist between execute calls. Return or log all data you need.\n  - Individual HTTP requests to the API have a 30-second timeout. If a request times out, try a smaller query or add filters.\n  - Code execution has a total timeout of approximately 5 minutes. If your code times out, simplify it or break it into smaller steps.\n  ';
    }
    instructionsCache.set(cacheKey, { fetchedInstructions, fetchedAt: now });
    return fetchedInstructions;
}
async function fetchLatestInstructionsFromFile(path) {
    try {
        return await promises_1.default.readFile(path, 'utf-8');
    }
    catch (error) {
        (0, logger_1.getLogger)().error({ error, path }, 'Error fetching instructions from file');
        throw error;
    }
}
//# sourceMappingURL=instructions.js.map