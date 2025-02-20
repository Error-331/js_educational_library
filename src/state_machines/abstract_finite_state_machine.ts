// external imports

// internal imports
import { AbstractStateEntry, AbstractStateDefinition } from '../declarations/state_machines_declarations';

import { isNil } from '../utils/misc/logic_utils';
import { cloneDeep } from '../utils/primitives/object_utils';

// implementation
abstract class AbstractFiniteStateMachine<
    StateDefinitionType extends AbstractStateDefinition<StateEntryType>,
    StateEntryType extends AbstractStateEntry,
    StateActions,
    StateTransition,
    TransitionContextType = undefined
> {
    protected currentStateName: string;
    protected context: TransitionContextType | undefined;

    protected initialStateDefinition: StateDefinitionType;
    protected currentStateDefinition: StateDefinitionType;

    protected unrecoverableErrorStateName: string;

    constructor(stateDefinition: StateDefinitionType, context?: TransitionContextType) {
        this.context = context

        this.initialStateDefinition = cloneDeep(stateDefinition);
        this.currentStateDefinition = cloneDeep(stateDefinition);
    }

    protected abstract prepareEmptyStateData(): StateEntryType;
    protected abstract addEmptyStateIfNotExist(stateName: string): void;

    protected setCurrentStateName(stateName: string): void {
        this.currentStateName = stateName;
    }

    public addEmptyState(stateName: string): void {
        if (isNil(stateName)) {
            throw new RangeError('Cannot add empty state - state name is not specified');
        }

        this.addEmptyStateIfNotExist(stateName);
    }

    protected abstract findTransitionDataForCurrentState(transitionName: string): StateTransition;

    public abstract addStateActions(stateName: string, actionsData: StateActions): void;
    public abstract addStateTransition(stateName: string, transitionName: string, transitionData: StateTransition): void;

    public getInitialStateDefinition(): StateDefinitionType {
        return cloneDeep(this.initialStateDefinition);
    }

    public getCurrentStateDefinition(): StateDefinitionType {
        return cloneDeep(this.currentStateDefinition);
    }

    public setUnrecoverableErrorStateName(stateName: string) {
        if (isNil(stateName)) {
            throw new RangeError('Cannot set unrecoverable error state name - state name is not specified');
        }

        this.unrecoverableErrorStateName = stateName;
    }

    public abstract dispatch(transitionName: string): Promise<boolean>;
}

// exports
export default AbstractFiniteStateMachine;