// external imports

// internal imports
import Stack from './../../../src/data_structures/stack/stack';
import {
    checkRegularStackEmpty,
    checkRegularStackNotEmpty,
    checkRegularStackItems
} from '../../../src/utils/testing/data_structures/stack/stack_test_utils';

// implementation
describe('Stack class tests...', () => {
    describe('isEmpty() method tests...', () => {
        test('Should correctly identify empty stack', () => {
            const stackObj = new Stack<number>();
            checkRegularStackEmpty<number>(stackObj);
        });

        test('Should correctly identify none-empty stack', () => {
            const stackObj = new Stack<number>();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty<number>(stackObj, 4, 10);
        });
    });

    describe('peek() method tests...', () => {
        test('Should correctly peek an element in the stack - case 1', () => {
            const stackObj = new Stack<number>();

            stackObj.push(5);

            checkRegularStackNotEmpty<number>(stackObj, 1, 5);
            checkRegularStackItems<number>(stackObj, [5]);

            const stackItem = stackObj.peek();
            expect(stackItem).toEqual(5);
        });

        test('Should correctly peek an element in the stack - case 2', () => {
            const stackObj = new Stack<number>();

            stackObj.push(74);
            stackObj.push(1);

            checkRegularStackNotEmpty<number>(stackObj, 2, 1);
            checkRegularStackItems<number>(stackObj, [74, 1]);

            let stackItem = stackObj.peek();
            expect(stackItem).toEqual(1);

            stackItem = stackObj.peek();
            expect(stackItem).toEqual(1);
        });
    });

    describe('push() method tests...', () => {
        test('Should correctly push an element into the stack - case 1', () => {
            const stackObj = new Stack<number>();
            stackObj.push(5);

            checkRegularStackNotEmpty<number>(stackObj, 1, 5);
            checkRegularStackItems<number>(stackObj, [5]);
        });

        test('Should correctly push an element into the stack - case 2', () => {
            const stackObj = new Stack<number>();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty<number>(stackObj, 4, 10);
            checkRegularStackItems<number>(stackObj, [5, 7, -1, 10]);
        });
    });

    describe('pop() method tests...', () => {
        test('Should correctly pop an element from the stack - case 1', () => {
            const stackObj = new Stack<number>();
            stackObj.push(5);

            checkRegularStackNotEmpty<number>(stackObj, 1, 5);
            checkRegularStackItems<number>(stackObj, [5]);

            const stackItem = stackObj.pop();
            expect(stackItem).toEqual(5);

            checkRegularStackItems<number>(stackObj);
            checkRegularStackEmpty<number>(stackObj);
        });

        test('Should correctly pop an element from the stack - case 2', () => {
            const stackObj = new Stack<number>();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty<number>(stackObj, 4, 10);
            checkRegularStackItems<number>(stackObj, [5, 7, -1, 10]);

            let stackItem = stackObj.pop();
            expect(stackItem).toEqual(10);

            stackItem = stackObj.pop();
            expect(stackItem).toEqual(-1);

            checkRegularStackNotEmpty<number>(stackObj, 2, 7);
            checkRegularStackItems<number>(stackObj, [5, 7]);

            stackItem = stackObj.pop();
            expect(stackItem).toEqual(7);

            stackItem = stackObj.pop();
            expect(stackItem).toEqual(5);

            checkRegularStackEmpty<number>(stackObj);
        });
    });

    describe('clear() method tests...', () => {
        test('Should correctly clear a stack - case 1', () => {
            const stackObj = new Stack<number>();

            stackObj.push(5);

            checkRegularStackNotEmpty<number>(stackObj, 1, 5);
            checkRegularStackItems<number>(stackObj, [5]);

            stackObj.clear();
            checkRegularStackEmpty<number>(stackObj);
        });

        test('Should correctly clear a stack - case 2', () => {
            const stackObj = new Stack<number>();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackNotEmpty<number>(stackObj, 4, 10);
            checkRegularStackItems<number>(stackObj, [5, 7, -1, 10]);

            stackObj.clear();
            checkRegularStackEmpty<number>(stackObj);
        });
    });

    describe('Iterator tests...', () => {
        test('Should correctly iterate through the stack - case 1', () => {
            const stackObj = new Stack<number>();

            stackObj.push(5);
            stackObj.push(7);
            stackObj.push(-1);
            stackObj.push(10);

            checkRegularStackItems(stackObj, [5, 7, -1, 10]);
        });

        test('Should correctly iterate through the stack - case 2', () => {
            const stackObj = new Stack<number>();

            stackObj.push(2);
            stackObj.push(10);
            stackObj.push(15);
            stackObj.push(20);

            checkRegularStackItems<number>(stackObj, [2, 10, 15, 20]);
        });
    });
});

// exports