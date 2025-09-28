// external imports
import { stat } from 'node:fs/promises';

// internal imports
import { isString } from '../misc/logic_utils';

// implementation
async function calcFileSizeInBytesAsync(pathToFile: string): Promise<number> {
    if (!isString(pathToFile)) {
        throw new RangeError('Cannot calculate size of the file in bytes - provided path to file is not a string');
    }

    const stats = await stat(pathToFile);
    return stats.size;
}

// exports
export {
    calcFileSizeInBytesAsync,
}