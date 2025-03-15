// external imports
import { ZodIssueCode, ZodParsedType } from 'zod';

// internal imports
import { ZodIssueWithInputData } from '../../src/declarations/validation_declarations';

// implementation
const testErrorMessage1 = 'Test error message 1';

const testErrorInput1 = 'testInput1';

const testZodInvalidTypeIssue1: ZodIssueWithInputData = {
    fatal: true,
    message: 'Invalid data type',

    code: ZodIssueCode.invalid_type,
    expected: ZodParsedType.string,
    received: ZodParsedType.number,

    path: ['/form1/input1'],
};

const testZodInvalidTypeIssue2: ZodIssueWithInputData = {
    fatal: false,
    message: 'Invalid data type',

    code: ZodIssueCode.invalid_type,
    expected: ZodParsedType.number,
    received: ZodParsedType.string,

    path: ['/form1/testInput2'],
};

const testZodIssues1: ZodIssueWithInputData[] = [
    testZodInvalidTypeIssue1,
    testZodInvalidTypeIssue2
];

// exports
export {
    testErrorMessage1,
    testErrorInput1,

    testZodInvalidTypeIssue1,
    testZodInvalidTypeIssue2,

    testZodIssues1,
}