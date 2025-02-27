// external imports

// internal imports
import { StagedStateDefinition } from '../../src/declarations/state_machines_declarations';
import StagedFiniteStateMachine from '../../src/state_machines/staged_finite_state_machine';

import {
    testState1,
    testState2,
    testState3,
    testState4,
    testState5,
    testState6,

    initialState1,
    unrecoverableErrorState,
} from './common_finite_state_machine_test_data';

import { STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME } from '../../src/constants/state_machines_constants';

import {
    mockTransitionActionInStateDefinition,

    checkInstance,
    checkTransitionActionMock,
} from '../../src/utils/testing/state_machines/staged_finite_state_machine_test_utils';
import { cloneDeep } from '../../src/utils/primitives/object_utils';

// implementation
describe('Staged finite state machine class tests...', () => {

    const canonicalStateDefinition1: StagedStateDefinition = {
        initialState: initialState1,

        states: {
            [testState1]: {
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: { target: testState4 },
                }
            },

            [testState2]: {
                actions: {},

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: { target: testState6 }
                }
            },

            [testState3]: {
                actions: {}
            },

            [testState4]: {
                actions: {},

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: { target: testState5 }
                }
            },

            [testState5]: {
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState2,
                        action: async (context: undefined, data: string): Promise<boolean> => { return true; }
                    },
                }
            },

            [testState6]: {
                actions: {

                },

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState2,
                        action: async (context: undefined, data: number): Promise<boolean> => { return false; }
                    },
                }
            },

            [unrecoverableErrorState]: {}
        }
    };

    const canonicalStateDefinition2: StagedStateDefinition<undefined, number | string | null | undefined | unknown> = {
        initialState: initialState1,

        states: {
            [testState1]: {
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState4,
                        action: async (context: undefined, data: number): Promise<number> => { return data + 5; },
                    },
                }
            },

            [testState2]: {
                actions: {},

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState6,
                        action: async (context: undefined, data: unknown): Promise<null> => { return null; },
                    }
                }
            },

            [testState3]: {
                actions: {}
            },

            [testState4]: {
                actions: {},

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState1,
                        action: async (context: undefined, data: string): Promise<null> => { return null; },
                    },
                }
            },

            [testState5]: {
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState2,
                        action: async (context: undefined, data: unknown): Promise<unknown> => { return { key1: 'test_val1', key2: data }; },
                    },
                }
            },

            [testState6]: {
                actions: {},
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: testState2,
                    },
                }
            },

            [unrecoverableErrorState]: {}
        }
    };

    let stateDefinition1 = cloneDeep(canonicalStateDefinition1);
    let stateDefinition2 = cloneDeep(canonicalStateDefinition2);

    afterEach(() => {
        stateDefinition1 = cloneDeep(canonicalStateDefinition1);
        stateDefinition2 = cloneDeep(canonicalStateDefinition2);
    });

    describe('Instance creation tests...', () => {
        test('Should create an instance of staged finite state machine - case 1', () => {
            const stateMachine = new StagedFiniteStateMachine(stateDefinition1);
            checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);
        });

        test('Should create an instance of staged finite state machine - case 2', () => {
            const stateMachine = new StagedFiniteStateMachine(stateDefinition2);
            checkInstance(stateMachine, initialState1, undefined, stateDefinition2, stateDefinition2, undefined);
        });
    });

    describe('dispatch() method tests...', () => {
        describe('Successful transition to new state(s) (no actions, targets of type string)...', () => {
            test('Should dispatch a transition and transit to new state - case 1 (no action function on transition)', async () => {
                const stateMachine = new StagedFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                const dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);

                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and transit to new state - case 2 (transition to new state via action functions)', async () => {
                const stateMachine = new StagedFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                let dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and transit to new state - case 3 (multi-chain transition)', async () => {
                const stateMachine = new StagedFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                let dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState2, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState6, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME);
                expect(dispatchResult).toBe(false);
                checkInstance(stateMachine, testState6, undefined, stateDefinition1, stateDefinition1, undefined);
            });
        });

        describe('Successful transition to new state(s) (no actions, targets of type array)...', () => {

        });
    });
});

// exports