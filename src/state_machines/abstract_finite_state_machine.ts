// external imports

// internal imports
import { AbstractStateEntry, AbstractStateDefinition } from '../declarations/state_machines_declarations';

import { isNil, isString } from '../utils/misc/logic_utils';
import { cloneDeep } from '../utils/primitives/object_utils';

// implementation
abstract class AbstractFiniteStateMachine<
    StateDefinitionType extends AbstractStateDefinition<StateEntryType>,
    StateEntryType extends AbstractStateEntry,
    StateActions,
    StateTransition,
    TransitionContextType = undefined
> {
    protected _currentStateName: string | undefined;
    protected _context: TransitionContextType | undefined;

    protected _initialStateDefinition: StateDefinitionType;
    protected _currentStateDefinition: StateDefinitionType;

    protected _unrecoverableErrorStateName: string | undefined;

    constructor(stateDefinition: StateDefinitionType, context?: TransitionContextType, unrecoverableErrorStateName?: string) {
        this._initialStateDefinition = cloneDeep(stateDefinition);
        this._currentStateDefinition = cloneDeep(stateDefinition);

        this._context = context

        if (!isNil(this._initialStateDefinition.initialState) && isString(this._initialStateDefinition.initialState)) {
            this._currentStateName = this._initialStateDefinition.initialState;
        }

        if (!isNil(unrecoverableErrorStateName)) {
            if (isString(unrecoverableErrorStateName)) {
                this._unrecoverableErrorStateName = unrecoverableErrorStateName;
            } else {
                throw new RangeError('Cannot create finite state machine instance - "unrecoverableErrorStateName" must be of type string');
            }
        }
    }

    protected abstract prepareEmptyStateData(): StateEntryType;
    protected abstract addEmptyStateIfNotExist(stateName: string): void;

    protected setCurrentStateName(stateName: string): void {
        this._currentStateName = stateName;
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

    public get currentStateName(): string | undefined {
        return this._currentStateName;
    }

    public get context(): TransitionContextType | undefined {
        return this._context;
    }

    public get initialStateDefinition(): StateDefinitionType {
        return cloneDeep(this._initialStateDefinition);
    }

    public get currentStateDefinition(): StateDefinitionType {
        return cloneDeep(this._currentStateDefinition);
    }

    public get unrecoverableErrorStateName(): string | undefined {
        return this._unrecoverableErrorStateName;
    }

    public set unrecoverableErrorStateName(stateName: string) {
        if (isNil(stateName)) {
            throw new RangeError('Cannot set unrecoverable error state name - state name is not specified');
        }

        this._unrecoverableErrorStateName = stateName;
    }

    public abstract dispatch(transitionName: string): Promise<boolean>;
}

// exports
export default AbstractFiniteStateMachine;