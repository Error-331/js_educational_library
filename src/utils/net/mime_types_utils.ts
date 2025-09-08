// external imports

// internal imports
import { MimeTypeValue } from '../../net/common/mime_type_declarations';

import FILE_EXTENSION_TO_MIME_TYPE from '../../constants/net/common/file_extension_to_mime_type_constants';
import { MIME_TYPE_BIN } from '../../constants/net/common/mime_types_constants';

import { trimStringFormatter } from '../primitives/string/basic_string_formatting_utils';
import { isNil, isString } from '../misc/logic_utils';

// implementation
function findMIMETypeByFileExtension(fileExtension: string): MimeTypeValue {
    if (!isString(fileExtension)) {
        throw new RangeError('Cannot find MIME type by file extension - file extension must be of type string');
    }

    let preparedFileExtension = fileExtension.toLowerCase();
    preparedFileExtension = preparedFileExtension.replace(/^(\.+)/g, '');
    preparedFileExtension = trimStringFormatter(preparedFileExtension);

    if (preparedFileExtension.length <= 1) {
        throw new RangeError('Cannot find MIME type by file extension - file extension must be at least one character long');
    }

    const mimeType = FILE_EXTENSION_TO_MIME_TYPE[preparedFileExtension];
    return isNil(mimeType) ? MIME_TYPE_BIN : mimeType;
}

// exports
export {
    findMIMETypeByFileExtension,
}