'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import {
    COMPARATOR_LESS_THAN,
    COMPARATOR_GREATER_THAN,
    COMPARATOR_EQUAL,
    COMPARATOR_NONE_EQUAL,

    COMPARATOR_LESS_OR_EQUAL,
    COMPARATOR_GREATER_OR_EQUAL,
} from './../../../src/constants/comparator_constants.js';

import {
    comparatorIsNoneEqual,
    comparatorIsEqual,

    comparatorIsLt,
    comparatorIsGt,

    comparatorIsLte,
    comparatorIsGte,

    defaultCompare,
    stringSimpleCaseInsensitiveComparator,
} from './../../../src/utils/misc/comparator_utils.js';

// implementation
test('Comparator utilities tests...', async (t) => {
    await t.test('comparatorIsNoneEqual() function tests...', async (t) => {
        await t.test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            assert.strictEqual(comparatorIsNoneEqual(COMPARATOR_LESS_THAN), true);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            assert.strictEqual(comparatorIsNoneEqual(COMPARATOR_GREATER_THAN), true);
        });

        await t.test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsNoneEqual(COMPARATOR_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsNoneEqual(COMPARATOR_NONE_EQUAL), true);
        });

        await t.test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsNoneEqual(COMPARATOR_LESS_OR_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsNoneEqual(COMPARATOR_GREATER_OR_EQUAL), false);
        });
    });

    await t.test('comparatorIsEqual() function tests...', async (t) => {
        await t.test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            assert.strictEqual(comparatorIsEqual(COMPARATOR_LESS_THAN), false);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            assert.strictEqual(comparatorIsEqual(COMPARATOR_GREATER_THAN), false);
        });

        await t.test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsEqual(COMPARATOR_EQUAL), true);
        });

        await t.test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsEqual(COMPARATOR_NONE_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsEqual(COMPARATOR_LESS_OR_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsEqual(COMPARATOR_GREATER_OR_EQUAL), false);
        });
    });

    await t.test('comparatorIsLt() function tests...', async (t) => {
        await t.test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            assert.strictEqual(comparatorIsLt(COMPARATOR_LESS_THAN), true);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            assert.strictEqual(comparatorIsLt(COMPARATOR_GREATER_THAN), false);
        });

        await t.test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLt(COMPARATOR_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLt(COMPARATOR_NONE_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLt(COMPARATOR_LESS_OR_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLt(COMPARATOR_GREATER_OR_EQUAL), false);
        });
    });

    await t.test('comparatorIsGt() function tests...', async (t) => {
        await t.test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            assert.strictEqual(comparatorIsGt(COMPARATOR_LESS_THAN), false);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            assert.strictEqual(comparatorIsGt(COMPARATOR_GREATER_THAN), true);
        });

        await t.test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsGt(COMPARATOR_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsGt(COMPARATOR_NONE_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLt(COMPARATOR_LESS_OR_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsGt(COMPARATOR_GREATER_OR_EQUAL), false);
        });
    });

    await t.test('comparatorIsLte() function tests...', async (t) => {
        await t.test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            assert.strictEqual(comparatorIsLte(COMPARATOR_LESS_THAN), true);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            assert.strictEqual(comparatorIsLte(COMPARATOR_GREATER_THAN), false);
        });

        await t.test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLte(COMPARATOR_EQUAL), true);
        });

        await t.test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLte(COMPARATOR_NONE_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLte(COMPARATOR_LESS_OR_EQUAL), true);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsLte(COMPARATOR_GREATER_OR_EQUAL), true);
        });
    });

    await t.test('comparatorIsGte() function tests...', async (t) => {
        await t.test('Should return correct value for "COMPARATOR_LESS_THAN" parameter', () => {
            assert.strictEqual(comparatorIsGte(COMPARATOR_LESS_THAN), false);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_THAN" parameter', () => {
            assert.strictEqual(comparatorIsGte(COMPARATOR_GREATER_THAN), true);
        });

        await t.test('Should return correct value for "COMPARATOR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsGte(COMPARATOR_EQUAL), true);
        });

        await t.test('Should return correct value for "COMPARATOR_NONE_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsGte(COMPARATOR_NONE_EQUAL), false);
        });

        await t.test('Should return correct value for "COMPARATOR_LESS_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsGte(COMPARATOR_LESS_OR_EQUAL), true);
        });

        await t.test('Should return correct value for "COMPARATOR_GREATER_OR_EQUAL" parameter', () => {
            assert.strictEqual(comparatorIsGte(COMPARATOR_GREATER_OR_EQUAL), true);
        });
    });

    await t.test('defaultCompare() function tests...', async (t) => {
        const testValue1 = 5;
        const testValue2 = 10;

        await t.test('Should return correct value if both parameters are equal...', () => {
            const result = defaultCompare(testValue1, testValue1);
            assert.strictEqual(result, COMPARATOR_EQUAL);

            assert.strictEqual(comparatorIsNoneEqual(result), false);
            assert.strictEqual(comparatorIsEqual(result), true);

            assert.strictEqual(comparatorIsLt(result), false);
            assert.strictEqual(comparatorIsGt(result), false);

            assert.strictEqual(comparatorIsLte(result), true);
            assert.strictEqual(comparatorIsGte(result), true);

        });

        await t.test('Should return correct value if one parameter is less than the second one', () => {
            const result = defaultCompare(testValue1, testValue2);
            assert.strictEqual(result, COMPARATOR_LESS_THAN);

            assert.strictEqual(comparatorIsNoneEqual(result), true);
            assert.strictEqual(comparatorIsEqual(result), false);

            assert.strictEqual(comparatorIsLt(result), true);
            assert.strictEqual(comparatorIsGt(result), false);

            assert.strictEqual(comparatorIsLte(result), true);
            assert.strictEqual(comparatorIsGte(result), false);
        });

        await t.test('Should return correct value if one parameter is greater than the second one...', () => {
            const result = defaultCompare(testValue2, testValue1);
            assert.strictEqual(result, COMPARATOR_GREATER_THAN);

            assert.strictEqual(comparatorIsNoneEqual(result), true);
            assert.strictEqual(comparatorIsEqual(result), false);

            assert.strictEqual(comparatorIsLt(result), false);
            assert.strictEqual(comparatorIsGt(result), true);

            assert.strictEqual(comparatorIsLte(result), false);
            assert.strictEqual(comparatorIsGte(result), true);
        });
    });

    await t.test('stringSimpleCaseInsensitiveComparator() function tests...', async (t) => {
        const testValue1 = 'abcc';
        const testValue2 = 'zvfw';
        const testValue3 = 'AbCC';
        const testValue4 = 'g4fdE3';

        await t.test('Should return correct value if both parameters are equal - case 1...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue1);
            assert.strictEqual(result, COMPARATOR_EQUAL);

            assert.strictEqual(comparatorIsNoneEqual(result), false);
            assert.strictEqual(comparatorIsEqual(result), true);

            assert.strictEqual(comparatorIsLt(result), false);
            assert.strictEqual(comparatorIsGt(result), false);

            assert.strictEqual(comparatorIsLte(result), true);
            assert.strictEqual(comparatorIsGte(result), true);
        });

        await t.test('Should return correct value if both parameters are equal - case 2...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue3);
            assert.strictEqual(result, COMPARATOR_EQUAL);

            assert.strictEqual(comparatorIsNoneEqual(result), false);
            assert.strictEqual(comparatorIsEqual(result), true);

            assert.strictEqual(comparatorIsLt(result), false);
            assert.strictEqual(comparatorIsGt(result), false);

            assert.strictEqual(comparatorIsLte(result), true);
            assert.strictEqual(comparatorIsGte(result), true);
        });

        await t.test('Should return correct value if both parameters are note equal - case 1...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue2);
            assert.strictEqual(result, COMPARATOR_NONE_EQUAL);

            assert.strictEqual(comparatorIsNoneEqual(result), true);
            assert.strictEqual(comparatorIsEqual(result), false);

            assert.strictEqual(comparatorIsLt(result), false);
            assert.strictEqual(comparatorIsGt(result), false);

            assert.strictEqual(comparatorIsLte(result), false);
            assert.strictEqual(comparatorIsGte(result), false);
        });

        await t.test('Should return correct value if both parameters are note equal - case 1...', () => {
            const result = stringSimpleCaseInsensitiveComparator(testValue1, testValue4);
            assert.strictEqual(result, COMPARATOR_NONE_EQUAL);

            assert.strictEqual(comparatorIsNoneEqual(result), true);
            assert.strictEqual(comparatorIsEqual(result), false);

            assert.strictEqual(comparatorIsLt(result), false);
            assert.strictEqual(comparatorIsGt(result), false);

            assert.strictEqual(comparatorIsLte(result), false);
            assert.strictEqual(comparatorIsGte(result), false);
        });
    });
});