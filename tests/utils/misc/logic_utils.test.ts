// external imports

// internal imports
import {
    isBoolean,
    isNumber,
    isString,
    isObject,
} from '../../../src/utils/misc/logic_utils';

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
        test('Should correctly determine that provided value is a boolean - case 1', () => {
            expect(isBoolean(testBooleanValue1)).toBe(true);
        });

        test('Should correctly determine that provided value is a boolean - case 2', () => {
            expect(isBoolean(testBooleanValue2)).toBe(true);
        });

        test('Should correctly determine that provided value is not a boolean - case 1 (number)', () => {
            expect(isBoolean(testNumericValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 2 (number)', () => {
            expect(isBoolean(testNumericValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 3 (string)', () => {
            expect(isBoolean(testStringValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 4 (string)', () => {
            expect(isBoolean(testStringValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 5 (null)', () => {
            expect(isBoolean(testNullValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 6 (undefined)', () => {
            expect(isBoolean(testUndefinedValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 7 (array)', () => {
            expect(isBoolean(testArray1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 8 (array)', () => {
            expect(isBoolean(testArray2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 9 (object)', () => {
            expect(isBoolean(testObject1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 10 (object)', () => {
            expect(isBoolean(testObject2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 11 (symbol)', () => {
            expect(isBoolean(testSymbol1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 12 (symbol)', () => {
            expect(isBoolean(testSymbol2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 13 (BigInt)', () => {
            expect(isBoolean(testBigInt1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a boolean - case 14 (BigInt)', () => {
            expect(isBoolean(testBigInt2)).toBe(false);
        });
    });

    describe('isNumber function tests...', () => {
        test('Should correctly determine that provided value is a number - case 1', () => {
            expect(isNumber(testNumericValue1)).toBe(true);
        });

        test('Should correctly determine that provided value is a number - case 2', () => {
            expect(isNumber(testNumericValue2)).toBe(true);
        });

        test('Should correctly determine that provided value is not a number - case 1 (boolean)', () => {
            expect(isNumber(testBooleanValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 2 (boolean)', () => {
            expect(isNumber(testBooleanValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 3 (string)', () => {
            expect(isNumber(testStringValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 4 (string)', () => {
            expect(isNumber(testStringValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 5 (null)', () => {
            expect(isNumber(testNullValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 6 (undefined)', () => {
            expect(isNumber(testUndefinedValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 7 (array)', () => {
            expect(isNumber(testArray1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 8 (array)', () => {
            expect(isNumber(testArray2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 9 (object)', () => {
            expect(isNumber(testObject1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 10 (object)', () => {
            expect(isNumber(testObject2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 11 (symbol)', () => {
            expect(isNumber(testSymbol1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 12 (symbol)', () => {
            expect(isNumber(testSymbol2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 13 (BigInt)', () => {
            expect(isNumber(testBigInt1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a number - case 14 (BigInt)', () => {
            expect(isNumber(testBigInt2)).toBe(false);
        });
    });

    describe('isString function tests...', () => {
        test('Should correctly determine that provided value is a string - case 1', () => {
            expect(isString(testStringValue1)).toBe(true);
        });

        test('Should correctly determine that provided value is a string - case 2', () => {
            expect(isString(testStringValue2)).toBe(true);
        });

        test('Should correctly determine that provided value is a string - case 1 (boolean)', () => {
            expect(isString(testBooleanValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is a string - case 2 (boolean)', () => {
            expect(isString(testBooleanValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 3 (number)', () => {
            expect(isString(testNumericValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 4 (number)', () => {
            expect(isString(testNumericValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 5 (null)', () => {
            expect(isString(testNullValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 6 (undefined)', () => {
            expect(isString(testUndefinedValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 7 (array)', () => {
            expect(isString(testArray1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 8 (array)', () => {
            expect(isString(testArray2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 9 (object)', () => {
            expect(isString(testObject1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 10 (object)', () => {
            expect(isString(testObject2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 11 (symbol)', () => {
            expect(isString(testSymbol1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 12 (symbol)', () => {
            expect(isString(testSymbol2)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 13 (BigInt)', () => {
            expect(isString(testBigInt1)).toBe(false);
        });

        test('Should correctly determine that provided value is not a string - case 14 (BigInt)', () => {
            expect(isString(testBigInt2)).toBe(false);
        });
    });

    describe('isObject function tests...', () => {
        test('Should correctly determine that provided value is an object - case 1', () => {
            expect(isObject(testObject1)).toBe(true);
        });

        test('Should correctly determine that provided value is an object - case 2', () => {
            expect(isObject(testObject2)).toBe(true);
        });

        test('Should correctly determine that provided value is not an object - case 1 (number)', () => {
            expect(isObject(testNumericValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 2 (number)', () => {
            expect(isObject(testNumericValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 3 (string)', () => {
            expect(isObject(testStringValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 4 (string)', () => {
            expect(isObject(testStringValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 5 (null)', () => {
            expect(isObject(testNullValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 6 (undefined)', () => {
            expect(isObject(testUndefinedValue)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 7 (array)', () => {
            expect(isObject(testArray1)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 8 (array)', () => {
            expect(isObject(testArray2)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 9 (boolean)', () => {
            expect(isObject(testBooleanValue1)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 10 (boolean)', () => {
            expect(isObject(testBooleanValue2)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 11 (symbol)', () => {
            expect(isObject(testSymbol1)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 12 (symbol)', () => {
            expect(isObject(testSymbol2)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 13 (BigInt)', () => {
            expect(isObject(testBigInt1)).toBe(false);
        });

        test('Should correctly determine that provided value is not an object - case 14 (BigInt)', () => {
            expect(isObject(testBigInt2)).toBe(false);
        });
    });
});

// exports