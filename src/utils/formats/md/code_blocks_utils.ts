// external imports

// internal imports
import { MD_FORMAT_CODE_BLOCK_ELEMENT } from '../../../constants/formats/md_format_constants'

import { extractSubstringBetweenStrings } from '../../primitives/string/string_extraction_utils';
import { isString } from '../../misc/logic_utils';

// implementation
function extractSingleCodeBlock(mdString: string, codeName: string = ''): string {
    if (!isString(mdString)) {
        throw new RangeError('Cannot extract single MD code block - provided MD document is not a string');
    }

    return extractSubstringBetweenStrings(MD_FORMAT_CODE_BLOCK_ELEMENT + codeName, MD_FORMAT_CODE_BLOCK_ELEMENT, mdString);
}

// exports
export {
    extractSingleCodeBlock,
}