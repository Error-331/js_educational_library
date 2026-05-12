// external imports
import { readFileSync, writeFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path';

import parseDataURL from 'data-urls';

// internal imports
import { findMIMETypeByPathToFile } from './server_file_utils';
import { isNil, isNullOrEmpty } from '../misc/logic_utils';

// implementation
function readFileAsURLSync(pathToFile: string): { url: string, mimeType: string } {
    if (isNullOrEmpty(pathToFile)) {
        throw new RangeError(`Cannot read file as URL (sync) - path to file is not provided or empty`);
    }

    const buffer = readFileSync(pathToFile);
    const base64Data = buffer.toString('base64');

    const mimeType = findMIMETypeByPathToFile(pathToFile);

    return {
        url: `data:${mimeType};base64,${base64Data}`,
        mimeType
    };
}

async function readFileAsURLAsync(pathToFile: string): Promise<{ url: string, mimeType: string }> {
    if (isNullOrEmpty(pathToFile)) {
        throw new RangeError(`Cannot read file as URL (sync) - path to file is not provided or empty`);
    }

    const buffer = await readFile(pathToFile);
    const base64Data = buffer.toString('base64');

    const mimeType = findMIMETypeByPathToFile(pathToFile);

    return {
        url: `data:${mimeType};base64,${base64Data}`,
        mimeType
    };
}

function writeDataURLToFileSync(fileName: string, pathToFile: string | undefined | null , dataURL: string) {
    if (isNullOrEmpty(fileName)) {
        throw new RangeError('Cannot write data URL to file (sync) - file name is not provided');
    }

    const preparedPathToFile = isNullOrEmpty(pathToFile) ? './' : pathToFile;
    const preparedFullPath = path.join(preparedPathToFile, fileName);

    const parsedDataURL = parseDataURL(dataURL);

    if (isNil(parsedDataURL)) {
        throw new Error(`Cannot write data URL to file (sync) - cannot parse data URL`);
    }

    writeFileSync(preparedFullPath, parsedDataURL.body);
    return preparedFullPath;
}

async function writeDataURLToFileAsync(fileName: string, pathToFile: string | undefined | null , dataURL: string) {
    if (isNullOrEmpty(fileName)) {
        throw new RangeError('Cannot write data URL to file (async) - file name is not provided');
    }

    const preparedPathToFile = isNullOrEmpty(pathToFile) ? './' : pathToFile;
    const preparedFullPath = path.join(preparedPathToFile, fileName);

    const parsedDataURL = parseDataURL(dataURL);

    if (isNil(parsedDataURL)) {
        throw new Error(`Cannot write data URL to file (async) - cannot parse data URL`);
    }

    await writeFile(preparedFullPath, parsedDataURL.body);
    return preparedFullPath;
}

// exports
export {
    readFileAsURLSync,
    readFileAsURLAsync,

    writeDataURLToFileSync,
    writeDataURLToFileAsync,
}