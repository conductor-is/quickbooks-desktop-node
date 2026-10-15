"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStainlessApiKey = exports.parseClientAuthHeaders = void 0;
const parseClientAuthHeaders = (req, required) => {
    if (req.headers.authorization) {
        const scheme = req.headers.authorization.split(' ')[0];
        const value = req.headers.authorization.slice(scheme.length + 1);
        switch (scheme) {
            case 'Bearer':
                return { apiKey: req.headers.authorization.slice('Bearer '.length) };
            default:
                throw new Error('Unsupported authorization scheme. Expected the "Authorization" header to be a supported scheme (Bearer).');
        }
    }
    else if (required) {
        throw new Error('Missing required Authorization header; see WWW-Authenticate header for details.');
    }
    const apiKey = Array.isArray(req.headers['x-conductor-secret-key']) ?
        req.headers['x-conductor-secret-key'][0]
        : req.headers['x-conductor-secret-key'];
    return { apiKey };
};
exports.parseClientAuthHeaders = parseClientAuthHeaders;
const getStainlessApiKey = (req, mcpOptions) => {
    // Try to get the key from the x-stainless-api-key header
    const headerKey = Array.isArray(req.headers['x-stainless-api-key']) ?
        req.headers['x-stainless-api-key'][0]
        : req.headers['x-stainless-api-key'];
    if (headerKey && typeof headerKey === 'string') {
        return headerKey;
    }
    // Fall back to value set in the mcpOptions (e.g. from environment variable), if provided
    return mcpOptions.stainlessApiKey;
};
exports.getStainlessApiKey = getStainlessApiKey;
//# sourceMappingURL=auth.js.map