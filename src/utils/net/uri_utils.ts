// external imports

// internal imports
import { isArray, isString, isNullOrEmpty } from '../misc/logic_utils';

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
 * Example: removeExtraLeadingSlashes('///example/path'); // result: example/path
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
 * Example: removeExtraTrailingSlashes('example/path///'); // result: example/path
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

function sanitizeURLPathPartFromRoot(urlPathPart: string): string {
    if (!isString(urlPathPart)) {
        throw new RangeError('Cannot sanitize URL path part (from root) - url path part must be of type string');
    }

    urlPathPart = removeExtraLeadingSlashesButOne(urlPathPart);
    urlPathPart = removeExtraTrailingSlashes(urlPathPart);

    return urlPathPart;
}

/**
 *
 * Example: removeExtraTrailingSlashes('///example/path///'); // result: example/path
 *
 */
function sanitizeURLPathPart(urlPathPart: string, removeLeadingSlash = true, removeTrailingSlash = true): string {
    if (!isString(urlPathPart)) {
        throw new RangeError('Cannot sanitize URL path part - url path part must be of type string');
    }

    urlPathPart = removeLeadingSlash ? removeExtraLeadingSlashes(urlPathPart) : removeExtraLeadingSlashesButOne(urlPathPart);
    urlPathPart = removeTrailingSlash ? removeExtraTrailingSlashes(urlPathPart) : removeExtraTrailingSlashesButOne(urlPathPart);

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
    const sanitizedPathPart2 = sanitizeURLPathPart(pathPart2);

    if (isNullOrEmpty(sanitizedPathPart1) && isNullOrEmpty(sanitizedPathPart2)) {
        return '';
    } else if (!isNullOrEmpty(sanitizedPathPart1) && isNullOrEmpty(sanitizedPathPart2)) {
        return sanitizedPathPart1;
    } else if (isNullOrEmpty(sanitizedPathPart1) && !isNullOrEmpty(sanitizedPathPart2)) {
        return sanitizedPathPart2;
    } else {
        return `${sanitizedPathPart1}/${sanitizedPathPart2}`;
    }
}

function combineMultipleURLPaths(pathParts: string[], removeLeadingSlash = true, removeTrailingSlash = true): string {
    if (!isArray(pathParts) || pathParts.some(part => !isString(part))) {
        throw new RangeError('Cannot combine multiple URL parts - all path parts must be strings');
    }

    const sanitizedParts = pathParts.map(pathPart => sanitizeURLPathPart(pathPart, removeLeadingSlash, removeTrailingSlash));
    return sanitizedParts.join('/');
}

// exports
export {
    sanitizeURLPathPartFromRoot,
    sanitizeURLPathPart,

    removeExtraLeadingSlashes,
    removeExtraTrailingSlashes,

    removeExtraLeadingSlashesButOne,
    removeExtraTrailingSlashesButOne,

    composeURLPath,
    combineURLPaths,

    combineMultipleURLPaths,
}