'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { defaultTo, defaultToNull } from './../../../src/utils/misc/functional_utils.js';

// implementation
test('Functional utilities tests...', async (t) => {
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
            const func = defaultToNull();
            assert.equal(func(undefined), null);
        });

        await t.test('Should correctly return default null - case 2', () => {
            const func = defaultToNull();
            assert.equal(func(null), null);
        });


        await t.test('Should not return default value - case 1', () => {
            const func = defaultToNull();

            assert.equal(func(5), 5);
        });

        await t.test('Should not return default value - case 2', () => {
            const func = defaultToNull();

            assert.deepStrictEqual(func([2, 'b', undefined]), [2, 'b', undefined]);
        });

        await t.test('Should not return default value - case 3', () => {
            const func = defaultToNull();

            assert.deepStrictEqual(func({ testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] }), { testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] });
        });
    });
});