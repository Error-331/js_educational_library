// external imports

// internal imports
import { SetCookieOptions } from '../../../../src/declarations/net/cookie_declarations';
import ValidationError from '../../../../src/errors/validation_error';

import { validateSetCookieOptions } from '../../../../src/validators/net/http/cookie_validators';

// implementation
describe('Cookie validators tests...', () => {
    const setCookieOptions1Positive: SetCookieOptions = {
        domain: 'localhost',
        httpOnly: true,
        maxAge: 5000,
        path: '/',
        secure: false,
    };

    const setCookieOptions1Negative = {
        domain: 214,
        httpOnly: 22,
        maxAge: 'test',
        path: '/',
        secure: false,
    };

    describe('validateSetCookieOptions() function tests...', () => {
        describe('Positive validation results tests...', () => {
            test('Should successfully validated cookie options - case 1', () => {
                const validationResults = validateSetCookieOptions(setCookieOptions1Positive);
                expect(validationResults).toEqual(setCookieOptions1Positive);
            });
        });

        describe('Negative validation results tests...', () => {
            test('Should validated cookie options successfully - case 2', () => {
                expect(() => validateSetCookieOptions(setCookieOptions1Negative as SetCookieOptions)).toThrowError(ValidationError);
            });
        });
    });
});

// exports