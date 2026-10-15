// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { pino } from 'pino';
import pretty from 'pino-pretty';
let _logger;
export function configureLogger({ level, pretty: usePretty }) {
    _logger = pino({
        level,
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            level(label) {
                return { level: label };
            },
        },
    }, usePretty ? pretty({ colorize: true, levelFirst: true, destination: 2 }) : process.stderr);
}
export function getLogger() {
    if (!_logger) {
        throw new Error('Logger has not been configured. Call configureLogger() before using the logger.');
    }
    return _logger;
}
//# sourceMappingURL=logger.mjs.map