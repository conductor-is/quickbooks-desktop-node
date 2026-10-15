"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireValue = exports.readEnvOrError = exports.readEnv = void 0;
const readEnv = (env) => {
    if (typeof globalThis.process !== 'undefined') {
        return globalThis.process.env?.[env]?.trim() || undefined;
    }
    else if (typeof globalThis.Deno !== 'undefined') {
        return globalThis.Deno.env?.get?.(env)?.trim() || undefined;
    }
    return;
};
exports.readEnv = readEnv;
const readEnvOrError = (env) => {
    let envValue = (0, exports.readEnv)(env);
    if (envValue === undefined) {
        throw new Error(`Environment variable ${env} is not set`);
    }
    return envValue;
};
exports.readEnvOrError = readEnvOrError;
const requireValue = (value, description) => {
    if (value === undefined) {
        throw new Error(`Missing required value: ${description}`);
    }
    return value;
};
exports.requireValue = requireValue;
//# sourceMappingURL=util.js.map