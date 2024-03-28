'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import GeneralTreeClass from '../../../../../src/data_structures/tree/general_tree/general_tree_class.js';
import GeneralTreeNodePositionCalculatorClass from '../../../../../src/data_structures/tree/general_tree/visualization/general_tree_node_position_calculator_class.js';

// implementation
test('GeneralTreeNodePositionCalculatorClass tests...', async (t) => {
    const currentTree = new GenericTreeClass(null);

    const previewImageNode = currentTree.createNewRoot({ gIndex: 0, width: 10, x: 0, y: 0, text: 'preview_img', arrows: [1] });
    const helloNode = previewImageNode.addChild({ gIndex: 1, width: 10, x: 0, y: 0, text: 'hello', arrows: [2] });
    const menuWorkingHoursNode = helloNode.addChild({ gIndex: 2, width: 10, x: 0, y: 0, text: 'menu_working_hours', arrows: [3, 4, 5] });
    const agentHandoffNode = menuWorkingHoursNode.addChild({ gIndex: 3, width: 10, x: 0, y: 0, text: 'agent_handoff', arrows: [6] });
    const contactsNode = menuWorkingHoursNode.addChild({ gIndex: 4, width: 10, x: 0, y: 0, text: 'contacts', arrows: [2, 3, 5,]});
    const noAgentResolvedNode = menuWorkingHoursNode.addChild({ gIndex: 5, width: 10, x: 0, y: 0, text: 'no_agent_resolved', arrows: [7] });
    const handoffNode = agentHandoffNode.addChild({ gIndex: 6, width: 10, x: 0, y: 0, text: 'handoff' });
    const resolvedNode = noAgentResolvedNode.addChild({ gIndex: 7, width: 10, x: 0, y: 0, text: 'resolved' });

    const result1 = [
        { gIndex: 0, width: 10, x: 0, y: 0, text: 'preview_img', arrows: [ 1 ], modifier: 0, prelim: 410 },
        { gIndex: 1, width: 10, x: 0, y: 400, text: 'hello', arrows: [ 2 ], modifier: 0, prelim: 410 },
        { gIndex: 2, width: 10, x: 0, y: 800, text: 'menu_working_hours', arrows: [ 3, 4, 5 ], modifier: 0, prelim: 410 },
        { gIndex: 3, width: 10, x: -410, y: 1200, text: 'agent_handoff', arrows: [ 6 ], modifier: 0, prelim: 0 },
        { gIndex: 4, width: 10, x: 0, y: 1200, text: 'contacts', arrows: [ 2, 3, 5 ], modifier: 0, prelim: 410 },
        { gIndex: 5, width: 10, x: 410, y: 1200, text: 'no_agent_resolved', arrows: [ 7 ], modifier: 820, prelim: 820 },
        { gIndex: 6, width: 10, x: -410, y: 1600, text: 'handoff', modifier: 0, prelim: 0 },
        { gIndex: 7, width: 10, x: 410, y: 1600, text: 'resolved', modifier: 0, prelim: 0 }
    ];



    const positionCalculator = new GeneralTreeNodePositionCalculatorClass({
        levelSeparation: 400,
        siblingSeparation: 400,
    });

    positionCalculator.positionTree(currentTree.root);

    const result = [
        previewImageNode.data,
        helloNode.data,
        menuWorkingHoursNode.data,
        agentHandoffNode.data,
        contactsNode.data,
        noAgentResolvedNode.data,
        handoffNode.data,
        resolvedNode.data
    ]

    assert.deepStrictEqual(result, result1);

    console.log(previewImageNode.data);
    console.log(helloNode.data);
    console.log(menuWorkingHoursNode.data);
    console.log(agentHandoffNode.data);
    console.log(contactsNode.data);
    console.log(noAgentResolvedNode.data);
    console.log(handoffNode.data);
    console.log(resolvedNode.data);

});

// exports