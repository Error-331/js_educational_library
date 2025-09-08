// external imports

// internal imports
import {
    removeExtraLeadingSlashes,
    removeExtraTrailingSlashes,

    removeExtraLeadingSlashesButOne,
    removeExtraTrailingSlashesButOne,
} from '../../../src/utils/net/uri_utils';

// implementation
describe('URI utils tests...', () => {
    describe('removeExtraLeadingSlashes() function tests tests...', () => {
        test('Should remove all leading slashes from the input string', () => {
            const input = '///example/path';
            const expected = 'example/path';

            expect(removeExtraLeadingSlashes(input)).toBe(expected);
        });

        test('Should return the same string if no leading slashes exist', () => {
            const input = 'example/path';
            const expected = 'example/path';

            expect(removeExtraLeadingSlashes(input)).toBe(expected);
        });

        test('Should return an empty string if the input is only slashes', () => {
            const input = '/////';
            const expected = '';

            expect(removeExtraLeadingSlashes(input)).toBe(expected);
        });

        test('Should handle an empty string input', () => {
            const input = '';
            const expected = '';

            expect(removeExtraLeadingSlashes(input)).toBe(expected);
        });

        test('Should return a string without leading slashes while preserving trailing slashes', () => {
            const input = '///example/path/';
            const expected = 'example/path/';

            expect(removeExtraLeadingSlashes(input)).toBe(expected);
        });

        test('Should handle strings with special characters and remove only leading slashes', () => {
            const input = '///@example/123!';
            const expected = '@example/123!';

            expect(removeExtraLeadingSlashes(input)).toBe(expected);
        });
    });

    describe('removeExtraTrailingSlashes() function tests tests...', () => {
        test('Should remove all trailing slashes from the input string', () => {
            const input = 'example/path///';
            const expected = 'example/path';

            expect(removeExtraTrailingSlashes(input)).toBe(expected);
        });

        test('Should return the same string if no trailing slashes exist', () => {
            const input = 'example/path';
            const expected = 'example/path';

            expect(removeExtraTrailingSlashes(input)).toBe(expected);
        });

        test('Should return an empty string if the input is only slashes', () => {
            const input = '/////';
            const expected = '';

            expect(removeExtraTrailingSlashes(input)).toBe(expected);
        });

        test('Should handle an empty string input', () => {
            const input = '';
            const expected = '';

            expect(removeExtraTrailingSlashes(input)).toBe(expected);
        });

        test('Should return a string without trailing slashes while preserving leading slashes', () => {
            const input = '/example/path///';
            const expected = '/example/path';

            expect(removeExtraTrailingSlashes(input)).toBe(expected);
        });

        test('Should handle strings with special characters and remove only trailing slashes', () => {
            const input = '@example/123!///';
            const expected = '@example/123!';

            expect(removeExtraTrailingSlashes(input)).toBe(expected);
        });
    });

    describe('removeExtraLeadingSlashesButOne() function tests tests...', () => {
        test('Should remove all leading slashes but one from the input string', () => {
            const input = '///example/path';
            const expected = '/example/path';

            expect(removeExtraLeadingSlashesButOne(input)).toBe(expected);
        });

        test('Should return the same string if no leading slashes exist', () => {
            const input = 'example/path';
            const expected = 'example/path';

            expect(removeExtraLeadingSlashesButOne(input)).toBe(expected);
        });

        test('Should return a single slash character if the input is only slashes', () => {
            const input = '/////';
            const expected = '/';

            expect(removeExtraLeadingSlashesButOne(input)).toBe(expected);
        });

        test('Should handle an empty string input', () => {
            const input = '';
            const expected = '';

            expect(removeExtraLeadingSlashesButOne(input)).toBe(expected);
        });

        test('Should return a string with only one leading slash character while preserving trailing slashes', () => {
            const input = '///example/path//';
            const expected = '/example/path//';

            expect(removeExtraLeadingSlashesButOne(input)).toBe(expected);
        });

        test('Should handle strings with special characters and remove only leading slashes leaving only one slash character', () => {
            const input = '///@example/123!';
            const expected = '/@example/123!';

            expect(removeExtraLeadingSlashesButOne(input)).toBe(expected);
        });
    });

    describe('removeExtraTrailingSlashesButOne() function tests tests...', () => {
        test('Should remove all trailing slashes bit one from the input string', () => {
            const input = 'example/path///';
            const expected = 'example/path/';

            expect(removeExtraTrailingSlashesButOne(input)).toBe(expected);
        });

        test('Should return the same string if no trailing slashes exist', () => {
            const input = 'example/path';
            const expected = 'example/path';

            expect(removeExtraTrailingSlashesButOne(input)).toBe(expected);
        });

        test('Should return a single slash character if the input is only slashes', () => {
            const input = '/////';
            const expected = '/';

            expect(removeExtraTrailingSlashesButOne(input)).toBe(expected);
        });

        test('Should handle an empty string input', () => {
            const input = '';
            const expected = '';

            expect(removeExtraTrailingSlashesButOne(input)).toBe(expected);
        });

        test('Should return a string with only one trailing slash character while preserving leading slashes', () => {
            const input = '//example/path///';
            const expected = '//example/path/';

            expect(removeExtraTrailingSlashesButOne(input)).toBe(expected);
        });

        test('Should handle strings with special characters and remove only leading slashes leaving only one slash character', () => {
            const input = '@example/123!///';
            const expected = '@example/123!/';

            expect(removeExtraTrailingSlashesButOne(input)).toBe(expected);
        });
    });
});

// exports