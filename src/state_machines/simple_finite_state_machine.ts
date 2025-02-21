// external imports

// internal imports
import {
    SimpleStateDefinition,
    SimpleStateEntry,

    SimpleStateActions,
    SimpleStateTransition,
} from '../declarations/state_machines_declarations';
import AbstractFiniteStateMachine from './abstract_finite_state_machine';

import { isNil, isString } from '../utils/misc/logic_utils';

// implementation
class SimpleFiniteStateMachine<TransitionContextType = undefined, TransitionReturnType = undefined, TransitionTargetType = string>
    extends AbstractFiniteStateMachine<
        SimpleStateDefinition<TransitionContextType, TransitionReturnType, TransitionTargetType>,
        SimpleStateEntry<TransitionContextType, TransitionReturnType, TransitionTargetType>,
        SimpleStateActions<TransitionContextType>,
        SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>,
        TransitionContextType
    >{

    protected prepareEmptyStateData(): SimpleStateEntry<TransitionContextType, TransitionReturnType, TransitionTargetType> {
        return {
            actions: {},
            transitions: {}
        };
    }

    protected addEmptyStateIfNotExist(stateName: string): void {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add empty state - state name is not specified');
        }

        if (isNil(this.currentStateDefinition.states[stateName])) {
            this.currentStateDefinition.states[stateName] = this.prepareEmptyStateData();
        }
    }

    protected findTransitionDataForCurrentState(transitionName: string): SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType> | undefined {
        if (isNil(this.currentStateName)) {
            throw new RangeError('Cannot find state transition data - current state name is not set');
        }

        const currentState = this.currentStateDefinition.states[this.currentStateName];

        if (isNil(currentState)) {
            throw new RangeError('Cannot find state transition data - state data is not set');
        }

        if (isNil(currentState.transitions)) {
            throw new RangeError('Cannot find state transition data - state transitions is not specified for current state');
        }

        return currentState.transitions[transitionName];
    }

    protected async transitToNoActionState(transitionsData: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>): Promise<boolean> {
        if (!isString(transitionsData.target)) {
            throw new RangeError('Cannot dispatch state transition - "no action" transition target is not a string');
        }

        this.setCurrentStateName(transitionsData.target);
        return true;
    }

    protected async transitToState(transitionsData: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>): Promise<boolean> {
        try {
            await transitionsData.action(this.context);
            return true;
        } catch (error: unknown) {
            if (!isNil(this.unrecoverableErrorStateName)) {
                this.setCurrentStateName(this.unrecoverableErrorStateName);
                return false;
            } else {
                return false;
            }
        }
    }

    public addStateAction(stateName: string, actionsData: SimpleStateActions<TransitionContextType>): void {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add state actions - state name is not specified');
        }

        if (isNil(actionsData)) {
            throw new RangeError('Cannot add state actions - actions data is not specified');
        }

        this.addEmptyStateIfNotExist(stateName);
        this.currentStateDefinition.states[stateName].actions = actionsData;
    }

    public addStateActions(stateName: string, actionsData: SimpleStateActions<TransitionContextType>): void {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add state actions - state name is not specified');
        }

        if (isNil(actionsData)) {
            throw new RangeError('Cannot add state actions - actions data is not specified');
        }

        this.addEmptyStateIfNotExist(stateName);
        this.currentStateDefinition.states[stateName].actions = actionsData;
    }

    public addStateTransition(stateName: string, transitionName: string, transitionData: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>): void {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add state transition - state name is not specified');
        }

        if (isNil(transitionName)) {
            throw new RangeError('Cannot add state transition - transition name is not specified');
        }

        if (isNil(transitionData)) {
            throw new RangeError('Cannot add state transition - transition data is not specified');
        }

        this.addEmptyStateIfNotExist(stateName);
        this.currentStateDefinition.states[stateName].transitions[transitionName] = transitionData;
    }

    public async dispatch(transitionName: string): Promise<boolean> {
        if (isNil(transitionName)) {
            throw new RangeError('Cannot dispatch state transition - transition name is not specified');
        }

        const transitionsData: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType> | undefined  = this.findTransitionDataForCurrentState(transitionName);

        if (isNil(transitionsData)) {
            return false;
        }

        return isNil(transitionsData.action) ? this.transitToNoActionState(transitionsData) : this.transitToState(transitionsData);
    }
}

// exports
export default SimpleFiniteStateMachine;