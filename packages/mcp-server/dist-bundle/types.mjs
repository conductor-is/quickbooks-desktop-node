// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
export function asTextContentResult(result) {
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}
export async function asBinaryContentResult(response) {
    const blob = await response.blob();
    const mimeType = blob.type;
    const data = Buffer.from(await blob.arrayBuffer()).toString('base64');
    if (mimeType.startsWith('image/')) {
        return {
            content: [{ type: 'image', mimeType, data }],
        };
    }
    else if (mimeType.startsWith('audio/')) {
        return {
            content: [{ type: 'audio', mimeType, data }],
        };
    }
    else {
        return {
            content: [
                {
                    type: 'resource',
                    resource: {
                        // We must give a URI, even though this isn't actually an MCP resource.
                        uri: 'resource://tool-response',
                        mimeType,
                        blob: data,
                    },
                },
            ],
        };
    }
}
export function asErrorResult(message) {
    return {
        content: [
            {
                type: 'text',
                text: message,
            },
        ],
        isError: true,
    };
}
//# sourceMappingURL=types.mjs.map