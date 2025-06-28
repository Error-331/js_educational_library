// external imports

// internal imports
import { UIFormErrorData } from '../../declarations/ui/form_utility_declarations';
import { ZodIssueWithInputData } from '../../declarations/validation_declarations';
import { DeserializedError } from '../../declarations/error/general_error_declarations';

import { joinValidationErrorIssues } from '../misc/error_utils';
import { isNil, isString, isArray } from '../misc/logic_utils';

// implementation
function transformZodIssuesToFormErrorData(issues: ZodIssueWithInputData[]): UIFormErrorData {
    return issues.reduce((errorData: UIFormErrorData,  issue: ZodIssueWithInputData) => {
        const inputName = issue.path[0];

        if (!isNil(errorData[inputName])) {
            if (isString(errorData[inputName])) {
                errorData[inputName] = [errorData[inputName], issue.message];
            } else {
                errorData[inputName].push(issue.message);
            }

        } else {
            errorData[inputName] = issue.message;
        }


        return errorData;
    }, {})
}

function prepareFormInputErrorData(errors: DeserializedError |  DeserializedError[] | void[]): UIFormErrorData {
    if (!isArray(errors)) {
        errors = [ errors ];
    }

    if (errors[0] === undefined) {
        return {};
    }

    const zodIssues = joinValidationErrorIssues(errors);
    return transformZodIssuesToFormErrorData(zodIssues);
}

// exports
export {
    transformZodIssuesToFormErrorData,
    prepareFormInputErrorData,
}