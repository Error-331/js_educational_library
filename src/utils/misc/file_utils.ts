// external imports
import { readFileSync } from 'node:fs';

// internal imports
import { isString } from './logic_utils';

// implementation
function readJSONFileSync(path: string) {
    if (!isString(path)) {
        throw new RangeError('Cannot read JSON file - path to file is not a string');
    }

    const fileContents = readFileSync(path, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(fileContents);
}

// exports
export {
    readJSONFileSync,
}