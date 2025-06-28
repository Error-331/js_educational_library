// external imports

// internal imports
import {
    COMPARATOR_LESS_THAN,
    COMPARATOR_GREATER_THAN,
    COMPARATOR_EQUAL,
    COMPARATOR_NONE_EQUAL,

    COMPARATOR_LESS_OR_EQUAL,
    COMPARATOR_GREATER_OR_EQUAL,
} from '../../../src/constants/comparator_constants';

import {
    comparatorIsNoneEqual,
    comparatorIsEqual,

    comparatorIsLt,
    comparatorIsGt,

    comparatorIsLte,
    comparatorIsGte,

    defaultCompare,
    stringSimpleCaseInsensitiveComparator,
} from '../../../src/utils/misc/comparator_utils';

// implementation
describe('Comparator utilities tests...', () => {
    describe('comparatorIsNoneEqual() function tests...', () => {
        test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            expect(comparatorIsNoneEqual(COMPARATOR_LESS_THAN)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            expect(comparatorIsNoneEqual(COMPARATOR_GREATER_THAN)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            expect(comparatorIsNoneEqual(COMPARATOR_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            expect(comparatorIsNoneEqual(COMPARATOR_NONE_EQUAL)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            expect(comparatorIsNoneEqual(COMPARATOR_LESS_OR_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            expect(comparatorIsNoneEqual(COMPARATOR_GREATER_OR_EQUAL)).toStrictEqual(false);
        });
    });

    describe('comparatorIsEqual() function tests...', () => {
        test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            expect(comparatorIsEqual(COMPARATOR_LESS_THAN)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            expect(comparatorIsEqual(COMPARATOR_GREATER_THAN)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            expect(comparatorIsEqual(COMPARATOR_EQUAL)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            expect(comparatorIsEqual(COMPARATOR_NONE_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            expect(comparatorIsEqual(COMPARATOR_LESS_OR_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            expect(comparatorIsEqual(COMPARATOR_GREATER_OR_EQUAL)).toStrictEqual(false);
        });
    });

    describe('comparatorIsLt() function tests...', () => {
        test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            expect(comparatorIsLt(COMPARATOR_LESS_THAN)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            expect(comparatorIsLt(COMPARATOR_GREATER_THAN)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            expect(comparatorIsLt(COMPARATOR_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            expect(comparatorIsLt(COMPARATOR_NONE_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            expect(comparatorIsLt(COMPARATOR_LESS_OR_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            expect(comparatorIsLt(COMPARATOR_GREATER_OR_EQUAL)).toStrictEqual(false);
        });
    });

    describe('comparatorIsGt() function tests...', () => {
        test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            expect(comparatorIsGt(COMPARATOR_LESS_THAN)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            expect(comparatorIsGt(COMPARATOR_GREATER_THAN)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            expect(comparatorIsGt(COMPARATOR_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            expect(comparatorIsGt(COMPARATOR_NONE_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            expect(comparatorIsLt(COMPARATOR_LESS_OR_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            expect(comparatorIsGt(COMPARATOR_GREATER_OR_EQUAL)).toStrictEqual(false);
        });
    });

    describe('comparatorIsLte() function tests...', () => {
        test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            expect(comparatorIsLte(COMPARATOR_LESS_THAN)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            expect(comparatorIsLte(COMPARATOR_GREATER_THAN)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            expect(comparatorIsLte(COMPARATOR_EQUAL)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            expect(comparatorIsLte(COMPARATOR_NONE_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            expect(comparatorIsLte(COMPARATOR_LESS_OR_EQUAL)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            expect(comparatorIsLte(COMPARATOR_GREATER_OR_EQUAL)).toStrictEqual(true);
        });
    });

    describe('comparatorIsGte() function tests...', () => {
        test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            expect(comparatorIsGte(COMPARATOR_LESS_THAN)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            expect(comparatorIsGte(COMPARATOR_GREATER_THAN)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            expect(comparatorIsGte(COMPARATOR_EQUAL)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            expect(comparatorIsGte(COMPARATOR_NONE_EQUAL)).toStrictEqual(false);
        });

        test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            expect(comparatorIsGte(COMPARATOR_LESS_OR_EQUAL)).toStrictEqual(true);
        });

        test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            expect(comparatorIsGte(COMPARATOR_GREATER_OR_EQUAL)).toStrictEqual(true);
        });
    });

    describe('defaultCompare() function tests...', () => {
        const testValue1 = 5;
        const testValue2 = 10;

        test('Should return correct value if both parameters are equal...', () => {
            const result = defaultCompare(testValue1, testValue1);
            expect(result).toStrictEqual(COMPARATOR_EQUAL);

            expect(comparatorIsNoneEqual(result)).toStrictEqual(false);
            expect(comparatorIsEqual(result)).toStrictEqual(true);

            expect(comparatorIsLt(result)).toStrictEqual(false);
            expect(comparatorIsGt(result)).toStrictEqual(false);

            expect(comparatorIsLte(result)).toStrictEqual(true);
            expect(comparatorIsGte(result)).toStrictEqual(true);

        });

        test('Should return correct value if one parameter is less than the second one', () => {
            const result = defaultCompare(testValue1, testValue2);
            expect(result).toStrictEqual(COMPARATOR_LESS_THAN);

            expect(comparatorIsNoneEqual(result)).toStrictEqual(true);
            expect(comparatorIsEqual(result)).toStrictEqual(false);

            expect(comparatorIsLt(result)).toStrictEqual(true);
            expect(comparatorIsGt(result)).toStrictEqual(false);

            expect(comparatorIsLte(result)).toStrictEqual(true);
            expect(comparatorIsGte(result)).toStrictEqual(false);
        });

        test('Should return correct value if one parameter is greater than the second one...', () => {
            const result = defaultCompare(testValue2, testValue1);
            expect(result).toStrictEqual(COMPARATOR_GREATER_THAN);

            expect(comparatorIsNoneEqual(result)).toStrictEqual(true);
            expect(comparatorIsEqual(result)).toStrictEqual(false);

            expect(comparatorIsLt(result)).toStrictEqual(false);
            expect(comparatorIsGt(result)).toStrictEqual(true);

            expect(comparatorIsLte(result)).toStrictEqual(false);
            expect(comparatorIsGte(result)).toStrictEqual(true);
        });

        test('Should throw an error if one of the parameters is "Nil" - case 1...', () => {
            defaultCompare(testValue2, testValue1);

            expect(() => defaultCompare(null, testValue2)).toThrowError(Error);
        });

        test('Should throw an error if one of the parameters is "Nil" - case 2...', () => {
            defaultCompare(testValue2, testValue1);

            expect(() => defaultCompare(testValue1, null)).toThrowError(Error);
        });
    });

    describe('stringSimpleCaseInsensitiveComparator() function tests...', () => {
        const testValue1 = 'abcc';
        const testValue2 = 'zvfw';
        const testValue3 = 'AbCC';
        const testValue4 = 'g4fdE3';

        test('Should return correct value if both parameters are equal - case 1...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue1);
            expect(result).toStrictEqual(COMPARATOR_EQUAL);

            expect(comparatorIsNoneEqual(result)).toStrictEqual(false);
            expect(comparatorIsEqual(result)).toStrictEqual(true);

            expect(comparatorIsLt(result)).toStrictEqual(false);
            expect(comparatorIsGt(result)).toStrictEqual(false);

            expect(comparatorIsLte(result)).toStrictEqual(true);
            expect(comparatorIsGte(result)).toStrictEqual(true);
        });

        test('Should return correct value if both parameters are equal - case 2...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue3);
            expect(result).toStrictEqual(COMPARATOR_EQUAL);

            expect(comparatorIsNoneEqual(result)).toStrictEqual(false);
            expect(comparatorIsEqual(result)).toStrictEqual(true);

            expect(comparatorIsLt(result)).toStrictEqual(false);
            expect(comparatorIsGt(result)).toStrictEqual(false);

            expect(comparatorIsLte(result)).toStrictEqual(true);
            expect(comparatorIsGte(result)).toStrictEqual(true);
        });

        test('Should return correct value if both parameters are note equal - case 1...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue2);
            expect(result).toStrictEqual(COMPARATOR_NONE_EQUAL);

            expect(comparatorIsNoneEqual(result)).toStrictEqual(true);
            expect(comparatorIsEqual(result)).toStrictEqual(false);

            expect(comparatorIsLt(result)).toStrictEqual(false);
            expect(comparatorIsGt(result)).toStrictEqual(false);

            expect(comparatorIsLte(result)).toStrictEqual(false);
            expect(comparatorIsGte(result)).toStrictEqual(false);
        });

        test('Should return correct value if both parameters are note equal - case 1...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue4);
            expect(result).toStrictEqual(COMPARATOR_NONE_EQUAL);

            expect(comparatorIsNoneEqual(result)).toStrictEqual(true);
            expect(comparatorIsEqual(result)).toStrictEqual(false);

            expect(comparatorIsLt(result)).toStrictEqual(false);
            expect(comparatorIsGt(result)).toStrictEqual(false);

            expect(comparatorIsLte(result)).toStrictEqual(false);
            expect(comparatorIsGte(result)).toStrictEqual(false);
        });
    });
});

// exports