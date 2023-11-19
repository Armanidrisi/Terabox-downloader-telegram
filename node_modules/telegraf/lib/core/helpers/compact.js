"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compactOptions = void 0;
function compactOptions(options) {
    if (!options) {
        return options;
    }
    const compacted = {};
    for (const key in options)
        if (
        // todo(mkr): replace with Object.hasOwn in v5 (Node 16+)
        Object.prototype.hasOwnProperty.call(options, key) &&
            options[key] !== undefined)
            compacted[key] = options[key];
    return compacted;
}
exports.compactOptions = compactOptions;
