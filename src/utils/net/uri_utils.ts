// external imports

// internal imports
import { isArray, isString } from '../misc/logic_utils';

// implementation
function composeURLPath(pathParts: (string | number)[]): string {
    if (!isArray(pathParts)) {
        throw new RangeError('cannot compose URL path - the provided path parts are not in array form');
    }

    return pathParts.join('/');
}

function combineURLPaths(pathPart1: string, pathPart2: string): string {
    if (!isString(pathPart1)) {
        throw new RangeError('Cannot combine URL parts - first path part must be of type string');
    }

    if (!isString(pathPart2)) {
        throw new RangeError('Cannot combine URL parts - second path part must be of type string');
    }

    const sanitizedPathPart1 = pathPart1.endsWith('/') ? pathPart1.slice(0, -1) : pathPart1;
    const sanitizedPathPart2 = pathPart2.startsWith('/') ? pathPart2.slice(1) : pathPart2;

    return `${sanitizedPathPart1}/${sanitizedPathPart2}`;
}

// exports
export {
    composeURLPath,
    combineURLPaths,
}