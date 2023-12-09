'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import SetClass from './../../../src/data_structures/set/set_class.js';

// implementation
function checkSet(setObj, values) {
    assert.strictEqual(setObj.size, values.length);

    for (const value of values) {
        assert.strictEqual(setObj.items[value], value);
    }
}

test('Set class tests...', async (t) => {
    const setValues1 = [1, '2', 'c'];
    const setValues2 = [22, '33', 'zz'];

    await t.test('"items" getter tests...', async (t) => {
        await t.test('Should correctly extract items list of the set - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            assert.strictEqual(setObj.items[setValues1[0]], setValues1[0]);
            assert.strictEqual(setObj.items[setValues1[1]], setValues1[1]);
            assert.strictEqual(setObj.items[setValues1[2]], setValues1[2]);
        });

        await t.test('Should correctly extract items list of the set - case 2', () => {
            const setObj1 = new SetClass();
            const setObj2 = new SetClass();

            setObj1.add(setValues1[0]);
            setObj1.add(setValues1[2]);

            setObj2.add(setValues2[1]);
            setObj2.add(setValues2[2]);

            assert.strictEqual(setObj1.items[setValues1[0]], setValues1[0]);
            assert.strictEqual(setObj1.items[setValues1[1]], undefined);
            assert.strictEqual(setObj1.items[setValues1[2]], setValues1[2]);

            assert.strictEqual(setObj2.items[setValues2[0]], undefined);
            assert.strictEqual(setObj2.items[setValues2[1]], setValues2[1]);
            assert.strictEqual(setObj2.items[setValues2[2]], setValues2[2]);
        });
    });

    await t.test('"size" getter tests...', async (t) => {
        await t.test('Should correctly calculate size of the set - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            assert.strictEqual(setObj.size, 3);
        });

        await t.test('Should correctly calculate size of the set - case 2', () => {
            const setObj = new SetClass();

            setObj.add(setValues2[0]);
            setObj.add(setValues2[1]);

            assert.strictEqual(setObj.size, 2);
        });

        await t.test('Should correctly calculate size of the set - case 3', () => {
            const setObj = new SetClass();
            assert.strictEqual(setObj.size, 0);
        });
    });

    await t.test('"values" getter tests...', async (t) => {
        await t.test('Should correctly extract all values from the collection - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            assert.deepStrictEqual(setObj.values, setValues1);
        });

        await t.test('Should correctly extract all values from the collection - case 2', () => {
            const setObj1 = new SetClass();
            const setObj2 = new SetClass();

            setObj1.add(setValues1[0]);
            setObj1.add(setValues1[1]);
            setObj1.add(setValues1[2]);

            setObj2.add(setValues2[0]);
            setObj2.add(setValues2[1]);
            setObj2.add(setValues2[2]);

            assert.deepStrictEqual(setObj1.values, setValues1);
            assert.deepStrictEqual(setObj2.values, setValues2);
        });

        await t.test('Should correctly extract all values from the collection - case 3', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            assert.deepStrictEqual(setObj.values, setValues1);

            setObj.delete(setValues1[1]);
            assert.deepStrictEqual(setObj.values, [setValues1[0], setValues1[2]]);

            setObj.delete(setValues1[2]);
            assert.deepStrictEqual(setObj.values, [setValues1[0]]);

            setObj.delete(setValues1[0]);
            assert.deepStrictEqual(setObj.values, []);
        });
    });

    await t.test('iterator tests...', async (t) => {
        await t.test('Should correctly iterate through the set - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            let idx = 0;
            for (const setValue of setObj) {
                assert.strictEqual(setValue, setValues1[idx]);
                idx += 1;
            }
        });

        await t.test('Should correctly iterate through the set - case 2', () => {
            const setObj1 = new SetClass();
            const setObj2 = new SetClass();

            setObj1.add(setValues1[0]);
            setObj1.add(setValues1[1]);
            setObj1.add(setValues1[2]);

            setObj2.add(setValues2[0]);
            setObj2.add(setValues2[1]);
            setObj2.add(setValues2[2]);

            let idx = 0;
            for (const setValue of setObj1) {
                assert.strictEqual(setValue, setValues1[idx]);
                idx += 1;
            }

            idx = 0;
            for (const setValue of setObj2) {
                assert.strictEqual(setValue, setValues2[idx]);
                idx += 1;
            }
        });
    });

    await t.test('add() method tests...', async (t) => {
        await t.test('Should correctly add items to the set - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            checkSet(setObj, setValues1);
        });

        await t.test('Should correctly add items to the set - case 2', () => {
            const setObj1 = new SetClass();
            const setObj2 = new SetClass();

            setObj1.add(setValues1[0]);
            setObj1.add(setValues1[1]);
            setObj1.add(setValues1[2]);

            setObj2.add(setValues2[0]);
            setObj2.add(setValues2[1]);
            setObj2.add(setValues2[2]);

            checkSet(setObj1, setValues1);
            checkSet(setObj2, setValues2);
        });
    });

    await t.test('has() method tests...', async (t) => {
        await t.test('Should correctly determine whether item is in the set or not - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[2]);

            assert.strictEqual(setObj.has(setValues1[0]), true);
            assert.strictEqual(setObj.has(setValues1[1]), false);
            assert.strictEqual(setObj.has(setValues1[2]), true);
        });

        await t.test('Should correctly determine whether item is in the set or not - case 2', () => {
            const setObj1 = new SetClass();
            const setObj2 = new SetClass();

            setObj1.add(setValues1[0]);
            setObj1.add(setValues1[2]);

            setObj2.add(setValues2[0]);
            setObj2.add(setValues2[1]);

            assert.strictEqual(setObj1.has(setValues1[0]), true);
            assert.strictEqual(setObj1.has(setValues1[1]), false);
            assert.strictEqual(setObj1.has(setValues1[2]), true);

            assert.strictEqual(setObj1.has(setValues2[0]), false);
            assert.strictEqual(setObj1.has(setValues2[1]), false);
            assert.strictEqual(setObj1.has(setValues2[2]), false);

            assert.strictEqual(setObj2.has(setValues1[0]), false);
            assert.strictEqual(setObj2.has(setValues1[1]), false);
            assert.strictEqual(setObj2.has(setValues1[2]), false);

            assert.strictEqual(setObj2.has(setValues2[0]), true);
            assert.strictEqual(setObj2.has(setValues2[1]), true);
            assert.strictEqual(setObj2.has(setValues2[2]), false);
        });
    });

    await t.test('clear() method tests...', async (t) => {
        await t.test('Should correctly remove all items in the collection - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            checkSet(setObj, setValues1);

            setObj.clear();

            assert.strictEqual(setObj.size, 0);
            assert.strictEqual(setObj.items[setValues1[0]], undefined);
            assert.strictEqual(setObj.items[setValues1[1]], undefined);
            assert.strictEqual(setObj.items[setValues1[2]], undefined);
        });

        await t.test('Should correctly remove all items in the collection - case 2', () => {
            const setObj1 = new SetClass();
            const setObj2 = new SetClass();

            setObj1.add(setValues1[0]);
            setObj1.add(setValues1[1]);
            setObj1.add(setValues1[2]);

            setObj2.add(setValues2[0]);
            setObj2.add(setValues2[1]);
            setObj2.add(setValues2[2]);

            checkSet(setObj1, setValues1);
            checkSet(setObj2, setValues2);

            setObj1.clear();
            checkSet(setObj2, setValues2);

            assert.strictEqual(setObj1.size, 0);
            assert.strictEqual(setObj1.items[setValues1[0]], undefined);
            assert.strictEqual(setObj1.items[setValues1[1]], undefined);
            assert.strictEqual(setObj1.items[setValues1[2]], undefined);

            setObj2.clear();

            assert.strictEqual(setObj2.size, 0);
            assert.strictEqual(setObj2.items[setValues2[0]], undefined);
            assert.strictEqual(setObj2.items[setValues2[1]], undefined);
            assert.strictEqual(setObj2.items[setValues2[2]], undefined);
        });
    });

    await t.test('delete() method tests...', async (t) => {
        await t.test('Should correctly remove an item from the collection - case 1', () => {
            const setObj = new SetClass();

            setObj.add(setValues1[0]);
            setObj.add(setValues1[1]);
            setObj.add(setValues1[2]);

            checkSet(setObj, setValues1);

            setObj.delete(setValues1[1]);
            checkSet(setObj, [setValues1[0], setValues1[2]]);

            setObj.delete(setValues1[2]);
            checkSet(setObj, [setValues1[0]]);

            setObj.delete(setValues1[0]);
            assert.strictEqual(setObj.size, 0);

            assert.strictEqual(setObj.items[setValues1[0]], undefined);
            assert.strictEqual(setObj.items[setValues1[1]], undefined);
            assert.strictEqual(setObj.items[setValues1[2]], undefined);
        });

        await t.test('Should correctly remove an item from the collection - case 2', () => {
            const setObj1 = new SetClass();
            const setObj2 = new SetClass();

            setObj1.add(setValues1[0]);
            setObj1.add(setValues1[1]);
            setObj1.add(setValues1[2]);

            setObj2.add(setValues2[0]);
            setObj2.add(setValues2[1]);
            setObj2.add(setValues2[2]);

            checkSet(setObj1, setValues1);

            setObj1.delete(setValues1[1]);
            checkSet(setObj1, [setValues1[0], setValues1[2]]);

            setObj1.delete(setValues1[2]);
            checkSet(setObj1, [setValues1[0]]);

            setObj1.delete(setValues1[0]);
            assert.strictEqual(setObj1.size, 0);

            assert.strictEqual(setObj1.items[setValues1[0]], undefined);
            assert.strictEqual(setObj1.items[setValues1[1]], undefined);
            assert.strictEqual(setObj1.items[setValues1[2]], undefined);

            checkSet(setObj2, setValues2);

            setObj2.delete(setValues2[1]);
            checkSet(setObj2, [setValues2[0], setValues2[2]]);

            setObj2.delete(setValues2[2]);
            checkSet(setObj2, [setValues2[0]]);

            setObj2.delete(setValues2[0]);
            assert.strictEqual(setObj2.size, 0);

            assert.strictEqual(setObj2.items[setValues2[0]], undefined);
            assert.strictEqual(setObj2.items[setValues2[1]], undefined);
            assert.strictEqual(setObj2.items[setValues2[2]], undefined);
        });
    });
});

// exports