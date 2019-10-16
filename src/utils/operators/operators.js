const equal = ({ received, expected, not = false }) => {
    let result;
    switch (typeof received) {
        case 'object':
            // for null, because 'typeof null' returns 'object'
            if (received === null) {
                result = !!received === !!expected;
            } else {
                // for other normal objects and arrays
                result = JSON.stringify(received) === JSON.stringify(expected);
            }
            break;
        case 'string':
        case 'number':
        case 'boolean':
            result = received === expected; break;
        case 'undefined':
            // undefined === 0,'' is considered true
            result = !!received === !!expected; break;
        default: // symbol, function
            result = false; break;
    }
    if (not) return !result;
    return result;
};

const empty = ({ received, not = false }) => {
    let result;
    switch (typeof received) {
        case 'object':
            // for null, because 'typeof null' returns 'object'
            if (received === null) {
                result = true;
            } else if (Array.isArray(received)) {
                // for array, because 'typeof []' returns 'object'
                result = received.length === 0;
            } else {
                // for other normal objects
                result = Object.keys(received).length === 0;
            }
            break;
        case 'string':
            result = received === ''; break;
        case 'number':
            result = false; break;
        case 'boolean':
            result = false; break;
        case 'undefined':
            result = true; break;
        default: // symbol, function
            result = true; break;
    }
    if (not) return !result;
    return result;
};

const match = ({ received, expected, not = false }) => {
    const urlPatterns = expected.split(',');
    const result = urlPatterns.some(pattern => new RegExp(pattern, 'g').test(received));
    if (not) return !result;
    return result;
};

// TODO: greaterthan should take types into consideration
const greaterthan = ({ received, expected, not = false }) => {
    if (received === undefined) { return false; }
    const result = received > expected;
    if (not) return !result;
    return result;
};

const operators = {
    equal,
    empty,
    match,
    greaterthan,
};

export default operators;
