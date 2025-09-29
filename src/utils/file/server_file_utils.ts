// external imports
import { stat } from 'node:fs/promises';

// internal imports
import { generateAlmostRandomUUID } from '../primitives/string/random_string_generation_utils';
import { extractFileExtension } from '../misc/path_utils';
import { isString } from '../misc/logic_utils';

// implementation
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

// exports
export {
    calcFileSizeInBytesAsync,
    replaceFileNameWithRandomUUID,
}