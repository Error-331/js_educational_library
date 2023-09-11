'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { curry, defaultTo, defaultToNull } from './../../../src/utils/misc/functional_utils.js';

// implementation
test('Functional utilities tests...', async (t) => {
    await t.test('curry() function tests...', async (t) => {
        await t.test('Should correctly return curried fucntion - case 1', () => {
            const testFunc = (testArg1, testArg2) => testArg1 + testArg2;

            const curriedFunction = curry(testFunc);
            assert.equal(typeof curriedFunction, 'function');

            const partialFunc1 = curriedFunction(1);
            assert.equal(typeof partialFunc1, 'function');

            const result = partialFunc1(3);
            assert.equal(result, 4);
        });

        await t.test('Should correctly return curried fucntion - case 2', () => {
            const testFunc = (testArg1, testArg2, testArg3) => testArg1 + testArg2 - testArg3;

            const curriedFunction = curry(testFunc);
            assert.equal(typeof curriedFunction, 'function');

            const partialFunc1 = curriedFunction(1);
            assert.equal(typeof partialFunc1, 'function');

            const partialFunc2 =  partialFunc1(3);
            assert.equal(typeof partialFunc2, 'function');

            const result = partialFunc2(4);
            assert.equal(result, 0);
        });

        await t.test('Should correctly return curried fucntion - case 3', () => {
            const testFunc = (testArg1, testArg2, testArg3, testArg4) => (testArg1 + testArg2 - testArg3) * testArg4;

            const curriedFunction = curry(testFunc);
            assert.equal(typeof curriedFunction, 'function');

            const partialFunc1 = curriedFunction(1);
            assert.equal(typeof partialFunc1, 'function');

            const partialFunc2 =  partialFunc1(3);
            assert.equal(typeof partialFunc2, 'function');

            const partialFunc3 =  partialFunc2(1);
            assert.equal(typeof partialFunc3, 'function');

            const result = partialFunc3(4);
            assert.equal(result, 12);
        });
    });

    await t.test('defaultTo() function tests...', async (t) => {
        await t.test('Should correctly return default value - case 1', () => {
            const func = defaultTo(4);
            assert.equal(func(null), 4);
        });

        await t.test('Should correctly return default value - case 2', () => {
            const func = defaultTo([1, 'a', null]);
            assert.deepStrictEqual(func(null), [1, 'a', null]);
        });

        await t.test('Should correctly return default value - case 3', () => {
            const func = defaultTo({ testProp1: 1, testProp2: 'a', testProp3: [1, 'a', null] });
            assert.deepStrictEqual(func(null), { testProp1: 1, testProp2: 'a', testProp3: [1, 'a', null] });
        });

        await t.test('Should not return default value - case 1', () => {
            const func = defaultTo(4);

            assert.equal(func(5), 5);
        });

        await t.test('Should not return default value - case 2', () => {
            const func = defaultTo([1, 'a', null]);

            assert.deepStrictEqual(func([2, 'b', undefined]), [2, 'b', undefined]);
        });

        await t.test('Should not return default value - case 3', () => {
            const func = defaultTo({ testProp1: 1, testProp2: 'a', testProp3: [1, 'a', null], });

            assert.deepStrictEqual(func({ testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] }), { testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] });
        });
    });

    await t.test('defaultToNull() function tests...', async (t) => {
        await t.test('Should correctly return default null - case 1', () => {
            assert.equal(defaultToNull(undefined), null);
        });

        await t.test('Should correctly return default null - case 2', () => {
            assert.equal(defaultToNull(null), null);
        });


        await t.test('Should not return default value - case 1', () => {
            assert.equal(defaultToNull(5), 5);
        });

        await t.test('Should not return default value - case 2', () => {
            assert.deepStrictEqual(defaultToNull([2, 'b', undefined]), [2, 'b', undefined]);
        });

        await t.test('Should not return default value - case 3', () => {
            assert.deepStrictEqual(defaultToNull({ testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] }), { testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] });
        });
    });
});