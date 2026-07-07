// external imports
import { extname, basename, sep } from 'node:path';

// internal imports
import { isNil, isString } from './logic_utils';

// implementation
function extractFileExtension(pathToFile: string): string {
    if (!isString(pathToFile)) {
        throw new RangeError('Cannot extract file extension - provided path to file is not a string');
    }

    const fileExtension = extname(pathToFile);

    if (fileExtension.length <= 0) {
        throw new Error('Cannot extract file extension');
    }

    return fileExtension;
}

/**
 * Extracts the file name from a given file path.
 *
 * @param pathToFile - The full path to the file.
 *
 * @throws RangeError if the provided path to file is not a string.
 * @throws Error if the file name cannot be extracted.
 *
 * @returns The name of the file.
 *
 */
function extractFileName(pathToFile: string): string {
    if (!isString(pathToFile)) {
        throw new RangeError('Cannot extract file name - provided path to file is not a string');
    }

    const fileName = basename(pathToFile);

    if (!fileName || fileName.length <= 0) {
        throw new Error('Cannot extract file name');
    }

    return fileName;
}


/**
 * Extracts the file name without extension from a given file path.
 *
 * @param pathToFile - The full path to the file.
 *
 * @throws RangeError if the provided path to file is not a string.
 * @throws Error if the file name cannot be extracted.
 *
 * @returns The name of the file without its extension.
 *
 */
function extractFileNameWithoutExtension(pathToFile: string): string {
    if (!isString(pathToFile)) {
        throw new RangeError('Cannot extract file name - provided path to file is not a string');
    }

    const fileName = basename(pathToFile);
    const fileExtension = extname(pathToFile);

    if (!fileName || fileName.length <= 0) {
        throw new Error('Cannot extract file name');
    }

    if (!isNil(fileExtension)) {
        const nameWithoutExtension = fileName.slice(0, -fileExtension.length);
        if (!nameWithoutExtension || nameWithoutExtension.length <= 0) {
            throw new Error('Cannot extract file name without extension');
        }

        return nameWithoutExtension;
    }

    return fileName;
}

function removeFirstDirectory(fullPath: string): string {
    if (!isString(fullPath)) {
        throw new RangeError('Cannot remove first directory from path - provided path is not a string');
    }

    const fullPathStructure = fullPath.split(sep);

    if (fullPathStructure.length <= 1) {
        throw new RangeError('Cannot remove first directory from path - provided path length is less than or equal to 1');
    }

    fullPathStructure.shift();
    return fullPathStructure.join(sep);
}

// exports
export {
    extractFileExtension,
    extractFileName,
    extractFileNameWithoutExtension,
    removeFirstDirectory,
}