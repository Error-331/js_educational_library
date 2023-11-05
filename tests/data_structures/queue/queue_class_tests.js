'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import QueueClass from './../../../src/data_structures/queue/queue_class.js';
import {
    checkRegularQueueEmpty,
    checkRegularQueueNotEmpty,
    checkRegularQueueItems,
} from './../../../src/utils/testing/data_structures/regular_queue_test_utils.js';

// implementation
test('QueueClass tests...', async (t) => {
    await t.test('isEmpty() method tests...', async (t) => {
        await t.test('Should correctly identify empty queue', () => {
            const queueObj = new QueueClass();
            checkRegularQueueEmpty(queueObj);
        });

        await t.test('Should correctly identify none-empty stack', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(5);
            queueObj.enqueue(7);
            queueObj.enqueue(-1);
            queueObj.enqueue(10);

            checkRegularQueueNotEmpty(queueObj, 4, 0,5);
            checkRegularQueueItems(queueObj, [5, 7, -1, 10]);
        });
    });

    await t.test('peek() method tests...', async (t) => {
        await t.test('Should correctly peek an element in the queue - case 1', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(5);

            checkRegularQueueNotEmpty(queueObj, 1, 0,5);
            checkRegularQueueItems(queueObj, [5]);

            const queueItem = queueObj.peek();
            assert.strictEqual(queueItem, 5);
        });

        await t.test('Should correctly peek an element in the queue - case 2', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(74);
            queueObj.enqueue(1);

            checkRegularQueueNotEmpty(queueObj, 2, 0,74);
            checkRegularQueueItems(queueObj, [74, 1]);

            let queueItem = queueObj.peek();
            assert.strictEqual(queueItem, 74);

            queueItem = queueObj.peek();
            assert.strictEqual(queueItem, 74);
        });
    });

    await t.test('enqueue() method tests...', async (t) => {
        await t.test('Should correctly enqueue an element into the queue - case 1', () => {
            const queueObj = new QueueClass();
            queueObj.enqueue(5);

            checkRegularQueueNotEmpty(queueObj, 1, 0, 5);
            checkRegularQueueItems(queueObj, [5]);
        });

        await t.test('Should correctly enqueue an element into the queue - case 2', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(5);
            queueObj.enqueue(7);
            queueObj.enqueue(-1);
            queueObj.enqueue(10);

            checkRegularQueueNotEmpty(queueObj, 4, 0, 5);
            checkRegularQueueItems(queueObj, [5, 7, -1, 10]);
        });
    });

    await t.test('dequeue() method tests...', async (t) => {
        await t.test('Should correctly dequeue an element from the queue - case 1', () => {
            const queueObj = new QueueClass();
            queueObj.enqueue(5);

            checkRegularQueueNotEmpty(queueObj, 1, 0, 5);
            checkRegularQueueItems(queueObj, [5]);

            const queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, 5);

            checkRegularQueueItems(queueObj);
            checkRegularQueueEmpty(queueObj);
        });

        await t.test('Should correctly dequeue an element from the queue - case 2', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(5);
            queueObj.enqueue(7);
            queueObj.enqueue(-1);
            queueObj.enqueue(10);

            checkRegularQueueNotEmpty(queueObj, 4, 0, 5);
            checkRegularQueueItems(queueObj, [5, 7, -1, 10]);

            let queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, 5);

            queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, 7);

            checkRegularQueueNotEmpty(queueObj, 2, 2, -1);
            checkRegularQueueItems(queueObj, [-1, 10], -2);

            queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, -1);

            queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, 10);

            checkRegularQueueEmpty(queueObj);
        });

        await t.test('Should correctly dequeue an element from the queue - case 3', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(74);
            queueObj.enqueue(1);
            queueObj.enqueue(-65);
            queueObj.enqueue(-2);
            queueObj.enqueue(88);

            checkRegularQueueNotEmpty(queueObj, 5, 0, 74);
            checkRegularQueueItems(queueObj, [74, 1, -65, -2, 88]);

            let queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, 74);

            queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, 1);

            checkRegularQueueNotEmpty(queueObj, 3, 2, -65);
            checkRegularQueueItems(queueObj, [-65, -2, 88], -2);

            queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, -65);

            queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, -2);

            checkRegularQueueNotEmpty(queueObj, 1, 4, 88);
            checkRegularQueueItems(queueObj, [88], -4);

            queueItem = queueObj.dequeue();
            assert.strictEqual(queueItem, 88);
            checkRegularQueueEmpty(queueObj);
        });
    });

    await t.test('clear() method tests...', async (t) => {
        await t.test('Should correctly clear a queue - case 1', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(5);

            checkRegularQueueNotEmpty(queueObj, 1, 0,5);
            checkRegularQueueItems(queueObj, [5]);

            queueObj.clear();
            checkRegularQueueEmpty(queueObj);
        });

        await t.test('Should correctly clear a queue - case 2', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(5);
            queueObj.enqueue(7);
            queueObj.enqueue(-1);
            queueObj.enqueue(10);

            checkRegularQueueNotEmpty(queueObj, 4, 0,5);
            checkRegularQueueItems(queueObj, [5, 7, -1, 10]);

            queueObj.clear();
            checkRegularQueueEmpty(queueObj);
        });
    });

    await t.test('Iterator tests...', async (t) => {
        await t.test('Should correctly iterate through the queue - case 1', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(5);
            queueObj.enqueue(7);
            queueObj.enqueue(-1);
            queueObj.enqueue(10);

            checkRegularQueueItems(queueObj, [5, 7, -1, 10]);
        });

        await t.test('Should correctly iterate through the queue - case 2', () => {
            const queueObj = new QueueClass();

            queueObj.enqueue(74);
            queueObj.enqueue(1);
            queueObj.enqueue(-65);
            queueObj.enqueue(-2);
            queueObj.enqueue(88);

            checkRegularQueueItems(queueObj, [74, 1, -65, -2, 88]);
        });
    });
});

// exports
