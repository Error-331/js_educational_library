// external imports

// internal imports
import { SetCookieOptions } from '../../../../src/declarations/net/http/cookie_declarations';
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

    const setCookieOptions2Positive: SetCookieOptions = {
        domain: 'localhost',
        httpOnly: false,
        maxAge: 15000,
        path: '/test.com',
        secure: false,
        sameSite: 'strict',
        priority: 'medium'
    };

    const setCookieOptions1Negative = {
        domain: 214,
        httpOnly: 22,
        maxAge: 'test',
        path: '/',
        secure: false,
    };

    const setCookieOptions2Negative = {
        domain: '/',
        httpOnly: true,
        maxAge: 25000,
        path: '/',
        secure: false,
        sameSite: 'bam!',
    };

    describe('validateSetCookieOptions() function tests...', () => {
        describe('Positive validation results tests...', () => {
            test('Should successfully validated cookie options - case 1', () => {
                const validationResults = validateSetCookieOptions(setCookieOptions1Positive);
                expect(validationResults).toEqual(setCookieOptions1Positive);
            });

            test('Should successfully validated cookie options - case 2', () => {
                const validationResults = validateSetCookieOptions(setCookieOptions2Positive);
                expect(validationResults).toEqual(setCookieOptions2Positive);
            });
        });

        describe('Negative validation results tests...', () => {
            test('Should validated cookie options successfully - case 1', () => {
                expect(() => validateSetCookieOptions(setCookieOptions1Negative as SetCookieOptions)).toThrowError(ValidationError);
            });

            test('Should validated cookie options successfully - case 2', () => {
                expect(() => validateSetCookieOptions(setCookieOptions2Negative as SetCookieOptions)).toThrowError(ValidationError);
            });
        });
    });
});

// exports