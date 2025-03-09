// external imports
import { ZodParsedType, ZodIssueCode } from 'zod';

// internal imports
import { ZodIssueWithInputData } from '../../src/declarations/validation_declarations';
import ValidationError from '../../src/errors/validation_error';

// implementation
describe('Validation error class tests...', () => {
    const testErrorMessage1 = 'Test error message 1';

    const testZodInvalidTypeIssue1: ZodIssueWithInputData = {
        inputName: 'testInput1',

        fatal: true,
        message: 'Invalid data type',

        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ZodParsedType.number,

        path: ['/form1/input1'],
    };

    const testZodInvalidTypeIssue2: ZodIssueWithInputData = {
        inputName: 'testInput2',

        fatal: false,
        message: 'Invalid data type',

        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ZodParsedType.string,

        path: ['/form1/testInput2'],
    };

    const testZodIssues1: ZodIssueWithInputData[] = [
        testZodInvalidTypeIssue1,
        testZodInvalidTypeIssue2
    ];

    describe('Instance creation tests...', () => {
        test('Should create an instance of validation error...', async () => {
            const error = new ValidationError(testErrorMessage1, testZodIssues1);

            expect(error.message).toStrictEqual(testErrorMessage1);
            expect(error.issues).toStrictEqual(testZodIssues1);
        });
    });
});

// exports