// external imports

// internal imports
import {
    SimpleStateTransition,
    StagedTransitionResult,
    StagedTransitionTarget,

    StagedTransitionToState,
    StagedTransitionToStateArray,

} from '../declarations/state_machines_declarations';

import { STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME } from '../constants/state_machines_constants';
import SimpleFiniteStateMachine from './simple_finite_state_machine';

import { isNil, isString, isBoolean, isArray } from '../utils/misc/logic_utils';
import { every } from '../utils/primitives/array_utils';

// implementation
class StagedFiniteStateMachine<TransitionContextType = undefined,> extends
    SimpleFiniteStateMachine<TransitionContextType, StagedTransitionResult, StagedTransitionTarget>{

    protected isTargetStagedTransitionToState(input: unknown): input is StagedTransitionToState {
        return isArray(input) && input.length === 2 && isString(input[0]) && isString(input[1]);
    }

    protected isTargetStagedTransitionToStateArray(input: unknown): input is StagedTransitionToStateArray {
        if (!isArray<string>(input)) {
            return false;
        } else {
            return every<unknown>(input, target => this.isTargetStagedTransitionToState(target))
        }
    }

    /**
     * Method that checks incoming transition name.
     *
     * @param {unknown} transitionName - transition name
     *
     * @throws {RangeError} if transition name is nil, is not a string or is not equal to STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME
     *
     */
    protected checkTransitionName(transitionName: unknown): void {
        super.checkTransitionName(transitionName);

        if (transitionName !== STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME) {
            throw new RangeError(`Transition name must be equal to: "${STAGED_FINITE_STATE_MACHINE_TRANSITION_NAME}"`);
        }
    }

    protected transitionToStateByString(target: string, transitionActionResult: StagedTransitionResult): boolean {
        if (isBoolean(transitionActionResult) && transitionActionResult) {
            this.setCurrentStateName(target);
            return true;
        } else {
            return false;
        }
    }

    protected transitionToStateByArray(target: StagedTransitionToStateArray, transitionActionResult: StagedTransitionResult) {
        if (!isString(transitionActionResult)) {
            throw new RangeError('Cannot dispatch state transition - transition action result is not a string');
        }

        const transitionToState: StagedTransitionToState = target.find(
            (targetState: StagedTransitionToState) => targetState[0] === transitionActionResult
        );

        if (!isNil(transitionToState)) {
            this.setCurrentStateName(transitionToState[1]);
            return true;
        } else {
            return false;
        }
    }

    protected async transitToState(
        transitionsData: SimpleStateTransition<TransitionContextType, StagedTransitionResult, StagedTransitionTarget>,
        data?: unknown
    ): Promise<boolean> {
        if (!isString(transitionsData.target)) {
            throw new RangeError('Cannot dispatch state transition - transition target is not a string');
        }

        const transitionActionResult: StagedTransitionResult = await transitionsData.action(this.context, data);

        if (isString(transitionsData.target)) {
            return this.transitionToStateByString(transitionsData.target, transitionActionResult);
        } else if (this.isTargetStagedTransitionToStateArray(transitionsData.target)) {
            return this.transitionToStateByArray(transitionsData.target, transitionActionResult);
        } else {
            throw new RangeError('Cannot transition to stage - transition target must be of type string or of type StagedTransitionToStateArray');
        }
    }
}

// exports
export default StagedFiniteStateMachine;