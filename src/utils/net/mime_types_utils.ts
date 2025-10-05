// external imports

// internal imports
import { MimeTypeValue } from '../../net/common/mime_type_declarations';

import FILE_EXTENSION_TO_MIME_TYPE from '../../constants/net/common/file_extension_to_mime_type_constants';
import { META_MIME_TYPE_VIDEO, MIME_TYPE_BIN } from '../../constants/net/common/mime_types_constants';

import { trimStringFormatter } from '../primitives/string/basic_string_formatting_utils';
import { curry } from '../misc/functional_utils';
import {isNil, isString, isArray, isObject } from '../misc/logic_utils';

// implementation
/**
 * Finds the MIME type associated with a given file extension.
 *
 * @param {string} fileExtension - The file extension for which the MIME type is being retrieved.
 *
 * @throws {RangeError} - If the provided file extension is not a string.
 * @throws {RangeError} - If the processed file extension is less than or equal to one character in length.
 *
 * @returns {MimeTypeValue} - The MIME type corresponding to the file extension. If not found, returns a binary MIME type.
 */
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

function findMIMETypeByFileExtensionAndMetaType(metaType: string, fileExtension: string): string | string[] {
    if (!isString(metaType)) {
        throw new RangeError('Cannot find MIME type by file extension and meta type - meta type must be of type string');
    }

    const mimeType = findMIMETypeByFileExtension(fileExtension);

    if (isArray(mimeType)) {
        return mimeType;
    } else if (isObject(mimeType)) {
        const mimeSubType = mimeType[metaType];

        if (isNil(mimeSubType)) {
            throw new Error(`Cannot find MIME type by file extension and meta type - MIME type for meta type '${metaType}' is not found`);
        }

        return mimeSubType;
    } else {
        return mimeType;
    }
}

const findMIMETypeByFileExtensionAndVideoMetaType = curry(findMIMETypeByFileExtensionAndMetaType)(META_MIME_TYPE_VIDEO);

// exports
export {
    findMIMETypeByFileExtension,
    findMIMETypeByFileExtensionAndMetaType,
    findMIMETypeByFileExtensionAndVideoMetaType,
}