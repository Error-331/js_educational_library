// external imports

// internal imports
import { GenericObject } from '../collection_declarations';

// implementation
type UIFormValue =  string | number | boolean | File | undefined | null | unknown;
type UIFormValues = {
    [key: string]: UIFormValue;
}

type UIFormErrorData = GenericObject<string | string[]>;

// exports
export {
    UIFormValue,
    UIFormValues,

    UIFormErrorData,
}