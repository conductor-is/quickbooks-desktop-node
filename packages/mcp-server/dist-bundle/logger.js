"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureLogger = configureLogger;
exports.getLogger = getLogger;
const pino_1 = require("pino");
const pino_pretty_1 = __importDefault(require("pino-pretty"));
let _logger;
function configureLogger({ level, pretty: usePretty }) {
    _logger = (0, pino_1.pino)({
        level,
        timestamp: pino_1.pino.stdTimeFunctions.isoTime,
        formatters: {
            level(label) {
                return { level: label };
            },
        },
    }, usePretty ? (0, pino_pretty_1.default)({ colorize: true, levelFirst: true, destination: 2 }) : process.stderr);
}
function getLogger() {
    if (!_logger) {
        throw new Error('Logger has not been configured. Call configureLogger() before using the logger.');
    }
    return _logger;
}
//# sourceMappingURL=logger.js.map