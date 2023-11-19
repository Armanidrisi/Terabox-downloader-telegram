"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsParser = void 0;
const SINGLE_QUOTE = "'";
const DOUBLE_QUOTE = '"';
function argsParser(str, entities = [], entityOffset = 0) {
    const mentions = {};
    for (const entity of entities) // extract all text_mentions into an { offset: length } map
        if (entity.type === 'text_mention' || entity.type === 'text_link')
            mentions[entity.offset - entityOffset] = entity.length;
    const args = [];
    let done = 0;
    let inside = undefined;
    let buf = '';
    function flush(to) {
        if (done !== to)
            args.push(buf + str.slice(done, to)), (inside = undefined);
        buf = '';
        done = to + 1;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        // quick lookup length of mention starting at i
        const mention = mentions[i];
        if (mention) {
            // if we're inside a quote, eagerly flush existing state
            flush(i);
            // this also consumes current index, so decrement
            done--;
            // fast forward to end of mention
            i += mention;
            flush(i);
        }
        else if (char === SINGLE_QUOTE || char === DOUBLE_QUOTE)
            if (inside)
                if (inside === char)
                    flush(i);
                else
                    continue;
            else
                flush(i), (inside = char);
        else if (char === ' ')
            if (inside)
                continue;
            else
                flush(i);
        else if (char === '\n')
            flush(i);
        else if (char === '\\')
            (buf += str.slice(done, i)), (done = ++i); // skip parsing the next char
        else
            continue;
    }
    if (done < str.length)
        flush(str.length);
    return args;
}
exports.argsParser = argsParser;
