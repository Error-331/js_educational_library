'use strict';

// external imports
import assert from 'node:assert/strict';
import test from 'node:test';

// internal imports
import AugmentedIntervalTreeIntervalClass from './../../../../../src/data_structures/tree/interval_trees/augmented_interval_tree/augmented_interval_tree_interval_class.js';
import AugmentedIntervalTreeNodeClass from './../../../../../src/data_structures/tree/interval_trees/augmented_interval_tree/augmented_interval_tree_node_class.js';

// implementation
test('AugmentedIntervalTreeIntervalClass tests...', async (t) => {
    const testLow1 = 5;
    const testLow2 = 3;
    const testLow3 = 15;
    const testLow4 = 25;

    const testHigh1 = 10;
    const testHigh2 = 20;
    const testHigh3 = -5;
    const testHigh4 = 2;

    const testLeftInterval1 = [0, 5];
    const testLeftInterval2 = [3, 7];
    const testLeftInterval3 = [1, 3];

    const testMiddleInterval1 = [6, 8];
    const testMiddleInterval2 = [7, 7];

    const testRightInterval1 = [8, 15];
    const testRightInterval2 = [10, 20];
    const testRightInterval3 = [12, 15];

    await t.test('"low" setter/getter tests...', async (t) => {
        await t.test('Should correctly set "low" value of the interval - case 1', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);

            assert.strictEqual(interval.low, testLow1);
            assert.strictEqual(interval.high, testHigh1);

            interval.low = testLow2;

            assert.strictEqual(interval.low, testLow2);
            assert.strictEqual(interval.high, testHigh1);
        });

        await t.test('Should correctly set "low" value of the interval - case 2', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(testLow2, testHigh2);

            assert.strictEqual(interval.low, testLow2);
            assert.strictEqual(interval.high, testHigh2);

            interval.low = testLow1;

            assert.strictEqual(interval.low, testLow1);
            assert.strictEqual(interval.high, testHigh2);
        });

        await t.test('Should throw error while setting "low" value of the interval - case 1', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(null, testHigh1);

            assert.strictEqual(interval.low, null);
            assert.strictEqual(interval.high, testHigh1);

            assert.throws(() => interval.low = testLow3);
        });

        await t.test('Should throw error while setting "low" value of the interval - case 2', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(null, testHigh2);

            assert.strictEqual(interval.low, null);
            assert.strictEqual(interval.high, testHigh2);

            assert.throws(() => interval.low = testLow4);
        });
    });

    await t.test('"high" setter/getter tests...', async (t) => {
        await t.test('Should correctly set "low" value of the interval - case 1', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);

            assert.strictEqual(interval.low, testLow1);
            assert.strictEqual(interval.high, testHigh1);

            interval.high = testHigh2;

            assert.strictEqual(interval.low, testLow1);
            assert.strictEqual(interval.high, testHigh2);
        });

        await t.test('Should correctly set "low" value of the interval - case 1', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(testLow2, testHigh2);

            assert.strictEqual(interval.low, testLow2);
            assert.strictEqual(interval.high, testHigh2);

            interval.high = testHigh1;

            assert.strictEqual(interval.low, testLow2);
            assert.strictEqual(interval.high, testHigh1);
        });

        await t.test('Should throw error while setting "high" value of the interval - case 1', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(testLow1, null);

            assert.strictEqual(interval.low, testLow1);
            assert.strictEqual(interval.high, null);

            assert.throws(() => interval.high = testHigh3);
        });

        await t.test('Should throw error while setting "high" value of the interval - case 2', () => {
            const interval = new AugmentedIntervalTreeIntervalClass(testLow2, null);

            assert.strictEqual(interval.low, testLow2);
            assert.strictEqual(interval.high, null);

            assert.throws(() => interval.high = testHigh4);
        });
    });

    await t.test('"isOverlapNode" method tests...', async (t) => {
        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 1', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testLeftInterval1);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 2', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testLeftInterval2);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 3', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testLeftInterval3);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), false);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 4', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testMiddleInterval1);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 5', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testMiddleInterval2);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 6', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testRightInterval1);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 7', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testRightInterval2);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified node - case 8', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testRightInterval3);
            const testNode = new AugmentedIntervalTreeNodeClass(testInterval, testInterval.high);

            assert.strictEqual(mainInterval.isOverlapNode(testNode), false);
        });
    })

    await t.test('"isOverlapInterval" method tests...', async (t) => {
        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 1', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testLeftInterval1);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 2', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testLeftInterval2);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 3', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testLeftInterval3);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), false);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 4', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testMiddleInterval1);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 5', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testMiddleInterval2);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 6', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testRightInterval1);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 7', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testRightInterval2);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), true);
        });

        await t.test('Should correctly determine whether the current interval overlaps the specified one - case 8', () => {
            const mainInterval = new AugmentedIntervalTreeIntervalClass(testLow1, testHigh1);
            const testInterval = new AugmentedIntervalTreeIntervalClass(...testRightInterval3);

            assert.strictEqual(mainInterval.isOverlapInterval(testInterval), false);
        });
    });
});

// exports