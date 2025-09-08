// external imports

// internal imports
import { MIME_TYPE_JPEG, MIME_TYPE_HTML, MIME_TYPE_APNG, MIME_TYPE_BIN  } from '../../../src/constants/net/common/mime_types_constants';
import { findMIMETypeByFileExtension } from '../../../src/utils/net/mime_types_utils';

// implementation
describe('MIME types utils tests...', () => {
    describe('findMIMETypeByFileExtension() function tests...', () => {
        test('Should return the correct MIME type for a known file extension', () => {
            expect(findMIMETypeByFileExtension('.jpeg')).toBe(MIME_TYPE_JPEG);
            expect(findMIMETypeByFileExtension('.html')).toBe(MIME_TYPE_HTML);
            expect(findMIMETypeByFileExtension('.png')).toBe(MIME_TYPE_APNG);
        });

        test('Should return "binary" MIME type for an unknown file extension', () => {
            expect(findMIMETypeByFileExtension('unknownext')).toBe(MIME_TYPE_BIN );
        });

        test('Should handle uppercase file extensions correctly', () => {
            expect(findMIMETypeByFileExtension('JPEG')).toBe(MIME_TYPE_JPEG);
            expect(findMIMETypeByFileExtension('HTML')).toBe(MIME_TYPE_HTML);
        });

        test('Should handle extensions with leading or trailing spaces', () => {
            expect(findMIMETypeByFileExtension(' jpeg ')).toBe(MIME_TYPE_JPEG);
        });

        test('Should throw an error if an empty string is provided', () => {
            expect(() => findMIMETypeByFileExtension('')).toThrowError(Error);
        });
    });
});

// exports