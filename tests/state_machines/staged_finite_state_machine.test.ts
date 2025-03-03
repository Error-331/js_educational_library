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

    testSubTransition1,
    testSubTransition2,
    testSubTransition3,

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
    const transitionActionTestParam1 = 1;
    const transitionActionTestParam2 = 2;
    const transitionActionTestParam3 = 'a';
    const transitionActionTestParam4 = 'b';
    const transitionActionTestParam5 = () => transitionActionResult1;
    const transitionActionTestParam6 = testSubTransition3;

    const transitionActionResult1 = testSubTransition1;
    const transitionActionResult2 = testSubTransition2;
    const transitionActionResult3 = testSubTransition3;

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
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: { target: testState2 },
                }
            },

            [testState6]: {
                actions: {},

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

    const canonicalStateDefinition3: StagedStateDefinition = {
        initialState: initialState1,

        states: {
            [testState1]: {
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: [
                            [testSubTransition1, testState2],
                            [testSubTransition2, testState4],
                        ],

                        action: async (context: undefined, data: number): Promise<string> => {
                            if (data === transitionActionTestParam1) {
                                return testSubTransition1;
                            } else if (data === transitionActionTestParam2) {
                                return testSubTransition2;
                            } else {
                                throw new Error('Unexpected data value');
                            }
                        }
                    },
                }
            },

            [testState2]: {
                actions: {},

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: [
                            [testSubTransition1, testState3],
                            [testSubTransition2, testState4],
                            [testSubTransition3, testState6],
                        ],

                        action: async (context: undefined, data: number | string): Promise<string> => {
                            if (data === transitionActionTestParam1) {
                                return testSubTransition1;
                            } else if (data === transitionActionTestParam2) {
                                return testSubTransition2;
                            } else if (data === transitionActionTestParam3) {
                                return testSubTransition3;
                            } else {
                                throw new Error('Unexpected data value');
                            }
                        }
                    }
                }
            },

            [testState3]: {
                actions: {},

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: [
                            [testSubTransition1, testState4],
                        ],

                        action: async (context: undefined, data: () => string): Promise<string> => {
                            return data();
                        }
                    }
                }
            },

            [testState4]: {
                actions: {},

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: [
                            [testSubTransition1, testState5],
                            [testSubTransition2, testState6],
                        ],

                        action: async (context: undefined, data: string): Promise<string> => {
                            if (data === transitionActionTestParam3) {
                                return testSubTransition1;
                            } else if (data === transitionActionTestParam4) {
                                return testSubTransition2;
                            } else {
                                throw new Error('Unexpected data value');
                            }
                        }
                    }
                }
            },

            [testState5]: {
                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: {
                        target: [
                            [testSubTransition1, testState3],
                            [testSubTransition2, testState4],
                            [testSubTransition3, testState1],
                        ],

                        action: async (context: undefined, data: string): Promise<string> => {
                            if (data === transitionActionTestParam3) {
                                return testSubTransition1;
                            } else if (data === transitionActionTestParam4) {
                                return testSubTransition2;
                            } else {
                                return data;
                            }
                        }
                    },
                }
            },

            [testState6]: {
                actions: {

                },

                transitions: {
                    [STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME]: { target: testState2 },
                }
            },

            [unrecoverableErrorState]: {}
        }
    };

    let stateDefinition1 = cloneDeep(canonicalStateDefinition1);
    let stateDefinition2 = cloneDeep(canonicalStateDefinition2);
    let stateDefinition3 = cloneDeep(canonicalStateDefinition3);

    afterEach(() => {
        stateDefinition1 = cloneDeep(canonicalStateDefinition1);
        stateDefinition2 = cloneDeep(canonicalStateDefinition2);
        stateDefinition3 = cloneDeep(canonicalStateDefinition3);
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

            test('Should dispatch a transition and transit to new state - case 2 (no action function on transition)', async () => {
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

        describe('Successful transition to new state(s) (actions which returns boolean, targets of type array)...', () => {

        });

        describe('Successful transition to new state(s) (actions which returns string, targets of type array)...', () => {
            test('Should dispatch a transition and transit to new state - case 1 (action which returns state to which transition should be made (no context))', async () => {
                const mockTransitionAction = mockTransitionActionInStateDefinition(stateDefinition3, initialState1);

                const stateMachine = new StagedFiniteStateMachine(stateDefinition3);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition3, stateDefinition3, undefined);

                const dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState2, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction.mock, undefined, transitionActionTestParam1, transitionActionResult1, 1);
            });

            test('Should dispatch a transition and transit to new state - case 2 (actions which returns state to which transition should be made (no context))', async () => {
                const mockTransitionAction1 = mockTransitionActionInStateDefinition(stateDefinition3, initialState1);
                const mockTransitionAction2 = mockTransitionActionInStateDefinition(stateDefinition3, testState4);

                const stateMachine = new StagedFiniteStateMachine(stateDefinition3);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition3, stateDefinition3, undefined);

                let dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction1.mock, undefined, transitionActionTestParam2, transitionActionResult2, 1);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam4);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState6, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction2.mock, undefined, transitionActionTestParam4, transitionActionResult2, 1);
            });

            test('Should dispatch a transition and transit to new state - case 3 (actions which returns state to which transition should be made (no context), multi-chain transition)', async () => {
                const mockTransitionAction1 = mockTransitionActionInStateDefinition(stateDefinition3, initialState1);
                const mockTransitionAction2 = mockTransitionActionInStateDefinition(stateDefinition3, testState2);
                const mockTransitionAction3 = mockTransitionActionInStateDefinition(stateDefinition3, testState3);
                const mockTransitionAction4 = mockTransitionActionInStateDefinition(stateDefinition3, testState4);
                const mockTransitionAction5 = mockTransitionActionInStateDefinition(stateDefinition3, testState5);

                const stateMachine = new StagedFiniteStateMachine(stateDefinition3);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition3, stateDefinition3, undefined);

                let dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState2, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction1.mock, undefined, transitionActionTestParam1, transitionActionResult1, 1);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState3, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction2.mock, undefined, transitionActionTestParam1, transitionActionResult1, 1);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam5);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction3.mock, undefined, transitionActionTestParam5, transitionActionResult1, 1);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam3);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction4.mock, undefined, transitionActionTestParam3, transitionActionResult1, 1);

                dispatchResult = await stateMachine.dispatch(STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, transitionActionTestParam6);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState1, undefined, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction5.mock, undefined, transitionActionTestParam6, transitionActionResult3, 1);
            });
        });
    });
});

// exports