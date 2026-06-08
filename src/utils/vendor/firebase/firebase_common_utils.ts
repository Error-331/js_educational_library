// external imports

// internal imports
import { generateRandomString } from '../../primitives/string/random_string_generation_utils';

// implementation
function generateRandomFirestoreId() {
    return generateRandomString(20);
}

// exports
export {
    generateRandomFirestoreId,
}
