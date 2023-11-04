'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import StackClass from './../../../src/data_structures/stack/stack_class.js';
import {
    checkRegularStackEmpty,
    checkRegularStackNotEmpty,
    checkRegularStackItems
} from './../../../src/utils/testing/data_structures/regular_stack_class_test_utils.js';

// implementation
test('StackClass tests...', async (t) => {
    await t.test('isEmpty() method tests...', async (t) => {
        await t.test('Should correctly identify empty stack', () => {
            const stackObj = new StackClass();
            checkRegularStackEmpty(stackObj);
        });

        await t.test('Should correctly identify none-empty stack', () => {
            const stackObj = new StackClass();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty(stackObj, 4, 10);
        });
    });

    await t.test('peek() method tests...', async (t) => {
        await t.test('Should correctly peek an element in the stack - case 1', () => {
            const stackObj = new StackClass();

            stackObj.push(5);

            checkRegularStackNotEmpty(stackObj, 1, 5);
            checkRegularStackItems(stackObj, [5]);

            const stackItem = stackObj.peek();
            assert.strictEqual(stackItem, 5);
        });

        await t.test('Should correctly peek an element in the stack - case 2', () => {
            const stackObj = new StackClass();

            stackObj.push(74);
            stackObj.push(1);

            checkRegularStackNotEmpty(stackObj, 2, 1);
            checkRegularStackItems(stackObj, [74, 1]);

            let stackItem = stackObj.peek();
            assert.strictEqual(stackItem, 1);

            stackItem = stackObj.peek();
            assert.strictEqual(stackItem, 1);
        });
    });

    await t.test('push() method tests...', async (t) => {
        await t.test('Should correctly push an element into the stack - case 1', () => {
            const stackObj = new StackClass();
            stackObj.push(5);

            checkRegularStackNotEmpty(stackObj, 1, 5);
            checkRegularStackItems(stackObj, [5]);
        });

        await t.test('Should correctly push an element into the stack - case 2', () => {
            const stackObj = new StackClass();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty(stackObj, 4, 10);
            checkRegularStackItems(stackObj, [5, 7, -1, 10]);
        });
    });

    await t.test('pop() method tests...', async (t) => {
        await t.test('Should correctly pop an element from the stack - case 1', () => {
            const stackObj = new StackClass();
            stackObj.push(5);

            checkRegularStackNotEmpty(stackObj, 1, 5);
            checkRegularStackItems(stackObj, [5]);

            const stackItem = stackObj.pop();
            assert.strictEqual(stackItem, 5);

            checkRegularStackItems(stackObj);
            checkRegularStackEmpty(stackObj);
        });

        await t.test('Should correctly pop an element from the stack - case 2', () => {
            const stackObj = new StackClass();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty(stackObj, 4, 10);
            checkRegularStackItems(stackObj, [5, 7, -1, 10]);

            let stackItem = stackObj.pop();
            assert.strictEqual(stackItem, 10);

            stackItem = stackObj.pop();
            assert.strictEqual(stackItem, -1);

            checkRegularStackNotEmpty(stackObj, 2, 7);
            checkRegularStackItems(stackObj, [5, 7]);

            stackItem = stackObj.pop();
            assert.strictEqual(stackItem, 7);

            stackItem = stackObj.pop();
            assert.strictEqual(stackItem, 5);

            checkRegularStackEmpty(stackObj);
        });
    });

    await t.test('clear() method tests...', async (t) => {
        await t.test('Should correctly clear a stack - case 1', () => {
            const stackObj = new StackClass();

            stackObj.push(5);

            checkRegularStackNotEmpty(stackObj, 1, 5);
            checkRegularStackItems(stackObj, [5]);

            stackObj.clear();
            checkRegularStackEmpty(stackObj);
        });

        await t.test('Should correctly clear a stack - case 2', () => {
            const stackObj = new StackClass();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty(stackObj, 4, 10);
            checkRegularStackItems(stackObj, [5, 7, -1, 10]);

            stackObj.clear();
            checkRegularStackEmpty(stackObj);
        });
    });

    await t.test('Iterator tests...', async (t) => {
        await t.test('Should correctly iterate through the stack - case 1', () => {
            const stackObj = new StackClass();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackItems(stackObj, [5, 7, -1, 10]);
        });

        await t.test('Should correctly iterate through the stack - case 2', () => {
            const stackObj = new StackClass();

            stackObj.push(2);
            stackObj.push(10);
            stackObj.push(15);
            stackObj.push(20);

            checkRegularStackItems(stackObj, [2, 10, 15, 20]);
        });
    });
});

// exports
