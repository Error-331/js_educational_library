// external imports

// internal imports

// implementation

/**
 * Generates a Fibonacci sequence with the specified number of terms.
 *
 * The Fibonacci sequence is a series of numbers where each term is the sum of the two preceding ones.
 * The sequence starts with 0 and 1 by default.
 *
 * @param {number} numOfDigits - The number of terms to generate in the Fibonacci sequence.
 * @returns {number[]} An array containing the generated Fibonacci sequence.
 *
 */

function fibonacciSequence(numOfDigits: number): number[] {
    const sequence: number[] = [];

    let nMin1 = 1;
    let nMin2 = -1;

    for (let numIdx = 0; numIdx < numOfDigits + 1; numIdx++) {
        const curN = nMin1 + nMin2;

        sequence.push(curN);
        nMin2 = nMin1;
        nMin1 = curN;
    }

    return sequence;
}

/**
 * Recursively computes the nth term of the Nobonacci sequence (variant that uses recursion).
 *
 * The Nobonacci sequence is a variation of the Fibonacci sequence where each term is calculated as: 2 * previous term - second last term + third last term.
 *
 * @param {number} numOfDigits - The position in the sequence (0-based index).
 * @returns {number} The value of the Nobonacci sequence at the given position.
 *
 */

function nobonacciSequenceRecursive(numOfDigits: number): number {
    return numOfDigits < 3 ? 1 : (2 * nobonacciSequenceRecursive(numOfDigits-1) - nobonacciSequenceRecursive(numOfDigits-2) + nobonacciSequenceRecursive(numOfDigits-3));
}

/**
 * Recursively computes the nth term of the Nobonacci sequence.
 *
 * The Nobonacci sequence is a variation of the Fibonacci sequence where each term is calculated as: 2 * previous term - second last term + third last term.
 *
 * @param {number} numOfDigits - The position in the sequence (0-based index).
 * @returns {number} The value of the Nobonacci sequence at the given position.
 *
 */

function nobonacciSequence(numOfDigits: number) {
    const sequence = [1, 1, 1];

    if (numOfDigits < 3) {
        return 1;
    }

    for (let digitIdx = 3; digitIdx <= numOfDigits; digitIdx++) {
        const calculatedDigit = 2 * sequence[digitIdx - 1] - sequence[digitIdx - 2] + sequence[digitIdx - 3];
        sequence.push(calculatedDigit );
    }

    return 2 * sequence[numOfDigits - 1] - sequence[numOfDigits - 2] + sequence[numOfDigits - 3];
}

// exports
export {
    fibonacciSequence,
    nobonacciSequenceRecursive,
    nobonacciSequence,
}