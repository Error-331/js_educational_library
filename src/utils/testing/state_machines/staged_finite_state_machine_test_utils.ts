// external imports
import type { Mock, MockContext } from 'jest/index';

// internal imports

// implementation
import { StagedStateDefinition } from '../../../declarations/state_machines_declarations';
import StagedFiniteStateMachine from '../../../state_machines/staged_finite_state_machine';

function mockTransitionActionInStateDefinition(
    stateDefinition: StagedStateDefinition<unknown, unknown>,
    stateName: string,
    transitionName: string,
): Mock<unknown> {
    const mockTransitionAction = jest.fn(stateDefinition.states[stateName].transitions[transitionName].action);
    stateDefinition.states[stateName].transitions[transitionName].action = mockTransitionAction;

    return mockTransitionAction;
}

function checkInstance(
    stateMachine: StagedFiniteStateMachine,
    currentStateName: string | undefined,
    context: unknown,
    initialStateDefinition: StagedStateDefinition | undefined,
    currentStateDefinition: StagedStateDefinition | undefined,
    unrecoverableErrorStateName: string | undefined
): void {
    expect(stateMachine.currentStateName).toBe(currentStateName);
    expect(stateMachine.context).toEqual(context);

    expect(stateMachine.initialStateDefinition).toEqual(initialStateDefinition);
    expect(stateMachine.currentStateDefinition).toEqual(currentStateDefinition);

    expect(stateMachine.unrecoverableErrorStateName).toEqual(unrecoverableErrorStateName);
}

async function checkTransitionActionMock(
    actionMock: MockContext<Promise<unknown>>,
    context: unknown = undefined,
    data: unknown = undefined,
    expectedActionResult: unknown = undefined,
    callCount = 1
): Promise<void> {
    expect(actionMock.calls).toHaveLength(callCount);
    expect(actionMock.calls[0][0]).toBe(context);
    expect(actionMock.calls[0][1]).toBe(data);

    const actionResult = await actionMock.results[0].value;
    expect(actionResult).toEqual(expectedActionResult);
}

// exports
export {
    mockTransitionActionInStateDefinition,

    checkInstance,
    checkTransitionActionMock,
}