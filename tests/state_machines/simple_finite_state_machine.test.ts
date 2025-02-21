// external imports

// internal imports
import { SimpleStateDefinition } from '../../src/declarations/state_machines_declarations';
import SimpleFiniteStateMachine from '../../src/state_machines/simple_finite_state_machine';

import { checkSimpleFiniteStateMachineInstance } from '../../src/utils/testing/state_machines/simple_finite_state_machine_test_utils';

// implementation
describe('Simple finite state machine class tests...', () => {
    const stateDefinition1: SimpleStateDefinition = {
        states: {
            'state1': {

            },

            'state2': {
                actions: {
                    onEnter: async () => {},
                }
            },

            'state3': {
                actions: {
                    onExit: async () => {},
                }
            },

            'state4': {
                actions: {
                    onEnter: async () => {},
                    onExit: async () => {}
                }
            },

            'state5': {
                transitions: {

                }
            },

            'state6': {
                actions: {

                },

                transitions: {

                }
            }
        }
    };

    describe('Instance creation tests...', () => {
        test('Should create an instance of simple finite state machine - case 1', () => {
            const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
            checkSimpleFiniteStateMachineInstance(stateMachine, undefined, undefined, stateDefinition1, stateDefinition1, undefined);
        });
    });

    describe('Instance creation tests...', () => {

    });

    describe('addStateAction() method tests...', () => {

    });
});

// exports