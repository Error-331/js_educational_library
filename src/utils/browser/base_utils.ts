// external imports

// internal imports
import { isNil, isObject } from '../misc/logic_utils';

// implementation
function isWindowAvailable() {
    return !(isNil(window) || !isObject(window));
}

function throwIfWindowNotAvailable() {
    if (!isWindowAvailable()) {
        throw new Error('Window object is not available - not a browser environment');
    }
}

// exports
export {
    isWindowAvailable,
    throwIfWindowNotAvailable,
}