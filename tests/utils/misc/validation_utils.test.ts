// external imports
import { SafeParseReturnType } from 'zod/lib/types';

// internal imports
import ValidationError from '../../../src/errors/validation_error';

import {
    testErrorMessage1,
    testErrorInput1,

    testZodIssues1,
} from '../../errors/errors_test_data';

import { createValidationError } from '../../../src/utils/misc/validation_utils';
import { cloneArrayDeep } from '../../../src/utils/primitives/object_utils';

// implementation
describe('Validation utilities tests...', () => {
    describe('createValidationError() function tests...', () => {
        const zodSafeValue1 = {
            success: false,
            error: {
                errors: cloneArrayDeep(testZodIssues1)
            }
        };

        const testZodIssues1Copy = cloneArrayDeep(testZodIssues1).slice().map((issue) => { issue.inputName = testErrorInput1; return issue });

        test('Should correctly create validation error - case 1...', () => {
            const validationError = createValidationError<null, unknown>(zodSafeValue1 as SafeParseReturnType<null, unknown>, testErrorInput1, testErrorMessage1);

            expect(validationError instanceof ValidationError).toEqual(true);

            expect(validationError.message).toStrictEqual(testErrorMessage1);
            expect(validationError.issues).toStrictEqual(testZodIssues1Copy);
        });
    });
});

// exports