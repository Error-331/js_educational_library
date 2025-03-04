// external imports

// internal imports
import { StagedStateDefinition } from '../../src/declarations/state_machines_declarations';
import { STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME } from '../../src/constants/state_machines_constants';

import StagedFiniteStateMachineBuilder from '../../src/state_machines/staged_finite_state_machine_builder';
import { checkInstance } from '../../src/utils/testing/state_machines/staged_finite_state_machine_test_utils';

import {
    testState1,
    testState2,
    testState3,
    testState4,
    testState5,
    testState6,

    testSubTransition1,
    testSubTransition2,
    testSubTransition3,

    initialState1,
    unrecoverableErrorState,
} from './common_finite_state_machine_test_data';

// implementation
describe('Staged finite state machine builder class tests...', () => {
    const initialStateDefinition1: StagedStateDefinition = {
        initialState: testState1,
        states: {}
    };

    const noActionStateDefinition1: StagedStateDefinition = {
        initialState: testState1,
        states: {
            [testState1]: {
                actions: {},
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState2
                    }
                }},


            [testState2]: {
                actions: {},
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState3
                    }
                }
            },

            [testState3]: {
                actions: {},
                transitions: {}
            }
        }
    };

    const noActionStateDefinition2: StagedStateDefinition = {
        initialState: testState1,
        states: {
            [testState1]: {
                actions: {},
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState2
                    }
                }},


            [testState2]: {
                actions: {},
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState3
                    }
                }
            },

            [testState3]: {
                actions: {},
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState4
                    }
                }
            },

            [testState4]: {
                actions: {},
                transitions: {}
            }
        }
    };

    describe('noAction() method tests...', () => {
        test('Should correctly compose state using "no action" transitions - case 1 (two transitions)...', () => {
            const builder = new StagedFiniteStateMachineBuilder(undefined, testState1);

            const stateMachine = builder
                .noAction(testState1, testState2)
                .noAction(testState2, testState3)
                .build();

            checkInstance(stateMachine, testState1, undefined, initialStateDefinition1, noActionStateDefinition1, undefined)
        });

        test('Should correctly compose state using "no action" transitions - case 2 (three transitions and "UnrecoverableError" state set)...', () => {
            const builder = new StagedFiniteStateMachineBuilder(undefined, testState1);

            const stateMachine = builder
                .noAction(testState1, testState2)
                .noAction(testState2, testState3)
                .noAction(testState3, testState4)
                .onUnrecoverableError(unrecoverableErrorState)
                .build();

            checkInstance(stateMachine, testState1, undefined, initialStateDefinition1, noActionStateDefinition2, unrecoverableErrorState)
        });
    });

});

// exports