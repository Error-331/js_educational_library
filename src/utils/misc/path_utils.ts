// external imports
import { extname } from 'node:path';

// internal imports
import { isString } from './logic_utils';

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

// exports
export {
    extractFileExtension,
}