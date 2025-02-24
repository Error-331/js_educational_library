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

    /**
     * Method that sets current state name of the state machine.
     * This method is usually called after successful transition was being made after call to dispatch() (@see dispatch).
     *
     * @param {string} stateName - new state name
     *
     * @throws {RangeError} 'stateName' is nil or is not string.
     *
     * @returns {void}
     *
     */

    protected setCurrentStateName(stateName: string): void {
        if (isNil(stateName)) {
            throw new RangeError('Cannot set state name - state name is not specified');
        }

        if (!isString(stateName)) {
            throw new RangeError('Cannot set state name - state name must be of type string');
        }

        this._currentStateName = stateName;
    }

    /**
     * Method that tries to find transition data for current state.
     * This method is usually called after inside the dispatch() (@see dispatch) when transition to new state is about to be made.
     *
     * @param {string} transitionName - transition name
     *
     * @throws {RangeError} if transition name is not string, current state name is not set, there is no such state in state definition, there is no transitions data for current state.
     *
     * @returns {SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType> | undefined} transition data or undefined if no transition data was found
     *
     */

    protected findTransitionDataForCurrentState(transitionName: string): SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType> | undefined {
        if (!isString(transitionName)) {
            throw new RangeError('Cannot find state transition data - transition name must be of type string');
        }

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

    /**
     * Method that transits state machine to new state when action function for the transition is not set.
     *
     * @param {SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>} transitionsData - object that contains all the necessary data to make a transition
     *
     * @throws {RangeError} 'target' property in 'transitionsData' argument is not string.
     *
     * @returns {boolean} Returns true if transition was successful.
     */

    protected transitToNoActionState(transitionsData: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>): boolean {
        if (!isString(transitionsData.target)) {
            throw new RangeError('Cannot dispatch state transition - "no action" transition target is not a string');
        }

        this.setCurrentStateName(transitionsData.target);
        return true;
    }

    protected async transitToState(
        transitionsData: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>,
        data?: unknown
    ): Promise<boolean> {
        if (!isString(transitionsData.target)) {
            throw new RangeError('Cannot dispatch state transition - transition target is not a string');
        }

       const c = await transitionsData.action(this.context, data);
        console.log('zz', c);
        this.setCurrentStateName(transitionsData.target);

        return true;
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

    public async dispatch(transitionName: string, data?: unknown): Promise<boolean> {
        if (isNil(transitionName)) {
            throw new RangeError('Cannot dispatch state transition - transition name is not specified');
        }

        const transitionsData: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType> | undefined  = this.findTransitionDataForCurrentState(transitionName);

        if (isNil(transitionsData)) {
            if (!isNil(this.unrecoverableErrorStateName)) {
                this.setCurrentStateName(this.unrecoverableErrorStateName);
            }

            return false;
        }

        try {
            return isNil(transitionsData.action) ? this.transitToNoActionState(transitionsData) : await this.transitToState(transitionsData, data);
        } catch (error: unknown) {
            if (!isNil(this.unrecoverableErrorStateName)) {
                this.setCurrentStateName(this.unrecoverableErrorStateName);
            }

            return false;
        }
    }
}

// exports
export default SimpleFiniteStateMachine;