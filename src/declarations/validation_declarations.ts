// external imports
import { ZodIssue } from 'zod';

// internal imports

// implementation
type ZodIssueWithInputData = ZodIssue & {
    inputName?: string;
}

// exports
export type {
    ZodIssueWithInputData,
}