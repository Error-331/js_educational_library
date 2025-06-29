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

/**
 * Removes all leading slashes from the start of a string.
 *
 * @param {string} pathPart - the path part to modify.
 *
 * @throws {RangeError} if path part is not a string.
 *
 * @returns {string} -  URL path part without at most one leading slash.
 */
function removeExtraLeadingSlashes(pathPart: string): string {
    if (!isString(pathPart)) {
        throw new RangeError('Cannot remove all leading "/" (slash) characters from URL path part - url path part must be of type string');
    }

    return pathPart.replace(/^\/+/, '');
}

/**
 * Removes all trailing slashes from the end of a string.
 *
 * @param {string} pathPart - the path part to modify.
 *
 * @throws {RangeError} if path part is not a string.
 *
 * @returns {string} - URL path part without trailing slash.
 */
function removeExtraTrailingSlashes(pathPart: string): string {
    if (!isString(pathPart)) {
        throw new RangeError('Cannot remove all trailing "/" (slash) characters from URL path part - url path part must be of type string');
    }

    return pathPart.replace(/\/+$/, '');
}

/**
 * Removes all leading slashes from the start of a string, leaving only one.
 *
 * @param {string} pathPart - the path part to modify.
 *
 * @throws {RangeError} if path part is not a string.
 *
 * @returns {string} -  URL path part with at most one leading slash.
 */
function removeExtraLeadingSlashesButOne(pathPart: string): string {
    if (!isString(pathPart)) {
        throw new RangeError('Cannot remove leading "/" (slash) characters from URL path part - url path part must be of type string');
    }

    return pathPart.replace(/^\/+/, '/');
}

/**
 * Removes all trailing slashes from the end of a string.
 *
 * @param {string} pathPart - the path part to modify.
 *
 * @throws {RangeError} if path part is not a string.
 *
 * @returns {string} - URL path part with at most one trailing slash.
 */
function removeExtraTrailingSlashesButOne(pathPart: string): string {
    if (!isString(pathPart)) {
        throw new RangeError('Cannot remove trailing "/" (slash) characters from URL path part - url path part must be of type string');
    }

    return pathPart.replace(/\/+$/, '/');
}

function sanitizeURLPathPart(urlPathPart: string): string {
    if (!isString(urlPathPart)) {
        throw new RangeError('Cannot sanitize URL path part - url path part must be of type string');
    }

    urlPathPart = removeExtraTrailingSlashes(urlPathPart);
    urlPathPart = removeExtraTrailingSlashes(urlPathPart);

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

    removeExtraLeadingSlashes,
    removeExtraTrailingSlashes,

    removeExtraLeadingSlashesButOne,
    removeExtraTrailingSlashesButOne,

    composeURLPath,
    combineURLPaths,

    combineMultipleURLPaths,
}