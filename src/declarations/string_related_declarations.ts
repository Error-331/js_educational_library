// external imports

// internal imports
import { GenericFunctionWithLastArgKnown } from './function_declarations';

// implementation
type GeneralStringFormatterFunction = GenericFunctionWithLastArgKnown<string, string>;
type StringFormatterFunction = (strPart: string) => Promise<string>;

// exports
export {
    GeneralStringFormatterFunction,
    StringFormatterFunction,
}