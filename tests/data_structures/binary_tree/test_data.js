'use strict';

// external imports

// internal imports

// implementation
const binarySearchTreeKeys1 = [40, 30, 50, 25, 35, 45, 60];
const binarySearchTreeKeys2 = [8, 3, 10, 1, 6, 4, 7, 14, 13];
const binarySearchTreeKeys3 = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25];
const binarySearchTreeKeys4 = [15, 10, 20, 8, 12, 7, 9, 11, 13, 30, 25, 28, 27];

const unbalancedAVLBinarySearchTreeKeys1 = [3, 2, 1];
const unbalancedAVLBinarySearchTreeKeys2 = [50, 30, 70, 10, 40, 5];

const unbalancedAVLBinarySearchTreeKeys3 = [1, 2, 3];
const unbalancedAVLBinarySearchTreeKeys4 = [50, 30, 70, 60, 80, 90];

const unbalancedAVLBinarySearchTreeKeys5 = [3, 1, 0.5, 2, 1.5, 2.5, 4];

const unbalancedAVLBinarySearchTreeKeys1LLRotation = [2, 1, 3];
const unbalancedAVLBinarySearchTreeKeys2LLRotation = [30, 10, 50, 5, null, 40, 70];

const unbalancedAVLBinarySearchTreeKeys3RRRotation = [2, 1, 3];
const unbalancedAVLBinarySearchTreeKeys4RRRotation = [70, 50, 80, 30, 60, null, 90];

const unbalancedAVLBinarySearchTreeKeys5LLRRRotation = [2, 1, 3, 0.5, 1.5, 2.5, 4];

const binarySearchTreeKeys3RotationLeft1 = [15, 11, 20, 7, 13, 18, 25, 5, 9, 12, 14, null, null, null, null, 3, null, 8, 10];
const binarySearchTreeKeys3RotationLeft2 = [11, 7, 20, 5, 9, 15, 25, 3, null, 8, 10, 13, 18, null, null, null, null, null, null, null, null, null, null, 12, 14];

// exports
export {
    binarySearchTreeKeys1,
    binarySearchTreeKeys2,
    binarySearchTreeKeys3,
    binarySearchTreeKeys4,

    unbalancedAVLBinarySearchTreeKeys1,
    unbalancedAVLBinarySearchTreeKeys2,

    unbalancedAVLBinarySearchTreeKeys3,
    unbalancedAVLBinarySearchTreeKeys4,

    unbalancedAVLBinarySearchTreeKeys5,

    unbalancedAVLBinarySearchTreeKeys1LLRotation,
    unbalancedAVLBinarySearchTreeKeys2LLRotation,

    unbalancedAVLBinarySearchTreeKeys3RRRotation,
    unbalancedAVLBinarySearchTreeKeys4RRRotation,

    unbalancedAVLBinarySearchTreeKeys5LLRRRotation,

    binarySearchTreeKeys3RotationLeft1,
    binarySearchTreeKeys3RotationLeft2,
}