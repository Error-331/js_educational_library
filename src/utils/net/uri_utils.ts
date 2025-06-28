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

function sanitizeURLPathPart(urlPathPart: string) {
    if (!isString(urlPathPart)) {
        throw new RangeError('Cannot sanitize URL path part - url path part must be of type string');
    }

    urlPathPart = urlPathPart.endsWith('/') ? urlPathPart.slice(0, -1) : urlPathPart;
    urlPathPart = urlPathPart.startsWith('/') ? urlPathPart.slice(1) : urlPathPart;

    return urlPathPart;
}

function combineURLPaths(pathPart1: string, pathPart2: string): string {
    if (!isString(pathPart1)) {
        throw new RangeError('Cannot combine URL parts - first path part must be of type string');
    }

    if (!isString(pathPart2)) {
        throw new RangeError('Cannot combine URL parts - second path part must be of type string');
    }

    const sanitizedPathPart1 = sanitizeURLPathPart(pathPart1);
    const sanitizedPathPart2 = sanitizeURLPathPart(pathPart2)

    return `${sanitizedPathPart1}/${sanitizedPathPart2}`;
}

function combineMultipleURLPaths(pathParts: string[]): string {
    if (!isArray(pathParts) || pathParts.some(part => !isString(part))) {
        throw new RangeError('Cannot combine multiple URL parts - all path parts must be strings');
    }

    const sanitizedParts = pathParts.map(sanitizeURLPathPart);
    return sanitizedParts.join('/');
}

// exports
export {
    sanitizeURLPathPart,

    composeURLPath,
    combineURLPaths,

    combineMultipleURLPaths,
}