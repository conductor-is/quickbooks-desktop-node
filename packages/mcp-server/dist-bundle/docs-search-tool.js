"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.tool = exports.metadata = void 0;
exports.setLocalSearch = setLocalSearch;
const types_1 = require("./types.js");
exports.metadata = {
    resource: 'all',
    operation: 'read',
    tags: [],
    httpMethod: 'get',
};
exports.tool = {
    name: 'search_docs',
    description: 'Search SDK documentation to find methods, parameters, and usage examples for interacting with the API. Use this before writing code when you need to discover the right approach.',
    inputSchema: {
        type: 'object',
        properties: {
            query: {
                type: 'string',
                description: 'The query to search for.',
            },
            language: {
                type: 'string',
                description: 'The language for the SDK to search for.',
                enum: ['http', 'python', 'go', 'typescript', 'javascript', 'terraform', 'ruby', 'java', 'kotlin'],
            },
            detail: {
                type: 'string',
                description: 'The amount of detail to return.',
                enum: ['default', 'verbose'],
            },
        },
        required: ['query', 'language'],
    },
    annotations: {
        readOnlyHint: true,
    },
};
let _localSearch;
function setLocalSearch(search) {
    _localSearch = search;
}
async function searchLocal(args) {
    if (!_localSearch) {
        throw new Error('Local search not initialized');
    }
    const query = args['query'] ?? '';
    const language = args['language'] ?? 'typescript';
    const detail = args['detail'] ?? 'default';
    return _localSearch.search({
        query,
        language,
        detail,
        maxResults: 10,
    }).results;
}
const handler = async ({ reqContext, args, }) => {
    const body = args ?? {};
    return (0, types_1.asTextContentResult)(await searchLocal(body));
};
exports.handler = handler;
exports.default = { metadata: exports.metadata, tool: exports.tool, handler: exports.handler };
//# sourceMappingURL=docs-search-tool.js.map