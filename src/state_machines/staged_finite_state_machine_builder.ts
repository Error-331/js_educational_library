// external imports

// internal imports
import { isFunction, isNil } from '../utils/misc/logic_utils';

import {
    SimpleStateTransitionAction,
    StagedTransitionResult,
    StagedTransitionToStateArray,
} from '../declarations/state_machines_declarations';
import { STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME } from '../constants/state_machines_constants';

import StagedFiniteStateMachine from './staged_finite_state_machine';

// implementation
class StagedFiniteStateMachineBuilder<TransitionContextType = undefined> {
    protected stateMachine: StagedFiniteStateMachine<TransitionContextType>;
    protected conditionsStarted: boolean = false;

    protected currentStateName: string | undefined;
    protected currentStateAction: SimpleStateTransitionAction<TransitionContextType, StagedTransitionResult> | undefined;

    protected nextStateName: string | undefined;

    protected transitionConditionIndex: number = 0;
    protected transitionCondition: string | undefined;
    protected transitionConditionsToStates: StagedTransitionToStateArray = [];

    constructor(context: TransitionContextType, initialState: string) {
        this.stateMachine = new StagedFiniteStateMachine({ initialState, states: {} }, undefined, context);
    }

    protected resetStage(): void {
        this.conditionsStarted = false;

        this.currentStateName = undefined;
        this.currentStateAction = undefined;

        this.nextStateName = undefined;

        this.transitionConditionIndex = 0;
        this.transitionCondition = undefined;
        this.transitionConditionsToStates = [];
    }

    protected startStateConditions(stateName: string, action: SimpleStateTransitionAction<TransitionContextType, StagedTransitionResult>): void {
        if (isNil(stateName)) {
            throw new RangeError('Cannot init(start) state conditions - state name is not specified');
        }

        if (isNil(action)) {
            throw new RangeError('Cannot init(start) state conditions - action is not specified');
        }

        if (!isFunction(action)) {
            throw new RangeError('Cannot init(start) state conditions - action is not a function');
        }

        this.resetStage();

        this.conditionsStarted = true;
        this.currentStateName = stateName;
        this.currentStateAction = action;
    }

    protected endStateConditions(): void {
        if (!this.conditionsStarted) {
            this.resetStage();
            return;
        }

        if (isNil(this.currentStateName)) {
            throw new RangeError('Cannot finalize transition - current state name is not specified');
        }

        if (isNil(this.currentStateAction)) {
            throw new RangeError('Cannot finalize transition - current transition action is not specified');
        }

        let target: string | StagedTransitionToStateArray;

        if (this.transitionConditionsToStates.length === 0) {
            if (isNil(this.nextStateName)) {
                throw new RangeError('Cannot finalize transition - target state is not specified');
            }

            target = this.nextStateName;
        } else {
            target = this.transitionConditionsToStates.slice();
        }

        const currentStateAction = this.currentStateAction
        const action = async (context: TransitionContextType): Promise<StagedTransitionResult> => {
            return await currentStateAction(context);
        };

        this.stateMachine.addStateTransition(this.currentStateName, STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, {
            target,
            action,
        });

        this.resetStage();
    }

    public stage(stateName: string, action: SimpleStateTransitionAction<TransitionContextType, StagedTransitionResult>): StagedFiniteStateMachineBuilder<TransitionContextType> {
        if (isNil(stateName)) {
            throw new RangeError('Cannot initialize a stage - state name is not specified');
        }

        if (isNil(action)) {
            throw new RangeError('Cannot initialize a stage - action is not specified');
        }

        if (!isFunction(action)) {
            throw new RangeError('Cannot initialize a stage - action is not a function');
        }

        this.startStateConditions(stateName, action);
        return this;
    }

    public nextStage(stateName: string, action: SimpleStateTransitionAction<TransitionContextType, StagedTransitionResult>): StagedFiniteStateMachineBuilder<TransitionContextType> {
        if (isNil(stateName)) {
            throw new RangeError('Cannot initialize next stage - state name is not specified');
        }

        if (isNil(action)) {
            throw new RangeError('Cannot initialize next stage - action is not specified');
        }

        if (!isFunction(action)) {
            throw new RangeError('Cannot initialize next stage - action is not a function');
        }

        this.nextStateName = stateName;
        this.endStateConditions();

        this.startStateConditions(stateName, action);
        return this;
    }

    /**
     * Method that adds two empty states ('stateName' and 'nextStateName') and adds transition without action from first to second.
     *
     * @template TransitionContextType
     *
     * @param {string} stateName - first state, to this state transition data will be added making it possible to transit to 'nextStateName'
     * @param {string} nextStateName - second state, transition target state of the 'stateName'
     *
     * @throws {RangeError} if one of the provided arguments are not specified.
     *
     * @returns {StagedFiniteStateMachineBuilder<TransitionContextType>} current instance of the builder.
     */

    public noAction(stateName: string, nextStateName: string): StagedFiniteStateMachineBuilder<TransitionContextType> {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add "noAction" stage - state name is not specified');
        }

        if (isNil(nextStateName)) {
            throw new RangeError('Cannot add "noAction" stage - next state name is not specified');
        }

        this.endStateConditions();
        this.stateMachine.addStateTransition(stateName, STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME, {
            target: nextStateName,
        });

        this.stateMachine.addEmptyStateIfNotExist(nextStateName);
        return this;
    }

    public finalStage(stateName: string): StagedFiniteStateMachineBuilder<TransitionContextType> {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add final stage - state name is not specified');
        }

        this.stateMachine.addEmptyState(stateName);
        return this;
    }

    public when(TransitionCondition: string): StagedFiniteStateMachineBuilder<TransitionContextType> {
        if (isNil(TransitionCondition)) {
            throw new RangeError('Cannot add stage condition - Transition condition is not specified');
        }

        if (isNil(this.transitionConditionsToStates[this.transitionConditionIndex])) {
            this.transitionCondition = TransitionCondition;
        }

        return this;
    }

    public thenNextStage(stateName: string): StagedFiniteStateMachineBuilder<TransitionContextType> {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add stage transition - sate name is not specified');
        }

        if (isNil(this.transitionCondition)) {
            throw new RangeError('Cannot add stage transition - stage condition was not set');
        }

        this.transitionConditionsToStates[this.transitionConditionIndex] = [this.transitionCondition, stateName];
        this.transitionConditionIndex += 1;
        this.transitionCondition = undefined;

        return this;
    }

    public endConditions(): StagedFiniteStateMachineBuilder<TransitionContextType> {
        this.endStateConditions();
        return this;
    }

    public onUnrecoverableError(stateName: string): StagedFiniteStateMachineBuilder<TransitionContextType> {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add transition to "unrecoverable error" state - sate name is not specified');
        }

        this.stateMachine.unrecoverableErrorStateName = stateName;
        return this;
    }

    public build(): StagedFiniteStateMachine<TransitionContextType> {
        this.endConditions();
        return this.stateMachine;
    };
}

// exports
export default StagedFiniteStateMachineBuilder;