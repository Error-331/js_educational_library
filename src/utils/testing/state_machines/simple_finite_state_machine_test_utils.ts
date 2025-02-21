// external imports

// internal imports

// implementation
import { SimpleStateDefinition } from '../../../declarations/state_machines_declarations';
import SimpleFiniteStateMachine from '../../../state_machines/simple_finite_state_machine';

function checkSimpleFiniteStateMachineInstance(
    stateMachine: SimpleFiniteStateMachine,
    currentStateName: string | undefined,
    context: unknown,
    initialStateDefinition: SimpleStateDefinition | undefined,
    currentStateDefinition: SimpleStateDefinition | undefined,
    unrecoverableErrorStateName: string | undefined
) {
    expect(stateMachine.currentStateName).toBe(currentStateName);
    expect(stateMachine.context).toEqual(context);

    expect(stateMachine.initialStateDefinition).toEqual(initialStateDefinition);
    expect(stateMachine.currentStateDefinition).toEqual(currentStateDefinition);

    expect(stateMachine.unrecoverableErrorStateName).toEqual(unrecoverableErrorStateName);
}

// exports
export {
    checkSimpleFiniteStateMachineInstance,
}