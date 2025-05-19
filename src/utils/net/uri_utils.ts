// external imports

// internal imports
import { isArray } from '../misc/logic_utils';

// implementation
function composeURLPath(pathParts: (string | number)[]): string {
    if (!isArray(pathParts)) {
        throw new RangeError('The provided path parts are not in array form - cannot compose URL path');
    }

    return pathParts.join('/');
}

// exports
export {
    composeURLPath,
}