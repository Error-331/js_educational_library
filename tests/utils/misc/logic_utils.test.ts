// external imports

// internal imports
import { isBoolean } from '../../../src/utils/misc/logic_utils';

// implementation
describe('Logic utilities tests...', () => {
    const testBooleanValue1  = true;
    const testBooleanValue2 = false;

    const testNumericValue1 = 1;
    const testNumericValue2 = 0;

    const testStringValue1 = '';
    const testStringValue2 = 'test';

    const testNullValue: null = null;
    const testUndefinedValue: undefined = undefined;

    const testArray1: [] = [];
    const testArray2: number[] = [1, 2, 3];

    const testObject1 = {};
    const testObject2 = { testProp1: 'testVal1', testProp2: 'testVal2' };

    const testSymbol1 = Symbol();
    const testSymbol2 = Symbol.for('testSymbol1');

    const testBigInt1 = BigInt(Number.MAX_SAFE_INTEGER);
    const testBigInt2 = BigInt(Number.MAX_SAFE_INTEGER + 100);

    describe('isBoolean function tests...', () => {
        test('Should correctly determine that provided value is boolean - case 1', () => {
            expect(isBoolean(testBooleanValue1)).toBe(true);
        });

        test('Should correctly determine that provided value is boolean - case 2', () => {
            expect(isBoolean(testBooleanValue2)).toBe(true);
        });

        test('Should correctly determine that provided value is not boolean - case 1 (number)', () => {
            expect(isBoolean(testNumericValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 2 (number)', () => {
            expect(isBoolean(testNumericValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 3 (string)', () => {
            expect(isBoolean(testStringValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 4 (string)', () => {
            expect(isBoolean(testStringValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 5 (null)', () => {
            expect(isBoolean(testNullValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 6 (undefined)', () => {
            expect(isBoolean(testUndefinedValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 7 (array)', () => {
            expect(isBoolean(testArray1)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 8 (array)', () => {
            expect(isBoolean(testArray2)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 9 (object)', () => {
            expect(isBoolean(testObject1)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 10 (object)', () => {
            expect(isBoolean(testObject2)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 10 (symbol)', () => {
            expect(isBoolean(testSymbol1)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 11 (symbol)', () => {
            expect(isBoolean(testSymbol2)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 12 (BigInt)', () => {
            expect(isBoolean(testBigInt1)).toBe(false);
        });

        test('Should correctly determine that provided value is not boolean - case 13 (BigInt)', () => {
            expect(isBoolean(testBigInt2)).toBe(false);
        });
    });
});

// exports