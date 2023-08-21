'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { checkObjectsNotEqualByLinkDeep, checkArraysNotEqualByLinkDeep } from './../../../../src/utils/testing/utils/primitives/object_utils_test_utils.js';

// implementation
test('Object utilities test utilities tests...', async (t) => {
    await t.test('checkObjectsNotEqualByLinkDeep() function tests...', async (t) => {
        const testObj1 = {
            testProp1: 1,
            testProp2: 2,
            testProp3: 3,
        };

        const testObj2 = {
            testProp1: 1,
            testProp2: 2,
            testProp3: 3,

            testProp4: {
                testProp1: 'a',
                testProp2: 'b',
                testProp3: 'c',
                testProp4: {
                    testProp1: 'aa',
                    testProp2: 'bb',
                    testProp3: 'cc',
                }
            }
        };

        const testObj3 = {
            testProp1: 1,
            testProp2: 2,
            testProp3: 3,

            testProp4: [
                'a',
                'b',
                'c',
                [
                    'aa',
                    'bb',
                    'cc'
                ],
            ],
        };

        const testObj4 = {
            testProp1: 1,
            testProp2: [
                1,
                2,
                {
                    testProp1: 'a',
                    testProp2: 'b',
                    testProp3: [
                        'aa',
                        [
                            '1',
                            '2',
                            {
                                testProp1: '1',
                                testProp2: '2',
                            },
                            {
                                testProp1: '11',
                                testProp2: '22',
                            }
                        ],
                        'bb'
                    ]
                }
            ]
        };

        await t.test('Should correctly compare two objects and not throw error - case 1', () => {
            const testObject = Object.assign({}, testObj1);

            checkObjectsNotEqualByLinkDeep(testObject, testObj1);
        });

        await t.test('Should correctly compare two objects and not throw error - case 2', () => {
            let testObject = Object.assign({}, testObj2);

            testObject.testProp4 = Object.assign({}, testObj2.testProp4);
            testObject.testProp4.testProp4 = Object.assign({}, testObj2.testProp4.testProp4);

            checkObjectsNotEqualByLinkDeep(testObject, testObj2);
        });

        await t.test('Should correctly compare two objects and not throw error - case 3', () => {
            let testObject = Object.assign({}, testObj3);

            testObject.testProp4 = testObj3.testProp4.slice();
            testObject.testProp4[3] = testObj3.testProp4[3].slice();

            checkObjectsNotEqualByLinkDeep(testObject, testObj3);
        });

        await t.test('Should correctly compare two objects and not throw error - case 4', () => {
            let testObject = Object.assign({}, testObj4);

            testObject.testProp2 = testObj4.testProp2.slice();
            testObject.testProp2[2] = Object.assign({}, testObj4.testProp2[2]);
            testObject.testProp2[2].testProp3 = testObj4.testProp2[2].testProp3.slice();
            testObject.testProp2[2].testProp3[1] = testObj4.testProp2[2].testProp3[1].slice();
            testObject.testProp2[2].testProp3[1][2] = Object.assign({}, testObj4.testProp2[2].testProp3[1][2]);
            testObject.testProp2[2].testProp3[1][3] = Object.assign({}, testObj4.testProp2[2].testProp3[1][2]);

            checkObjectsNotEqualByLinkDeep(testObject, testObj4);
        });

        await t.test('Should correctly compare two objects and throw error - case 1', () => {
            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObj1, testObj1));
        });

        await t.test('Should correctly compare two objects and throw error - case 2', () => {
            let testObject = Object.assign({}, testObj2);
            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj2));
        });

        await t.test('Should correctly compare two objects and throw error - case 3', () => {
            let testObject = Object.assign({}, testObj2);

            testObject.testProp4 = Object.assign({}, testObj2.testProp4);

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj2));
        });

        await t.test('Should correctly compare two objects and throw error - case 4', () => {
            let testObject = Object.assign({}, testObj2);

            testObject.testProp4.testProp4 = Object.assign({}, testObj2.testProp4.testProp4);

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj2));
        });

        await t.test('Should correctly compare two objects and throw error - case 5', () => {
            let testObject = Object.assign({}, testObj3);
            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj3));
        });

        await t.test('Should correctly compare two objects and throw error - case 6', () => {
            let testObject = Object.assign({}, testObj3);

            testObject.testProp4 = testObject.testProp4.slice();

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj3));
        });

        await t.test('Should correctly compare two objects and throw error - case 7', () => {
            let testObject = Object.assign({}, testObj3);

            testObject.testProp4[3] = testObject.testProp4[3].slice();

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj3));
        });

        await t.test('Should correctly compare two objects and throw error - case 8', () => {
            let testObject = Object.assign({}, testObj4);
            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj4));
        });

        await t.test('Should correctly compare two objects and throw error - case 9', () => {
            let testObject = Object.assign({}, testObj4);

            testObject.testProp2 = testObj4.testProp2.slice();

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj4));
        });

        await t.test('Should correctly compare two objects and throw error - case 10', () => {
            let testObject = Object.assign({}, testObj4);

            testObject.testProp2 = testObj4.testProp2.slice();
            testObject.testProp2[2] = Object.assign({}, testObj4.testProp2[2]);

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj4));
        });

        await t.test('Should correctly compare two objects and throw error - case 11', () => {
            let testObject = Object.assign({}, testObj4);

            testObject.testProp2 = testObj4.testProp2.slice();
            testObject.testProp2[2] = Object.assign({}, testObj4.testProp2[2]);
            testObject.testProp2[2].testProp3 = testObj4.testProp2[2].testProp3.slice();

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj4));
        });

        await t.test('Should correctly compare two objects and throw error - case 12', () => {
            let testObject = Object.assign({}, testObj4);

            testObject.testProp2 = testObj4.testProp2.slice();
            testObject.testProp2[2] = Object.assign({}, testObj4.testProp2[2]);
            testObject.testProp2[2].testProp3 = testObj4.testProp2[2].testProp3.slice();
            testObject.testProp2[2].testProp3[1] = testObj4.testProp2[2].testProp3[1].slice();

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj4));
        });

        await t.test('Should correctly compare two objects and throw error - case 13', () => {
            let testObject = Object.assign({}, testObj4);

            testObject.testProp2 = testObj4.testProp2.slice();
            testObject.testProp2[2] = Object.assign({}, testObj4.testProp2[2]);
            testObject.testProp2[2].testProp3 = testObj4.testProp2[2].testProp3.slice();
            testObject.testProp2[2].testProp3[1] = testObj4.testProp2[2].testProp3[1].slice();
            testObject.testProp2[2].testProp3[1][2] = Object.assign({}, testObj4.testProp2[2].testProp3[1][2]);

            assert.throws(() => checkObjectsNotEqualByLinkDeep(testObject, testObj4));
        });
    });

    await t.test('checkArraysNotEqualByLinkDeep() function tests...', async (t) => {
        const testArray1 = [
          1,
          2,
          3,
        ];

        const testArray2 = [
          1,
          2,
          3,
          [
              'a',
              'b',
              'c',
              [
                'aa',
                'bb',
                'cc',
              ],
          ],
        ];

        const testArray3 = [
            1,
            2,
            3,

            {
                testProp1: 'a',
                testProp2: 'b',
                testProp3: 'c',
                testProp4: {
                    testProp1: 'aa',
                    testProp2: 'bb',
                    testProp3: 'cc',
                }
            }
        ];

        const testArray4 = [
            1,
            {
                testProp1: 1,
                testProp2: 2,
                testProp3: [
                    'a',
                    'b',
                    {
                        testProp1: 'aa',
                        testProp2: {
                            testProp1: '1',
                            testProp2: '2',
                            testProp3: [
                                '1',
                                '2'
                            ],
                            testProp4: [
                                '11',
                                '22',
                            ]
                        },
                        testProp3: 'bb'
                    }
                ]
            }
        ];

        await t.test('Should correctly compare two arrays and not throw error - case 1', () => {
            const testArray = testArray1.slice();

            checkArraysNotEqualByLinkDeep(testArray, testArray1);
        });

        await t.test('Should correctly compare two arrays and not throw error - case 2', () => {
            const testArray = testArray2.slice();

            testArray[3] = testArray2[3].slice();
            testArray[3][3] = testArray2[3][3].slice();

            checkArraysNotEqualByLinkDeep(testArray, testArray2);
        });

        await t.test('Should correctly compare two arrays and not throw error - case 3', () => {
            const testArray = testArray3.slice();

            testArray[3] = Object.assign({}, testArray3[3]);
            testArray[3].testProp4 = Object.assign({}, testArray3[3].testProp4);

            checkArraysNotEqualByLinkDeep(testArray, testArray3);
        });

        await t.test('Should correctly compare two arrays and not throw error - case 4', () => {
            const testArray = testArray4.slice();

            testArray[1] = Object.assign({}, testArray4[1]);
            testArray[1].testProp3 = testArray4[1].testProp3.slice();
            testArray[1].testProp3[2] = Object.assign({}, testArray4[1].testProp3[2]);
            testArray[1].testProp3[2].testProp2 = Object.assign({}, testArray4[1].testProp3[2].testProp2);
            testArray[1].testProp3[2].testProp2.testProp3 = testArray4[1].testProp3[2].testProp2.testProp3.slice();
            testArray[1].testProp3[2].testProp2.testProp4 = testArray4[1].testProp3[2].testProp2.testProp4.slice();

            checkArraysNotEqualByLinkDeep(testArray, testArray4);
        });

        await t.test('Should correctly compare two arrays and throw error - case 1', () => {
            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray1, testArray1));
        });

        await t.test('Should correctly compare two arrays and throw error - case 2', () => {
            const testArray = testArray2.slice();

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray2));
        });

        await t.test('Should correctly compare two arrays and throw error - case 3', () => {
            const testArray = testArray2.slice();

            testArray[3] = testArray2[3].slice();

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray2));
        });

        await t.test('Should correctly compare two arrays and throw error - case 4', () => {
            const testArray = testArray2.slice();

            testArray[3][3] = testArray2[3][3].slice();

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray2));
        });

        await t.test('Should correctly compare two arrays and throw error - case 5', () => {
            const testArray = testArray3.slice();

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray3));
        });

        await t.test('Should correctly compare two arrays and throw error - case 6', () => {
            const testArray = testArray3.slice();

            testArray[3] = Object.assign({}, testArray3[3]);

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray3));
        });

        await t.test('Should correctly compare two arrays and throw error - case 7', () => {
            const testArray = testArray3.slice();

            testArray[3].testProp4 = Object.assign({}, testArray3[3].testProp4);

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray3));
        });

        await t.test('Should correctly compare two arrays and throw error - case 8', () => {
            const testArray = testArray4.slice();

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray4));
        });

        await t.test('Should correctly compare two arrays and throw error - case 9', () => {
            const testArray = testArray4.slice();

            testArray[1] = Object.assign({}, testArray4[1]);

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray4));
        });

        await t.test('Should correctly compare two arrays and throw error - case 10', () => {
            const testArray = testArray4.slice();

            testArray[1] = Object.assign({}, testArray4[1]);
            testArray[1].testProp3 = testArray4[1].testProp3.slice();

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray4));
        });

        await t.test('Should correctly compare two arrays and throw error - case 11', () => {
            const testArray = testArray4.slice();

            testArray[1] = Object.assign({}, testArray4[1]);
            testArray[1].testProp3 = testArray4[1].testProp3.slice();
            testArray[1].testProp3[2] = Object.assign({}, testArray4[1].testProp3[2]);

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray4));
        });

        await t.test('Should correctly compare two arrays and throw error - case 12', () => {
            const testArray = testArray4.slice();

            testArray[1] = Object.assign({}, testArray4[1]);
            testArray[1].testProp3 = testArray4[1].testProp3.slice();
            testArray[1].testProp3[2] = Object.assign({}, testArray4[1].testProp3[2]);
            testArray[1].testProp3[2].testProp2 = Object.assign({}, testArray4[1].testProp3[2].testProp2);

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray4));
        });

        await t.test('Should correctly compare two arrays and throw error - case 13', () => {
            const testArray = testArray4.slice();

            testArray[1] = Object.assign({}, testArray4[1]);
            testArray[1].testProp3 = testArray4[1].testProp3.slice();
            testArray[1].testProp3[2] = Object.assign({}, testArray4[1].testProp3[2]);
            testArray[1].testProp3[2].testProp2 = Object.assign({}, testArray4[1].testProp3[2].testProp2);
            testArray[1].testProp3[2].testProp2.testProp3 = testArray4[1].testProp3[2].testProp2.testProp3.slice();

            assert.throws(() => checkArraysNotEqualByLinkDeep(testArray, testArray4));
        });
    });
});

// exports