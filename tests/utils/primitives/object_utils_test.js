'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { checkObjectsNotEqualByLinkDeep, checkArraysNotEqualByLinkDeep } from './../../../src/utils/testing/utils/primitives/object_utils_test_utils.js';
import { cloneArrayDeep, cloneDeep, setPropValueByPath } from './../../../src/utils/primitives/object_utils.js';

// implementation
test('Object utilities tests...', async (t) => {
    const testObj1 = {
        testProp1: 1,
        testProp2: 2,
        testProp3: 3,

        testProp4: [10, 20, 30, ['a', 'b', 'c'], 40, 50],
        testProp5: 4,
        testProp6: 5
    };

    const testObj2 = {
        testProp1: 'a',
        testProp2: 'b',
        testProp3: 'c',

        testProp4: [
            1,
            [1, 2, 3],

            {
                testProp1: 10,
                testProp2: {
                    testProp1: 'aa',
                    testProp2: 'bb',
                    testProp3: 'cc',
                },
                testProp3: 30,
            },

            [10, 20, 30],
        ],
    };

    const testObj3 = {
        testProp1: 1,
        testProp2: 2,
        testProp3: 3,

        testProp4: {
            testProp1: {
                testProp1: [20, 30, 40, {
                    testProp1: 'a',
                    testProp2: {
                        testProp1: ['a', 'b', 'c'],
                        testProp2: null
                    },
                    testProp3: 'c',
                }, 50, 60, 70]
            },
        }
    };

    const testArray1 = [1, 2, 3, [10, 20, 30, ['a', 'b', 'c'], 40, 50], 4, 5];
    const testArray2 = ['a', 'b', 'c', {
        testProp1: 1,
        testProp2: [1, 2, 3],
        testProp3: {
            testProp1: 20,
            testProp2: 30,
        },
    }];

    const testArray3 = [1, 2, 3, {
        testProp1: {
            testProp2: [20, 30, 40, {
                testProp1: 'a',
                testProp2: {
                    testProp1: ['a', 'b', 'c'],
                    testProp2: null
                },
                testProp3: 'c',
            }, 50, 60, 70]
        },
    }];

    await t.test('cloneDeep() function tests...', async (t) => {
        await t.test('Should correctly create deep clone of an object - case 1', () => {
            const resultObject = cloneDeep(testObj1);

            checkObjectsNotEqualByLinkDeep(resultObject, testObj1);
            assert.deepStrictEqual(resultObject, testObj1);
        });

        await t.test('Should correctly create deep clone of an object - case 2', () => {
            const resultObject = cloneDeep(testObj2);

            checkObjectsNotEqualByLinkDeep(resultObject, testObj2);
            assert.deepStrictEqual(resultObject, testObj2);
        });

        await t.test('Should correctly create deep clone of an object - case 3', () => {
            const resultObject = cloneDeep(testObj3);

            checkObjectsNotEqualByLinkDeep(resultObject, testObj3);
            assert.deepStrictEqual(resultObject, testObj3);
        });
    });

    await t.test('cloneArrayDeep() function tests...', async (t) => {
        await t.test('Should correctly create deep clone of an array - case 1', () => {
            const resultArray = cloneArrayDeep(testArray1);

            checkArraysNotEqualByLinkDeep(resultArray, testArray1);
            assert.deepStrictEqual(resultArray, testArray1);
        });

        await t.test('Should correctly create deep clone of an array - case 2', () => {
            const resultArray = cloneArrayDeep(testArray2);

            checkArraysNotEqualByLinkDeep(resultArray, testArray2);
            assert.deepStrictEqual(resultArray, testArray2);
        });

        await t.test('Should correctly create deep clone of an array - case 3', () => {
            const resultArray = cloneArrayDeep(testArray3);

            checkArraysNotEqualByLinkDeep(resultArray, testArray3);
            assert.deepStrictEqual(resultArray, testArray3);
        });
    });

    await t.test('setPropValueByPath() function tests...', async (t) => {
        await t.test('Should correctly set property of the object - case 1', () => {
            const actualObjectClone = cloneDeep(testObj1);
            const testObjectClone = cloneDeep(testObj1);

            assert.deepStrictEqual(actualObjectClone, testObj1);
            assert.notEqual(actualObjectClone, testObj1);

            let result = setPropValueByPath(['testProp1'], 10, actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp1 = 10;

            result = setPropValueByPath(['testProp4', 1], 22, actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp4[1] = 22;

            result = setPropValueByPath(['testProp4', 3, 1], 'bb', actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp4[3][1] = 'bb';

            assert.deepStrictEqual(actualObjectClone, testObjectClone);
        });

        await t.test('Should correctly set property of the object - case 2', () => {
            const actualObjectClone = cloneDeep(testObj2);
            const testObjectClone = cloneDeep(testObj2);

            assert.deepStrictEqual(actualObjectClone, testObj2);
            assert.notEqual(actualObjectClone, testObj2);

            let result = setPropValueByPath(['testProp2'], 'zz', actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp2 = 'zz';

            result = setPropValueByPath(['testProp4', 1, 2], 33, actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp4[1][2] = 33;

            result = setPropValueByPath(['testProp4', 2, 'testProp2', 'testProp3'], 'xx', actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp4[2].testProp2.testProp3 = 'xx';

            assert.deepStrictEqual(actualObjectClone, testObjectClone);
        });

        await t.test('Should correctly set property of the object - case 3', () => {
            const actualObjectClone = cloneDeep(testObj3);
            const testObjectClone = cloneDeep(testObj3);

            assert.deepStrictEqual(actualObjectClone, testObj3);
            assert.notEqual(actualObjectClone, testObj3);

            let result = setPropValueByPath(['testProp4', 'testProp1', 'testProp1', 3, 'testProp2', 'testProp2'], 'some', actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp4.testProp1.testProp1[3].testProp2.testProp2 = 'some';

            result = setPropValueByPath(['testProp4', 'testProp1', 'testProp1', 5], 66, actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp4.testProp1.testProp1[5] = 66;

            result = setPropValueByPath(['testProp4', 'testProp1', 'testProp1', 3, 'testProp2', 'testProp1', 0], null, actualObjectClone);
            assert.strictEqual(result, true);
            testObjectClone.testProp4.testProp1.testProp1[3].testProp2.testProp1[0] = null;

            assert.deepStrictEqual(actualObjectClone, testObjectClone);
        });

        await t.test('Should not set property of the object - case 1', () => {
            const actualObjectClone = cloneDeep(testObj1);
            const testObjectClone = cloneDeep(testObj1);

            assert.deepStrictEqual(actualObjectClone, testObj1);
            assert.notEqual(actualObjectClone, testObj1);

            let result = setPropValueByPath(['testProp11'], 10, actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp11 = 10;

            result = setPropValueByPath(['testProp4', 6], 22, actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp4[6] = 22;

            result = setPropValueByPath(['testProp4', 3, 3], 'bb', actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp4[3][3] = 'bb';

            assert.deepStrictEqual(actualObjectClone, testObj1);
            assert.notDeepStrictEqual(actualObjectClone, testObjectClone);
        });

        await t.test('Should not set property of the object - case 2', () => {
            const actualObjectClone = cloneDeep(testObj2);
            const testObjectClone = cloneDeep(testObj2);

            assert.deepStrictEqual(actualObjectClone, testObj2);
            assert.notEqual(actualObjectClone, testObj2);

            let result = setPropValueByPath(['testProp44'], 'd', actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp44 = 'd';

            result = setPropValueByPath(['testProp4', 1, 3], 44, actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp4[1][3] = 33;

            result = setPropValueByPath(['testProp4', 2, 'testProp2', 'testProp4'], 'xx', actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp4[2].testProp2.testProp4 = 'xx';

            assert.deepStrictEqual(actualObjectClone, testObj2);
            assert.notDeepStrictEqual(actualObjectClone, testObjectClone);
        });

        await t.test('Should not set property of the object - case 3', () => {
            const actualObjectClone = cloneDeep(testObj3);
            const testObjectClone = cloneDeep(testObj3);

            assert.deepStrictEqual(actualObjectClone, testObj3);
            assert.notEqual(actualObjectClone, testObj3);

            let result = setPropValueByPath(['testProp4', 'testProp1', 'testProp1', 3, 'testProp2', 'testProp3'], 'some', actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp4.testProp1.testProp1[3].testProp2.testProp3 = 'some';

            result = setPropValueByPath(['testProp4', 'testProp1', 'testProp1', 7], 77, actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp4.testProp1.testProp1[7] = 77;

            result = setPropValueByPath(['testProp4', 'testProp1', 'testProp1', 3, 'testProp2', 'testProp1', 3], null, actualObjectClone);
            assert.strictEqual(result, false);
            testObjectClone.testProp4.testProp1.testProp1[3].testProp2.testProp1[3] = null;

            assert.deepStrictEqual(actualObjectClone, testObj3);
            assert.notDeepStrictEqual(actualObjectClone, testObjectClone);
        });
    });
});

// exports