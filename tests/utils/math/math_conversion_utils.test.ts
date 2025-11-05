// external imports

// internal imports
import { extractDecimalPartAsString } from '../../../src/utils/math/math_conversion_utils';

// implementation
describe('Math conversion utilities tests...', () => {
    describe('extractDecimalPartAsString() function tests...', () => {
        test('should return the decimal part as a string for a positive number', () => {
            const input = 123.456;
            const result = extractDecimalPartAsString(input);
            expect(result).toBe('456');
        });

        test('should return the decimal part as a string for a negative number', () => {
            const input = -123.456;
            const result = extractDecimalPartAsString(input);
            expect(result).toBe('456');
        });

        test('should return an empty string if the number is an integer', () => {
            const input = 123;
            const result = extractDecimalPartAsString(input);
            expect(result).toBe('0');
        });

        test('should handle numbers with no digits after the decimal point', () => {
            const input = 123.0;
            const result = extractDecimalPartAsString(input);
            expect(result).toBe('0');
        });

        test('should return the decimal part as a string for a number smaller than 1', () => {
            const input = 0.789;
            const result = extractDecimalPartAsString(input);
            expect(result).toBe('789');
        });

        test('should return an empty string for 0', () => {
            const input = 0;
            const result = extractDecimalPartAsString(input);
            expect(result).toBe('0');
        });
    });
});

// exports

