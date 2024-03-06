'use strict';

// external imports
import test from 'node:test';

// internal imports
import {
    adjacencyListData1,
    adjacencyListData2,
    adjacencyListData3,

    adjacencyMatrixData1,
    adjacencyMatrixData2,
    adjacencyMatrixData3,
} from './test_data.js';

import GraphAdjacencyMatrixClass from './../../../src/data_structures/graph/graph_adjacency_matrix_class.js';

import {
    checkGraphRegularAdjacencyMatrixIdsArray,
    checkGraphRegularAdjacencyMatrixRowsCount,
    checkGraphRegularAdjacencyMatrixRowById,
    checkGraphRegularAdjacencyMatrixRowsIds,
    checkGraphRegularAdjacencyMatrixRowsIdsByIterator,
}  from './../../../src/utils/testing/data_structures/graph/graph_adjacency_matrix_test_utils.js';

// implementation
test('GraphAdjacencyMatrixClass tests...', async (t) => {
    await t.test('initByAdjacencyList() method tests...', async (t) => {
        await t.test('Should correctly init graph adjacency matrix by adjacency list - case 1', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData1);

            const adjacencyArray = adjacencyMatrix.toArray();

            checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
                [1, 3],
                [0, 2],
                [1],
                [0],
            ]);
        });

        await t.test('Should correctly init graph adjacency matrix by adjacency list - case 2', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData2);

            const adjacencyArray = adjacencyMatrix.toArray();

            checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
                [1, 2, 3],
                [0, 4],
                [0],
                [0, 5],
                [1, 5],
                [3, 4, 6, 7],
                [5],
                [5],
            ]);
        });

        await t.test('Should correctly init graph adjacency matrix by adjacency list - case 3', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData3);

            const adjacencyArray = adjacencyMatrix.toArray();

            checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
                [2, 3],
                [2, 4],
                [0, 1, 3, 4],
                [0, 2],
                [1, 2],
            ]);
        });
    });

    await t.test('initByAdjacencyMatrix() method tests...', async (t) => {
        await t.test('Should correctly init graph adjacency matrix by adjacency matrix nested array - case 1', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData1);

            const adjacencyArray = adjacencyMatrix.toArray();

            checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
                [1, 3],
                [0, 2],
                [1],
                [0],
            ]);
        });

        await t.test('Should correctly init graph adjacency matrix by adjacency matrix nested array - case 2', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData2);

            const adjacencyArray = adjacencyMatrix.toArray();

            checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
                [1, 2, 3],
                [0, 4],
                [0],
                [0, 5],
                [1, 5],
                [3, 4, 6, 7],
                [5],
                [5],
            ]);
        });

        await t.test('Should correctly init graph adjacency matrix by adjacency matrix nested array - case 3', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData3);

            const adjacencyArray = adjacencyMatrix.toArray();

            checkGraphRegularAdjacencyMatrixIdsArray(adjacencyArray, [
                [2, 3],
                [2, 4],
                [0, 1, 3, 4],
                [0, 2],
                [1, 2],
            ]);
        });
    });

    await t.test('getRowById() method tests...', async (t) => {
        await t.test('Should correctly return row data of the adjacency matrix - case 1', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData1);

            checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(1), [
                [0, null],
                [2, null],
            ]);
        });

        await t.test('Should correctly return row data of the adjacency matrix - case 2', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData2);

            checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(0), [
                [1, null],
                [2, null],
                [3, null],
            ]);
        });

        await t.test('Should correctly return row data of the adjacency matrix - case 3', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData3);

            checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(2), [
                [0, null],
                [1, null],
                [3, null],
                [4, null],
            ]);
        });

        await t.test('Should correctly return row data of the adjacency matrix - case 4', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData1);

            checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(1), [
                [0, null],
                [2, null],
            ]);
        });

        await t.test('Should correctly return row data of the adjacency matrix - case 5', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData2);

            checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(0), [
                [1, null],
                [2, null],
                [3, null],
            ]);
        });

        await t.test('Should correctly return row data of the adjacency matrix - case 6', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData3);

            checkGraphRegularAdjacencyMatrixRowById(adjacencyMatrix.getRowById(2), [
                [0, null],
                [1, null],
                [3, null],
                [4, null],
            ]);
        });
    });

    await t.test('rowsIds() getter tests...', async (t) => {
        await t.test('Should correctly return row IDs - case 1', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData1);

            checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3]);
        });

        await t.test('Should correctly return row IDs - case 2', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData2);

            checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4, 5, 6, 7]);
        });

        await t.test('Should correctly return row IDs - case 3', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData3);

            checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4]);
        });

        await t.test('Should correctly return row IDs - case 4', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData1);

            checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3]);
        });

        await t.test('Should correctly return row IDs - case 5', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData2);

            checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4, 5, 6, 7]);
        });

        await t.test('Should correctly return row IDs - case 6', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData3);

            checkGraphRegularAdjacencyMatrixRowsIds(adjacencyMatrix.rowsIds, [0, 1, 2, 3, 4]);
        });
    });

    await t.test('rowsCount() getter tests...', async (t) => {
        await t.test('Should correctly return rows count - case 1', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData1);

            checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 4);
        });

        await t.test('Should correctly return rows count - case 2', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData2);

            checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 8);
        });

        await t.test('Should correctly return rows count - case 3', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData3);

            checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 5);
        });

        await t.test('Should correctly return rows count - case 4', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData1);

            checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 4);
        });

        await t.test('Should correctly return rows count - case 5', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData2);

            checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 8);
        });

        await t.test('Should correctly return rows count - case 6', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData3);

            checkGraphRegularAdjacencyMatrixRowsCount(adjacencyMatrix.rowsCount, 5);
        });
    });

    await t.test('Rows IDs iterator tests...', async (t) => {
        await t.test('Should correctly iterate through row IDs - case 1', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData1);

            checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3]);
        });

        await t.test('Should correctly iterate through row IDs - case 2', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData2);

            checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4, 5, 6, 7]);
        });

        await t.test('Should correctly iterate through row IDs - case 3', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyList(adjacencyListData3);

            checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4]);
        });

        await t.test('Should correctly iterate through row IDs - case 4', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData1);

            checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3]);
        });

        await t.test('Should correctly iterate through row IDs - case 5', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData2);

            checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4, 5, 6, 7]);
        });

        await t.test('Should correctly iterate through row IDs - case 6', () => {
            const adjacencyMatrix = new GraphAdjacencyMatrixClass();
            adjacencyMatrix.initByAdjacencyMatrix(adjacencyMatrixData3);

            checkGraphRegularAdjacencyMatrixRowsIdsByIterator(adjacencyMatrix.rowsIdsIterator, [0, 1, 2, 3, 4]);
        });
    });
});

// exports
