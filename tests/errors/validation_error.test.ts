// external imports

// internal imports
import { CustomErrorName } from '../../src/declarations/error/custom_error_declarations';
import ValidationError from '../../src/errors/validation_error';

import { testErrorMessage1, testZodIssues1 } from './errors_test_data';

// implementation
describe('Validation error class tests...', () => {
    describe('Instance creation tests...', () => {
        test('Should create an instance of validation error...', async () => {
            const error = new ValidationError(testErrorMessage1, testZodIssues1);

            expect(error.name).toStrictEqual(CustomErrorName.ValidationError);
            expect(error.message).toStrictEqual(testErrorMessage1);
            expect(error.issues).toStrictEqual(testZodIssues1);
        });
    });
});

// exports