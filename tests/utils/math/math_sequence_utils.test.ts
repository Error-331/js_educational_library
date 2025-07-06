// external imports

// internal imports
import {
    fibonacciSequence,
    nobonacciSequenceRecursive,
    nobonacciSequence,
} from '../../../src/utils/math/math_sequence_utils';

// implementation
describe('Math sequence utilities tests...', () => {
    const fibonacciSeq0 = [0];
    const fibonacciSeq1 = [0, 1];
    const fibonacciSeq2 = [0, 1, 1];
    const fibonacciSeq3 = [0, 1, 1, 2];

    const fibonacciSeq8 = [0, 1, 1, 2, 3, 5, 8, 13, 21]

    describe('fibonacciSequence() function tests...', () => {
        test('Should return correct Fibonacci sequence: n = 0', () => {
            expect(fibonacciSequence(0)).toStrictEqual(fibonacciSeq0);
        });

        test('Should return correct Fibonacci sequence: n = 1', () => {
            expect(fibonacciSequence(1)).toStrictEqual(fibonacciSeq1);
        });

        test('Should return correct Fibonacci sequence: n = 2', () => {
            expect(fibonacciSequence(2)).toStrictEqual(fibonacciSeq2);
        });

        test('Should return correct Fibonacci sequence: n = 3', () => {
            expect(fibonacciSequence(3)).toStrictEqual(fibonacciSeq3);
        });

        test('Should return correct Fibonacci sequence: n = 8', () => {
            expect(fibonacciSequence(8)).toStrictEqual(fibonacciSeq8);
        });
    });

    describe('nobonacciSequenceRecursive() function tests...', () => {
        test('Should return correct Nobonacci number: n = 0', () => {
            expect(nobonacciSequenceRecursive(0)).toStrictEqual(1);
        });

        test('Should return correct Nobonacci number: n = 1', () => {
            expect(nobonacciSequenceRecursive(1)).toStrictEqual(1);
        });

        test('Should return correct Nobonacci number: n = 2', () => {
            expect(nobonacciSequenceRecursive(2)).toStrictEqual(1);
        });

        test('Should return correct Nobonacci number: n = 3', () => {
            expect(nobonacciSequenceRecursive(3)).toStrictEqual(2);
        });

        test('Should return correct Nobonacci number: n = 4', () => {
            expect(nobonacciSequenceRecursive(4)).toStrictEqual(4);
        });

        test('Should return correct Nobonacci number: n = 5', () => {
            expect(nobonacciSequenceRecursive(5)).toStrictEqual(7);
        });

        test('Should return correct Nobonacci number: n = 6', () => {
            expect(nobonacciSequenceRecursive(6)).toStrictEqual(12);
        });

        test('Should return correct Nobonacci number: n = 7', () => {
            expect(nobonacciSequenceRecursive(7)).toStrictEqual(21);
        });
    });

    describe('nobonacciSequence() function tests...', () => {
        test('Should return correct Nobonacci number: n = 0', () => {
            expect(nobonacciSequence(0)).toStrictEqual(1);
        });

        test('Should return correct Nobonacci number: n = 1', () => {
            expect(nobonacciSequence(1)).toStrictEqual(1);
        });

        test('Should return correct Nobonacci number: n = 2', () => {
            expect(nobonacciSequence(2)).toStrictEqual(1);
        });

        test('Should return correct Nobonacci number: n = 3', () => {
            expect(nobonacciSequence(3)).toStrictEqual(2);
        });

        test('Should return correct Nobonacci number: n = 4', () => {
            expect(nobonacciSequence(4)).toStrictEqual(4);
        });

        test('Should return correct Nobonacci number: n = 5', () => {
            expect(nobonacciSequence(5)).toStrictEqual(7);
        });

        test('Should return correct Nobonacci number: n = 6', () => {
            expect(nobonacciSequence(6)).toStrictEqual(12);
        });

        test('Should return correct Nobonacci number: n = 7', () => {
            expect(nobonacciSequence(7)).toStrictEqual(21);
        });
    });
});

// exports