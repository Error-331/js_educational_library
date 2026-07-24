// external imports
import { constants, readFileSync, writeFileSync } from 'node:fs';
import { access, stat, readFile, writeFile } from 'node:fs/promises';

// internal imports
import { generateAlmostRandomUUID } from '../primitives/string/random_string_generation_utils';
import { findMIMETypeByFileExtensionNoneComposite } from '../net/mime_types_utils';
import { extractFileExtension } from '../misc/path_utils';
import { isNullOrEmpty, isString } from '../misc/logic_utils';

// implementation
async function checkFileExists(pathToFile: string): Promise<boolean> {
    if (isNullOrEmpty(pathToFile)) {
        throw new RangeError('Cannot check whether file exists or not - path to file is not provided');
    }

    try {
        await access(pathToFile, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

async function calcFileSizeInBytesAsync(pathToFile: string): Promise<number> {
    if (!isString(pathToFile)) {
        throw new RangeError('Cannot calculate size of the file in bytes - provided path to file is not a string');
    }

    const stats = await stat(pathToFile);
    return stats.size;
}

function replaceFileNameWithRandomUUID(filename: string): string {
    if (!isString(filename)) {
        throw new RangeError('Cannot replace filename with UUID - provided file name is not a string');
    }

    const fileExt = extractFileExtension(filename);
    return `${generateAlmostRandomUUID()}${fileExt}`;
}

function readJSONFileSync<JSONObjectType extends object>(path: string): JSONObjectType {
    if (!isString(path)) {
        throw new RangeError('Cannot read JSON file - path to file is not a string');
    }

    const fileContents = readFileSync(path, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(fileContents);
}

async function readJSONFileAsync<JSONObjectType extends object>(path: string): Promise<JSONObjectType> {
    if (!isString(path)) {
        throw new RangeError('Cannot read JSON file - path to file is not a string');
    }

    const fileContents = await readFile(path, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(fileContents);
}

function writeJSONFileSync<JSONObjectType extends object>(path: string, data: JSONObjectType): void {
    if (!isString(path)) {
        throw new RangeError('Cannot write JSON file - path to file is not a string');
    }

    writeFileSync(path, JSON.stringify(data, null, 2));
}

async function writeJSONFileAsync<JSONObjectType extends object>(path: string, data: JSONObjectType): Promise<void> {
    if (!isString(path)) {
        throw new RangeError('Cannot write JSON file - path to file is not a string');
    }

    await writeFile(path, JSON.stringify(data, null, 2));
}

function findMIMETypeByPathToFile(pathToFile: string): string {
    if (isNullOrEmpty(pathToFile)) {
        throw new RangeError(`Cannot find MIME type for file - path to file is not provided or empty`);
    }

    const fileExtension = extractFileExtension(pathToFile);
    return findMIMETypeByFileExtensionNoneComposite(fileExtension);
}

// exports
export {
    checkFileExists,
    calcFileSizeInBytesAsync,
    replaceFileNameWithRandomUUID,
    readJSONFileSync,
    readJSONFileAsync,
    writeJSONFileSync,
    writeJSONFileAsync,
    findMIMETypeByPathToFile,
}