// external imports

// internal imports
import { SimpleStateDefinition } from '../../src/declarations/state_machines_declarations';
import SimpleFiniteStateMachine from '../../src/state_machines/simple_finite_state_machine';

import {
    testContextType1,

    testState1,
    testState2,
    testState3,
    testState4,
    testState5,
    testState6,

    testTransition1,
    testTransition2,
    testTransition3,
    testTransition4,

    initialState1,
    unrecoverableErrorState,

    testContext1,
} from './common_finite_state_machine_test_data';

import {
    mockTransitionActionInStateDefinition,

    checkInstance,
    checkTransitionActionMock,
} from '../../src/utils/testing/state_machines/simple_finite_state_machine_test_utils';
import { cloneDeep } from '../../src/utils/primitives/object_utils';

// implementation
describe('Simple finite state machine class tests...', () => {
    const transitionActionTestParam1 = 4;
    const transitionActionTestParam2 = 'val1';
    const transitionActionTestParam3 = 5;
    const transitionActionTestParam4 = 10;
    const transitionActionTestParam5 = 'value';
    const transitionActionTestParam6 = 15;
    const transitionActionTestParam7 = 15;
    const transitionActionTestParam8 = 'string_val_1';
    const transitionActionTestParam9 = 20;
    const transitionActionTestParam10 = (val: number) => val + 10;

    const transitionActionResult1 = 9;
    const transitionActionResult2 = `test_${transitionActionTestParam2}`;
    const transitionActionResult3 = 10;
    const transitionActionResult4: null = null;
    const transitionActionResult5 = `prom_${transitionActionTestParam5}`;
    const transitionActionResult6 = { key1: 'test_val1', key2: transitionActionTestParam6 };
    const transitionActionResult7: null = null;
    const transitionActionResult8 = { key1: 15, key2: `${transitionActionTestParam8}0` };
    const transitionActionResult9 = transitionActionTestParam9 - 100;
    const transitionActionResult10 = 15;

    const canonicalStateDefinition1: SimpleStateDefinition = {
        initialState: initialState1,

        states: {
            [testState1]: {
                transitions: {
                    [testTransition1]: { target: testState4 },
                    [testTransition2]: { target: testState4 },
                    [testTransition3]: { target: testState5 },
                }
            },

            [testState2]: {
                actions: {},

                transitions: {
                    [testTransition1]: { target: testState6 }
                }
            },

            [testState3]: {
                actions: {}
            },

            [testState4]: {
                actions: {},

                transitions: {
                    [testTransition1]: { target: testState1 },
                    [testTransition2]: { target: testState5 }
                }
            },

            [testState5]: {
                transitions: {
                    [testTransition1]: { target: testState2 },
                    [testTransition2]: { target: testState1 }
                }
            },

            [testState6]: {
                actions: {

                },

                transitions: {
                    [testTransition1]: { target: testState2 },
                    [testTransition2]: { target: testState4 }
                }
            },

            [unrecoverableErrorState]: {}
        }
    };

    const canonicalStateDefinition2: SimpleStateDefinition<undefined, number | string | null | undefined | unknown> = {
        initialState: initialState1,

        states: {
            [testState1]: {
                transitions: {
                    [testTransition1]: {
                        target: testState4,
                        action: async (context: undefined, data: number): Promise<number> => { return data + 5; },
                    },

                    [testTransition2]: {
                        target: testState4,
                        action: async (context: undefined, data: string): Promise<string> => { return 'test_' + data; },
                    },

                    [testTransition3]: {
                        target: testState5,
                        action: async (context: undefined, data: string): Promise<string> => { return 'prom_' + data; },
                    },
                }
            },

            [testState2]: {
                actions: {},

                transitions: {
                    [testTransition1]: {
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
                    [testTransition1]: {
                        target: testState1,
                        action: async (context: undefined, data: string): Promise<null> => { return null; },
                    },

                    [testTransition2]: {
                        target: testState5,
                        action: async (context: undefined, data: number): Promise<number> => { return data - 100; },
                    }
                }
            },

            [testState5]: {
                transitions: {
                    [testTransition1]: {
                        target: testState2,
                        action: async (context: undefined, data: unknown): Promise<unknown> => { return { key1: 'test_val1', key2: data }; },
                    },

                    [testTransition2]: {
                        target: testState1,
                        action: async (context: undefined, data: (va: number) => number): Promise<unknown> => { return data(5); },
                    }
                }
            },

            [testState6]: {
                actions: {},
                transitions: {
                    [testTransition1]: {
                        target: testState2,
                    },

                    [testTransition2]: {
                        target: testState4,
                        action: async (context: undefined, data: unknown): Promise<unknown> => { return { key1: 15, key2: data + '0' }; },
                    }
                }
            },

            [unrecoverableErrorState]: {}
        }
    };

    const canonicalStateDefinition3: SimpleStateDefinition<undefined, number | string | null | undefined | unknown> = {
        initialState: initialState1,

        states: {
            [testState1]: {
                transitions: {
                    [testTransition1]: {
                        target: testState4,
                        action: async (context: testContextType1, data: number): Promise<number> => {
                                context.addParam1 = 5;

                                return data + 5;
                            },
                    },

                    [testTransition2]: {
                        target: testState4,
                        action: async (context: undefined, data: string): Promise<string> => { return 'test_' + data; },
                    },

                    [testTransition3]: {
                        target: testState5,
                        action: async (context: undefined, data: string): Promise<string> => { return 'prom_' + data; },
                    },
                }
            },

            [testState2]: {
                actions: {},

                transitions: {
                    [testTransition1]: {
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
                    [testTransition1]: {
                        target: testState1,
                        action: async (context: undefined, data: string): Promise<null> => { return null; },
                    },

                    [testTransition2]: {
                        target: testState5,
                        action: async (context: undefined, data: number): Promise<number> => { return data - 100; },
                    }
                }
            },

            [testState5]: {
                transitions: {
                    [testTransition1]: {
                        target: testState2,
                        action: async (context: undefined, data: unknown): Promise<unknown> => { return { key1: 'test_val1', key2: data }; },
                    },

                    [testTransition2]: {
                        target: testState1,
                        action: async (context: undefined, data: (va: number) => number): Promise<unknown> => { return data(5); },
                    }
                }
            },

            [testState6]: {
                actions: {},
                transitions: {
                    [testTransition1]: {
                        target: testState2,
                    },

                    [testTransition2]: {
                        target: testState4,
                        action: async (context: undefined, data: unknown): Promise<unknown> => { return { key1: 15, key2: data + '0' }; },
                    }
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
        test('Should create an instance of simple finite state machine - case 1', () => {
            const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
            checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);
        });

        test('Should create an instance of simple finite state machine - case 2', () => {
            const stateMachine = new SimpleFiniteStateMachine(stateDefinition2);
            checkInstance(stateMachine, initialState1, undefined, stateDefinition2, stateDefinition2, undefined);
        });
    });

    describe('addStateAction() method tests...', () => {

    });

    describe('dispatch() method tests...', () => {
        describe('Successful transition to new state(s) (no actions, no transition actions)...', () => {
            test('Should dispatch a transition and transit to new state - case 1 (no action function on transition)', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                const dispatchResult = await stateMachine.dispatch(testTransition1);

                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and transit to new state - case 2 (transition action called with not context and params)', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                const dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and transit to new state - case 3 (transition to new state - then return back)', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                let dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState1, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and transit to new state - case 4 (multi-chain transition)', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                let dispatchResult = await stateMachine.dispatch(testTransition3);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState2, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState6, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState1, undefined, stateDefinition1, stateDefinition1, undefined);
            });
        });

        describe('Successful transition to new state(s) (no actions, transition actions (no context))...', () => {
            test('Should dispatch a transition and transit to new state - case 1', async () => {
                const mockTransitionAction = mockTransitionActionInStateDefinition(stateDefinition2, initialState1, testTransition1);

                const stateMachine = new SimpleFiniteStateMachine(stateDefinition2);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition2, stateDefinition2, undefined);

                const dispatchResult = await stateMachine.dispatch(testTransition1, transitionActionTestParam1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction.mock, undefined, transitionActionTestParam1, transitionActionResult1, 1);
            });//

            test('Should dispatch a transition and transit to new state - case 2 (no actions, transition actions (no context))', async () => {
                const mockTransitionAction = mockTransitionActionInStateDefinition(stateDefinition2, initialState1, testTransition2);

                const stateMachine = new SimpleFiniteStateMachine(stateDefinition2);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition2, stateDefinition2, undefined);

                const dispatchResult = await stateMachine.dispatch(testTransition2, transitionActionTestParam2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction.mock, undefined, transitionActionTestParam2, transitionActionResult2, 1);
            });

            test('Should dispatch a transition and transit to new state - case 3 (transition to new state - then return back, transition actions (no context))', async () => {
                const mockTransitionAction1 = mockTransitionActionInStateDefinition(stateDefinition2, initialState1, testTransition1);
                const mockTransitionAction2 = mockTransitionActionInStateDefinition(stateDefinition2, testState4, testTransition1);

                const stateMachine = new SimpleFiniteStateMachine(stateDefinition2);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition2, stateDefinition2, undefined);

                let dispatchResult = await stateMachine.dispatch(testTransition1, transitionActionTestParam3);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction1.mock, undefined, transitionActionTestParam3, transitionActionResult3, 1);

                dispatchResult = await stateMachine.dispatch(testTransition1, transitionActionTestParam4);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState1, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction2.mock, undefined, 10, transitionActionResult4, 1);
            });

            test('Should dispatch a transition and transit to new state - case 4 (multi-chain transition, transition actions (no context)))', async () => {
                const mockTransitionAction1 = mockTransitionActionInStateDefinition(stateDefinition2, initialState1, testTransition3);
                const mockTransitionAction2 = mockTransitionActionInStateDefinition(stateDefinition2, testState5, testTransition1);
                const mockTransitionAction3 = mockTransitionActionInStateDefinition(stateDefinition2, testState2, testTransition1);
                const mockTransitionAction4 = mockTransitionActionInStateDefinition(stateDefinition2, testState6, testTransition2);
                const mockTransitionAction5 = mockTransitionActionInStateDefinition(stateDefinition2, testState4, testTransition2);
                const mockTransitionAction6 = mockTransitionActionInStateDefinition(stateDefinition2, testState5, testTransition2);

                const stateMachine = new SimpleFiniteStateMachine(stateDefinition2);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition2, stateDefinition2, undefined);

                let dispatchResult = await stateMachine.dispatch(testTransition3, transitionActionTestParam5);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction1.mock, undefined, transitionActionTestParam5, transitionActionResult5, 1);

                dispatchResult = await stateMachine.dispatch(testTransition1, transitionActionTestParam6);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState2, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction2.mock, undefined, transitionActionTestParam6, transitionActionResult6, 1);

                dispatchResult = await stateMachine.dispatch(testTransition1, transitionActionTestParam7);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState6, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction3.mock, undefined, transitionActionTestParam7, transitionActionResult7, 1);

                dispatchResult = await stateMachine.dispatch(testTransition2, transitionActionTestParam8);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction4.mock, undefined, transitionActionTestParam8, transitionActionResult8, 1);

                dispatchResult = await stateMachine.dispatch(testTransition2, transitionActionTestParam9);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction5.mock, undefined, transitionActionTestParam9, transitionActionResult9, 1);

                dispatchResult = await stateMachine.dispatch(testTransition2, transitionActionTestParam10);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState1, undefined, stateDefinition2, stateDefinition2, undefined);
                await checkTransitionActionMock(mockTransitionAction6.mock, undefined, transitionActionTestParam10, transitionActionResult10, 1);
            });
        });

        describe('Successful transition to new state(s) (no actions, transition actions (with context))...', () => {
            test('Should dispatch a transition and transit to new state - case 1', async () => {
                const mockTransitionAction = mockTransitionActionInStateDefinition(stateDefinition3, initialState1, testTransition1);

                const stateMachine = new SimpleFiniteStateMachine<testContextType1>(stateDefinition3, undefined, testContext1);
                checkInstance<testContextType1>(stateMachine, initialState1, testContext1, stateDefinition3, stateDefinition3, undefined);

                const dispatchResult = await stateMachine.dispatch(testTransition1, transitionActionTestParam1);
                const testContext1DerivedState1: testContextType1 = Object.assign({}, testContext1, { addParam1: 5 });

                expect(dispatchResult).toBe(true);
                checkInstance<testContextType1>(stateMachine, testState4, testContext1DerivedState1, stateDefinition3, stateDefinition3, undefined);
                await checkTransitionActionMock(mockTransitionAction.mock, testContext1, transitionActionTestParam1, transitionActionResult1, 1);
            });
        });

        describe('Unsuccessful transition to new state (no actions, no transition actions)...', () => {
            test('Should dispatch a transition and not transit to new state - case 1', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                const dispatchResult = await stateMachine.dispatch(testTransition4);

                expect(dispatchResult).toBe(false);
                checkInstance(stateMachine, testState1, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and not transit to new state - case 2', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                let dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition3);
                expect(dispatchResult).toBe(false);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and not transit to new state - case 3', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, undefined);

                let dispatchResult = await stateMachine.dispatch(testTransition3);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState2, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState6, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, undefined);

                dispatchResult = await stateMachine.dispatch(testTransition3);
                expect(dispatchResult).toBe(false);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, undefined);
            });

            test('Should dispatch a transition and transit to unrecoverable error state - case 1', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1, unrecoverableErrorState);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                const dispatchResult = await stateMachine.dispatch(testTransition4);

                expect(dispatchResult).toBe(false);
                checkInstance(stateMachine, unrecoverableErrorState, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);
            });

            test('Should dispatch a transition and transit to unrecoverable error state - case 2', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1, unrecoverableErrorState);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                let dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                dispatchResult = await stateMachine.dispatch(testTransition3);
                expect(dispatchResult).toBe(false);
                checkInstance(stateMachine, unrecoverableErrorState, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);
            });

            test('Should dispatch a transition and transit to unrecoverable error state - case 3', async () => {
                const stateMachine = new SimpleFiniteStateMachine(stateDefinition1, unrecoverableErrorState);
                checkInstance(stateMachine, initialState1, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                let dispatchResult = await stateMachine.dispatch(testTransition3);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState2, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                dispatchResult = await stateMachine.dispatch(testTransition1);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState6, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState4, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                dispatchResult = await stateMachine.dispatch(testTransition2);
                expect(dispatchResult).toBe(true);
                checkInstance(stateMachine, testState5, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);

                dispatchResult = await stateMachine.dispatch(testTransition3);
                expect(dispatchResult).toBe(false);
                checkInstance(stateMachine, unrecoverableErrorState, undefined, stateDefinition1, stateDefinition1, unrecoverableErrorState);
            });
        });

        describe('Unsuccessful transition to new state (no actions, transition actions (no context))...', () => {

        });
    });
});

// exports