// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
export const readEnv = (env) => {
    if (typeof globalThis.process !== 'undefined') {
        return globalThis.process.env?.[env]?.trim() || undefined;
    }
    else if (typeof globalThis.Deno !== 'undefined') {
        return globalThis.Deno.env?.get?.(env)?.trim() || undefined;
    }
    return;
};
export const readEnvOrError = (env) => {
    let envValue = readEnv(env);
    if (envValue === undefined) {
        throw new Error(`Environment variable ${env} is not set`);
    }
    return envValue;
};
export const requireValue = (value, description) => {
    if (value === undefined) {
        throw new Error(`Missing required value: ${description}`);
    }
    return value;
};
//# sourceMappingURL=util.mjs.map