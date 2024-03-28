'use strict';

// external imports
import assert from 'node:assert/strict';
import test from 'node:test';

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from './../../../src/constants/comparator_constants.js';

import {
    prepareDataForIterationTest,
    checkNode,
    checkRegularGeneralTreeNodeChildrenIterator,
    checkRegularGeneralTreeDestroyedNodeChildrenIterator
} from './../../../src/utils/testing/data_structures/generic_tree/generic_tree_node_test_utils.js';

import GenericTreeClass from './../../../src/data_structures/generic_tree/generic_tree_class.js';
import GeneralTreeNodeClass from './../../../src/data_structures/generic_tree/general_tree_node_class.js';

// implementation
test('GenericTreeNodeClass tests...', async (t) => {
    await t.test('Instance creation tests...', async (t) => {
        await t.test('Should create a BinarySearchTreeNode - case 1', () => {
            let tree = new GenericTreeClass();
            let node = null;

            const data = 'test_val1';

            try {
                node = new GeneralTreeClass(tree, null, null,null, data);
            } catch (error) {
                assert.fail(`Cannot create a node; ${error.message}`);
            }

            checkNode(node, tree, null, data);
        });

        await t.test('Should create a BinarySearchTreeNode - case 2', () => {
            let tree = new GeneralTreeClass();
            let node = null;

            const data = 5;

            try {
                node = new GenericTreeNodeClass(tree, null, null, null, data);
            } catch (error) {
                assert.fail(`Cannot create a node; ${error.message}`);
            }

            checkNode(node, tree, null, data);
        });

        await t.test('Should create a BinarySearchTreeNode - case 3', () => {
            let tree = new GeneralTreeClass();

            let childNode = null;
            let parentNode = null;

            const data1 = 15;
            const data2 = 'test_val1';

            try {
                parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);
                childNode = new GenericTreeNodeClass(tree, parentNode, null, null, data2);
            } catch (error) {
                assert.fail(`Cannot create a node; ${error.message}`);
            }

            checkNode(parentNode, tree, null, data1);
            checkNode(childNode, tree, parentNode, data2);
        });
    });

    await t.test('Data change tests...', async (t) => {
        await t.test('Should change node data successfully - case 1', () => {
            const data1 = 5;
            const data2 = 'test_val1';

            const tree = new GeneralTreeClass();
            const node = new GenericTreeNodeClass(tree, null, null, null, data1);

            checkNode(node, tree, null, data1);

            node.data = data2;
            checkNode(node, tree, null, data2);
        });

        await t.test('Should change node data successfully - case 2', () => {
            const data1 = 'test_val1';
            const data2 = 54;

            const tree = new GeneralTreeClass();
            const node = new GenericTreeNodeClass(tree, null, null, null, data1);

            checkNode(node, tree, null, data1);

            node.data = data2;
            checkNode(node, tree, null, data2);
        });
    });

    await t.test('"getChildAt" getter tests...', async (t) => {
        await t.test('Should correctly get child node at specific index - case 1', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];
            const testIndex = 2;

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, null, data);

            for (const childDataItem of childData) {
                parentNode.addChild(childDataItem);
            }

            const childNodeAtIndex = parentNode.getChildAt(testIndex);
            checkNode(childNodeAtIndex, tree, parentNode, childData[testIndex]);
        });

        await t.test('Should correctly get child node at specific index - case 2', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];
            const testIndex = 3;

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);

            for (const childDataItem of childData) {
                parentNode.addChild(childDataItem);
            }

            const childNodeAtIndex = parentNode.getChildAt(testIndex);
            checkNode(childNodeAtIndex, tree, parentNode, childData[testIndex]);
        });

        await t.test('Should correctly get child node at specific index - case 3', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];
            const testIndex = 6;

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, null, data);

            for (const childDataItem of childData) {
                parentNode.addChild(childDataItem);
            }

            const childNodeAtIndex = parentNode.getChildAt(testIndex);
            assert.strictEqual(childNodeAtIndex, undefined);
        });
    });

    await t.test('"isLeaf" method tests...', async (t) => {
        await t.test('Should correctly determine whether specific node is leaf or not - case 1', () => {
            const data1 = 5;
            const data2 = 'test_val1';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            checkNode(parentNode, tree, null, data1);
            assert.strictEqual(parentNode.isLeaf, true);

            const childNode = parentNode.addChild(data2);
            assert.strictEqual(parentNode.isLeaf, false);

            checkNode(childNode, tree, parentNode, data2);
            assert.strictEqual(childNode.isLeaf, true);
        });

        await t.test('Should correctly determine whether specific node is leaf or not - case 2', () => {
            const data1 = 5;
            const data2 = 'test_val1';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            checkNode(parentNode, tree, null, data1);
            assert.strictEqual(parentNode.isLeaf, true);

            const childNode = new GenericTreeNodeClass(tree, parentNode, null, null, data2);
            assert.strictEqual(parentNode.isLeaf, true);

            checkNode(childNode, tree, parentNode, data2);
            assert.strictEqual(childNode.isLeaf, true);
        });
    });

    await t.test('"leftmostChild" getter tests...', async (t) => {
        await t.test('Should correctly get leftmost child - case 1', () => {
            const data1 = 5;
            const data2 = 'test_val1';
            const data3 = 'test_val2';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, null, data1);

            checkNode(parentNode, tree, null, data1);

            const childNode1 = parentNode.addChild(data2);
            const childNode2 = parentNode.addChild(data3);

            checkNode(childNode1, tree, parentNode, data2);
            checkNode(childNode2, tree, parentNode, data3);

            const leftmostChild = parentNode.leftmostChild;
            checkNode(leftmostChild, tree, parentNode, data2);
        });

        await t.test('Should correctly get leftmost child - case 2', () => {
            const data1 = 43;
            const data2 = 'test_val_5';
            const data3 = 'test_val_7';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, null, data1);

            checkNode(parentNode, tree, null, data1);

            const childNode1 = parentNode.addChild(data2);
            const childNode2 = parentNode.addChild(data3);

            checkNode(childNode1, tree, parentNode, data2);
            checkNode(childNode2, tree, parentNode, data3);

            const leftmostChild = parentNode.leftmostChild;
            checkNode(leftmostChild, tree, parentNode, data2);
        });

        await t.test('Should correctly get leftmost child - case 3', () => {
            const data1 = 43;

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            checkNode(parentNode, tree, null, data1);

            const leftmostChild = parentNode.leftmostChild;
            assert.strictEqual(leftmostChild, null);
        });
    });

    await t.test('"rightmostChild" getter tests...', async (t) => {
        await t.test('Should correctly get rightmost child - case 1', () => {
            const data1 = 5;
            const data2 = 'test_val1';
            const data3 = 'test_val2';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            checkNode(parentNode, tree, null, data1);

            const childNode1 = parentNode.addChild(data2);
            const childNode2 = parentNode.addChild(data3);

            checkNode(childNode1, tree, parentNode, data2);
            checkNode(childNode2, tree, parentNode, data3);

            const rightmostChild = parentNode.rightmostChild;
            checkNode(rightmostChild, tree, parentNode, data3);
        });

        await t.test('Should correctly get rightmost child - case 2', () => {
            const data1 = 43;
            const data2 = 'test_val_5';
            const data3 = 'test_val_7';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            checkNode(parentNode, tree, null, data1);

            const childNode1 = parentNode.addChild(data2);
            const childNode2 = parentNode.addChild(data3);

            checkNode(childNode1, tree, parentNode, data2);
            checkNode(childNode2, tree, parentNode, data3);

            const rightmostChild = parentNode.rightmostChild;
            checkNode(rightmostChild, tree, parentNode, data3);
        });

        await t.test('Should correctly get rightmost child - case 3', () => {
            const data1 = 43;

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            checkNode(parentNode, tree, null, data1);

            const rightmostChild = parentNode.rightmostChild;
            assert.strictEqual(rightmostChild, null);
        });
    });

    await t.test('"nextSibling" getter tests...', async (t) => {
        await t.test('Should correctly get next sibling - case 1', () => {
            const data1 = 5;
            const data2 = 'test_val1';
            const data3 = 'test_val2';
            const data4 = 'test_val3';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            const childNode1 = parentNode.addChild(data2);
            const childNode2 = parentNode.addChild(data3);
            const childNode3 = parentNode.addChild(data4);

            checkNode(parentNode, tree, null, data1);
            checkNode(childNode1, tree, parentNode, data2);

            let nextSibling = childNode1.nextSibling;
            checkNode(nextSibling, tree, parentNode, data3);
            assert.strictEqual(nextSibling, childNode2);

            nextSibling = nextSibling.nextSibling;
            checkNode(nextSibling, tree, parentNode, data4);
            assert.strictEqual(nextSibling, childNode3);
        });

        await t.test('Should correctly get next sibling - case 2', () => {
            const data1 = 5;
            const data2 = 'test_val1';
            const data3 = 'test_val2';
            const data4 = 'test_val3';

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data1);

            const childNode1 = parentNode.addChild(data2);
            const subChildNode1 = childNode1.addChild(data3);
            const subChildNode2 = childNode1.addChild(data4);

            checkNode(parentNode, tree, null, data1);
            checkNode(childNode1, tree, parentNode, data2);
            checkNode(subChildNode1, tree, childNode1, data3);

            const nextSibling = childNode1.firstChild.nextSibling;
            checkNode(nextSibling, tree, childNode1, data4);
            assert.strictEqual(nextSibling, subChildNode2);
        });
    });

    await t.test('"findChildBy" getter tests...', async (t) => {
        await t.test('Should correctly get child node using specific callback function - case 1', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChildBy((data, treeNode) => data === treeNode.data ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL, -5);
            checkNode(requiredNode, ...dataForTest[2]);
        });

        await t.test('Should correctly get child node using specific callback function - case 2', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, null, data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChildBy((data, treeNode) => data === treeNode.data ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL,'test_val1');
            checkNode(requiredNode, ...dataForTest[3]);
        });

        await t.test('Should correctly get child node using specific callback function - case 3', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChildBy((data, treeNode) => data === treeNode.data ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL, 543);
            assert.strictEqual(requiredNode, null);
        });
    });

    await t.test('"findChildByData" method tests...', async (t) => {
        await t.test('Should correctly find child node by specific data - case 1', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChildByData(-5);
            checkNode(requiredNode, ...dataForTest[2]);
        });

        await t.test('Should correctly find child node by specific data - case 2', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChildByData('test_val1');
            checkNode(requiredNode, ...dataForTest[3]);
        });

        await t.test('Should correctly find child node by specific data - case 3', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChildByData(543);
            assert.strictEqual(requiredNode, null);
        });
    });

    await t.test('"findChild" method tests...', async (t) => {
        await t.test('Should correctly find child node - case 1', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, (data, treeNode) => data === treeNode.data ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL, data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChild(-5);
            checkNode(requiredNode, ...dataForTest[2]);
        });

        await t.test('Should correctly find child node - case 2', () => {
            const data = 'test_val1';
            const childData = [
                { method: 'post', path: '/param1/param2', handler: () => {} },
                { method: 'get', path: '/param1/param2', handler: () => {} },
                { method: 'post', path: '/param2/param1', handler: () => {} },
                { method: 'put', path: '/a1/a2', handler: () => {} },
            ];

            const pathPartTreeComparator = (pathNode, method, path) => {
                if (pathNode.data.path instanceof RegExp) {
                    return COMPARATOR_NONE_EQUAL;
                }

                return (pathNode.data.method === method && pathNode.data.path === path) ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;
            };

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, ([method, pathPart], childNode) => pathPartTreeComparator(childNode, method, pathPart), data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChild(['post', '/param2/param1']);
            checkNode(requiredNode, ...dataForTest[2]);
        });

        await t.test('Should correctly find child node - case 3', () => {
            const data = 'test_val1';
            const childData = [
                { method: 'post', path: '/param1/param2', handler: () => {} },
                { method: 'get', path: '/param1/param2', handler: () => {} },
                { method: 'post', path: '/param2/param1', handler: () => {} },
                { method: 'put', path: '/a1/a2', handler: () => {} },
            ];

            const pathPartTreeComparator = (pathNode, method, path) => {
                if (pathNode.data.path instanceof RegExp) {
                    return COMPARATOR_NONE_EQUAL;
                }

                return (pathNode.data.method === method && pathNode.data.path === path) ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;
            };

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,([method, pathPart], childNode) => pathPartTreeComparator(childNode, method, pathPart), data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            const requiredNode = parentNode.findChild(['put', '/a1/a3']);
            assert.strictEqual(requiredNode, null);
        });
    });

    await t.test('"hasChild" method tests...', async (t) => {
        await t.test('Should correctly indicate that child node exist in the tree - case 1', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, (data, treeNode) => data === treeNode.data ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL, data);

            prepareDataForIterationTest(tree, parentNode, childData);
            assert.strictEqual(parentNode.hasChild(-5), true);
        });

        await t.test('Should correctly indicate that child node exist in the tree - case 2', () => {
            const data = 'test_val1';
            const childData = [
                { method: 'post', path: '/param1/param2', handler: () => {} },
                { method: 'get', path: '/param1/param2', handler: () => {} },
                { method: 'post', path: '/param2/param1', handler: () => {} },
                { method: 'put', path: '/a1/a2', handler: () => {} },
            ];

            const pathPartTreeComparator = (pathNode, method, path) => {
                if (pathNode.data.path instanceof RegExp) {
                    return COMPARATOR_NONE_EQUAL;
                }

                return (pathNode.data.method === method && pathNode.data.path === path) ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;
            };

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null, ([method, pathPart], childNode) => pathPartTreeComparator(childNode, method, pathPart), data);

            prepareDataForIterationTest(tree, parentNode, childData);
            assert.strictEqual(parentNode.hasChild(['post', '/param2/param1']), true);
        });

        await t.test('Should correctly indicate that child node exist in the tree - case 3', () => {
            const data = 'test_val1';
            const childData = [
                { method: 'post', path: '/param1/param2', handler: () => {} },
                { method: 'get', path: '/param1/param2', handler: () => {} },
                { method: 'post', path: '/param2/param1', handler: () => {} },
                { method: 'put', path: '/a1/a2', handler: () => {} },
            ];

            const pathPartTreeComparator = (pathNode, method, path) => {
                if (pathNode.data.path instanceof RegExp) {
                    return COMPARATOR_NONE_EQUAL;
                }

                return (pathNode.data.method === method && pathNode.data.path === path) ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;
            };

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,([method, pathPart], childNode) => pathPartTreeComparator(childNode, method, pathPart), data);

            prepareDataForIterationTest(tree, parentNode, childData);
            assert.strictEqual(parentNode.hasChild(['put', '/a1/a3']), false);
        });
    });

    await t.test('Child iterator tests...', async (t) => {
        await t.test('Should correctly iterate through children of the specific node - case 1', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
        });

        await t.test('Should correctly iterate through children of the specific node - case 2', () => {
            const data = 'test_val1';
            const childData = [{prop1: 'test_sub_prop1'}, 64, null, 'test_val2'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const [ dataForTest ] = prepareDataForIterationTest(tree, parentNode, childData);

            checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
        });
    });

    await t.test('"destroy" method tests...', async (t) => {
        await t.test('Should correctly destroy a node and all of its children - case 1', () => {
            const data = 'test_val1';
            const childData = [5, 10, -5, 'test_val1'];

            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const [ dataForTest, childNodes ] = prepareDataForIterationTest(tree, parentNode, childData);

            checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
            parentNode.destroy();

            checkRegularGeneralTreeDestroyedNodeChildrenIterator(parentNode, childNodes);
        });

        await t.test('Should correctly destroy a node and all of its children - case 2', () => {
            const data = 'test_val1';
            const childData = [
                {
                    prop1 : 'test_sub_val1',
                    destroy: function() { this.prop1 = null }
                },

                {
                    prop1 : 'test_sub_val2',
                    destroy: function() { this.prop1 = null }
                },

                {
                    prop1 : 'test_sub_val3',
                    destroy: function() { this.prop1 = null }
                }
            ];


            const tree = new GeneralTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const [ dataForTest, childNodes, destroyCallTracker ] = prepareDataForIterationTest(tree, parentNode, childData);

            checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);
            parentNode.destroy();

            checkRegularGeneralTreeDestroyedNodeChildrenIterator(parentNode, childNodes);
            destroyCallTracker.verify();
        });

        await t.test('Should correctly destroy a node and all of its children - case 3', () => {
            const data = 'test_val1';
            const childData1 = [
                {
                    prop1 : 'test_sub_val1',
                    destroy: function() { this.prop1 = null }
                },

                {
                    prop1 : 'test_sub_val2',
                    destroy: function() { this.prop1 = null }
                },

                {
                    prop1 : 'test_sub_val3',
                    destroy: function() { this.prop1 = null }
                }
            ];

            const childData2 = [
                {
                    prop2 : 'test_sub_sub_val1',
                    destroy: function() { this.prop2 = null }
                },

                {
                    prop2 : 'test_sub_sub_val2',
                    destroy: function() { this.prop2 = null }
                },

                {
                    prop2 : 'test_sub_sub_val3',
                    destroy: function() { this.prop2 = null }
                }
            ];

            const childData3 = [
                {
                    prop3 : 'test_sub_sub_sub_val1',
                    destroy: function() { this.prop3 = null }
                },

                {
                    prop3 : 'test_sub_sub_sub_val2',
                    destroy: function() { this.prop3 = null }
                },

                {
                    prop3 : 'test_sub_sub_sub_val3',
                    destroy: function() { this.prop3 = null }
                }
            ];

            const tree = new GenericTreeClass();
            const parentNode = new GenericTreeNodeClass(tree, null, null,null, data);
            const destroyCallTrackers = [];

            const subChildNodesStore = [];
            const subSubChildNodesStore = [];

            const [ dataForTest, childNodes, destroyCallTracker ] = prepareDataForIterationTest(tree, parentNode, childData1);
            destroyCallTrackers.push(destroyCallTracker);

            checkRegularGeneralTreeNodeChildrenIterator(parentNode, dataForTest);

            for (const childNode of childNodes) {
                const [ childDataForTest, subChildNodes, childDestroyCallTracker ] = prepareDataForIterationTest(tree, childNode, childData2);

                destroyCallTrackers.push(childDestroyCallTracker);
                subChildNodesStore.push(subChildNodes);

                checkRegularGeneralTreeNodeChildrenIterator(childNode, childDataForTest);

                for (const subChildNode of subChildNodes) {
                    const [ subChildDataForTest, subSubChildNodes, subChildDestroyCallTracker ] = prepareDataForIterationTest(tree, subChildNode, childData3);

                    destroyCallTrackers.push(subChildDestroyCallTracker);
                    subSubChildNodesStore.push(subSubChildNodes);

                    checkRegularGeneralTreeNodeChildrenIterator(subChildNode, subChildDataForTest);
                }
            }

            parentNode.destroy();
            for (const destroyCallTrackerItem of destroyCallTrackers) {
                destroyCallTrackerItem.verify();
            }

            checkRegularGeneralTreeDestroyedNodeChildrenIterator(parentNode, childNodes);

            for (let childNodesCounter1 = 0; childNodesCounter1 < childNodes.length; childNodesCounter1++) {
                const childNode = childNodes[childNodesCounter1];
                const subChildNodes = subChildNodesStore[childNodesCounter1];

                checkRegularGeneralTreeDestroyedNodeChildrenIterator(childNode, subChildNodes);

                for (let subChildNodesCounter1 = 0; subChildNodesCounter1 < subChildNodes.length; subChildNodesCounter1++) {
                    const subChildNode = subChildNodes[subChildNodesCounter1];
                    const subSubChildNodes = subSubChildNodesStore[subChildNodesCounter1];

                    checkRegularGeneralTreeDestroyedNodeChildrenIterator(subChildNode, subSubChildNodes);
                }
            }
        });
    });
});

// exports

