// external imports

// internal imports

// implementation

// abstract state declarations
interface AbstractStateEntry {
    [key: string]: unknown;
}

interface AbstractStateDefinition<StateEntryType extends AbstractStateEntry> {
    initialState?: unknown;
    states: {
        [key: string]: StateEntryType;
    }
}

// base state declarations
interface BaseStateTransition<TransitionTargetType, TransitionActionType> {
    target: TransitionTargetType,
    action?: TransitionActionType,
}

// simple state declarations
type SimpleStateTransitionAction<TransitionContextType = undefined, TransitionReturnType = unknown> = (context?: TransitionContextType) => Promise<TransitionReturnType>;

interface SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType = string>
    extends BaseStateTransition<TransitionTargetType, SimpleStateTransitionAction<TransitionContextType, TransitionReturnType>> {}

interface SimpleStateActions<TransitionContextType> {
    onEnter?: (context?: TransitionContextType) => Promise<void>,
    onExit?: (context?: TransitionContextType) => Promise<void>,
}

interface SimpleStateTransitions<TransitionContextType, TransitionReturnType, TransitionTargetType = string> {
    [key: string]: SimpleStateTransition<TransitionContextType, TransitionReturnType, TransitionTargetType>,
}

interface SimpleStateEntry<TransitionContextType, TransitionReturnType, TransitionTargetType = string> extends AbstractStateEntry {
    actions?: SimpleStateActions<TransitionContextType>,
    transitions?: SimpleStateTransitions<TransitionContextType, TransitionReturnType, TransitionTargetType>
}

interface SimpleStateDefinition<TransitionContextType = undefined, TransitionReturnType = undefined, TransitionTargetType = string>
    extends AbstractStateDefinition<SimpleStateEntry<TransitionContextType, TransitionReturnType, TransitionTargetType>>
{
    initialState?: string;
}

// stage state declarations
type StagedTransitionToState = [string, string];
type StagedTransitionToStateArray = Array<StagedTransitionToState>;
type StagedTransitionResult = boolean | string | undefined;
type StagedTransitionTarget = string | StagedTransitionToStateArray;

interface StagedStateDefinition<TransitionContextType = undefined, TransitionReturnType = StagedTransitionResult>
    extends SimpleStateDefinition<TransitionContextType, TransitionReturnType, StagedTransitionTarget>
{

}

// exports
export type {
    AbstractStateEntry,
    AbstractStateDefinition,

    BaseStateTransition,

    SimpleStateTransitionAction,
    SimpleStateTransition,

    SimpleStateActions,
    SimpleStateTransitions,
    SimpleStateEntry,
    SimpleStateDefinition,

    StagedTransitionToState,
    StagedTransitionToStateArray,
    StagedTransitionResult,
    StagedTransitionTarget,

    StagedStateDefinition,
}