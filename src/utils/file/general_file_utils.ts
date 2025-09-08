// external imports
import { stat } from 'node:fs/promises';

// internal imports
import { isString } from '../misc/logic_utils';

// implementation
function isFile(file: File): file is File {
    return file instanceof File;
}

async function extractBinaryDataFromFile(file: File): Promise<Uint8Array> {
    if (!isFile(file)) {
        throw new RangeError('Cannot extract binary data from a file - provided value is not a valid file');
    }

    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

async function calcFileSizeInBytesAsync(pathToFile: string): Promise<number> {
    if (!isString(pathToFile)) {
        throw new RangeError('Cannot calculate size of the file in bytes - provided path to file is not a string');
    }

    const stats = await stat(pathToFile);
    return stats.size;
}

// exports
export {
    isFile,
    extractBinaryDataFromFile,
    calcFileSizeInBytesAsync,
}