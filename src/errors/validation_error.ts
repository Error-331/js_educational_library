// external imports

// internal imports
import { ZodIssueWithInputData } from '../declarations/validation_declarations';
import { SerializedValidationError } from '../declarations/error/serializable_error_declarations';

// implementation

/**
 * Class which represents a validation error.
 * Class encapsulates Zod issues found during validation of the data.
 *
 * @extends Error
 *
 */
class ValidationError extends Error {
    /**
     * Holds Zod issues.
     */
     protected _issues: ZodIssueWithInputData[];

    /**
     * Create a validation error.
     *
     * @param {string} message - error message (to maintain compatibility with Error class).
     * @param {ZodIssueWithInputData[]} issues - Zod issues found during validation of the data.
     */

    constructor(message: string, issues: ZodIssueWithInputData[]) {
        super(message);

        this.name = 'ValidationError';
        this._issues = issues;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serialize(): SerializedValidationError {
        return {
            name: this.name,
            message: this.message,
            issues: this.issues
        }
    }

    /**
     * Returns an array of Zod issues which are assigned to this error
     * @returns {ZodIssueWithInputData[]} array of Zod issues
     */
    get issues(): ZodIssueWithInputData[] {
        return this._issues;
    }
}

// exports
export default ValidationError;