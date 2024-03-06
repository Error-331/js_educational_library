'use strict';

// external imports

// internal imports

// implementation
const adjacencyListData1 = [];

adjacencyListData1[0] = [];
adjacencyListData1[0].push(1);
adjacencyListData1[0].push(3);

adjacencyListData1[1] = [];
adjacencyListData1[1].push(0);
adjacencyListData1[1].push(2);

adjacencyListData1[2] = [];
adjacencyListData1[2].push(1);

adjacencyListData1[3] = [];
adjacencyListData1[3].push(0);

const adjacencyListData2 = [];

adjacencyListData2[0] = [];
adjacencyListData2[0].push(1);
adjacencyListData2[0].push(2);
adjacencyListData2[0].push(3);

adjacencyListData2[1] = [];
adjacencyListData2[1].push(0);
adjacencyListData2[1].push(4);

adjacencyListData2[2] = [];
adjacencyListData2[2].push(0);

adjacencyListData2[3] = [];
adjacencyListData2[3].push(0);
adjacencyListData2[3].push(5);

adjacencyListData2[4] = [];
adjacencyListData2[4].push(1);
adjacencyListData2[4].push(5);

adjacencyListData2[5] = [];
adjacencyListData2[5].push(3);
adjacencyListData2[5].push(4);
adjacencyListData2[5].push(6);
adjacencyListData2[5].push(7);

adjacencyListData2[6] = [];
adjacencyListData2[6].push(5);

adjacencyListData2[7] = [];
adjacencyListData2[7].push(5);

const adjacencyListData3 = [];

adjacencyListData3[0] = [];
adjacencyListData3[0].push(2);
adjacencyListData3[0].push(3);

adjacencyListData3[1] = [];
adjacencyListData3[1].push(2);
adjacencyListData3[1].push(4);

adjacencyListData3[2] = [];
adjacencyListData3[2].push(0);
adjacencyListData3[2].push(1);
adjacencyListData3[2].push(3);
adjacencyListData3[2].push(4);

adjacencyListData3[3] = [];
adjacencyListData3[3].push(0);
adjacencyListData3[3].push(2);

adjacencyListData3[4] = [];
adjacencyListData3[4].push(1);
adjacencyListData3[4].push(2);

const adjacencyMatrixData1 = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0]
]; // result - 0 1 2 3

const adjacencyMatrixData2 = [
    [0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
]; // result - 0 1 4 5 3 6 7 2

const adjacencyMatrixData3 = [
//   1  2  3  4  5
    [0, 0, 1, 1, 0], // 1
    [0, 0, 1, 0, 1], // 2
    [1, 1, 0, 1, 1], // 3
    [1, 0, 1, 0, 0], // 4
    [0, 1, 1, 0, 0], // 5
]; // result - 0 2 1 4 3

// exports
export {
    adjacencyListData1,
    adjacencyListData2,
    adjacencyListData3,

    adjacencyMatrixData1,
    adjacencyMatrixData2,
    adjacencyMatrixData3,
}