// external imports

// internal imports
import {
    GenericFunctionType,
    RequiredFirstParameters,
    CurriedFunction,

    LastElementOfUnknownArgsFunctionsList,
    ListOfUnknownArgsFunctionsWithLastReturnType,
} from '../../declarations/function_declarations';

import { isNil } from './logic_utils';
import { extractPropValueByPath, setPropValueByPath } from '../primitives/object_utils';

// implementation

/**
 * Function that curries provided function and optionally sets provided parameters to new curried function.
 * This function gives possibility to delay the call of the provided function and call it only when all required parameters are being provided.
 *
 * @template FunctionType
 *
 * @param {FunctionType} func - function to be curried
 * @param {...any} [args] - parameters for curried function
 *
 * @returns {CurriedFunction<FunctionType>} new curried function with set (optional) parameters set
 *
 */

const curry =
    <FunctionType extends GenericFunctionType>(
        func: FunctionType,
        ...args: Partial<Parameters<FunctionType>>
    ): CurriedFunction<FunctionType> => {
        const curriedFunc = (...nextArgs: RequiredFirstParameters<FunctionType>) => {
            const allArgs = [...args, ...nextArgs];

            if (allArgs.length >= func.length) {
                return func(...args, ...nextArgs);
            } else {
                return curry(func, ...(allArgs as Parameters<FunctionType>));
            }
        }

        Object.defineProperty(curriedFunc, 'name', {
            value: `curried${func.name}`,
            writable: false,
        });

        return curriedFunc;
}

/**
 * Function that returns a new function which if will be called with nil parameter will instead return "default" value which was provided by the argument.
 *
 * @template FunctionType
 *
 * @param {unknown} defaultValue - default parameter
 *
 * @returns {CurriedFunction<FunctionType>} curried function which takes one argument which will be returned if this argument is not nil and "defaultValue" if vice versa
 *
 */
const defaultTo = <FunctionType extends GenericFunctionType>(defaultValue: unknown) => curry<FunctionType>((defaultValue, testValue) => isNil(testValue) ? defaultValue : testValue)(defaultValue);


/**
 * Function that returns a new function which if will be called with nil parameter will instead return null.
 *
 * @template FunctionType
 *
 * @returns {CurriedFunction<FunctionType>} curried function which takes one argument which will be returned if this argument is not nil and null if vice versa
 *
 */
const defaultToNull = <FunctionType extends GenericFunctionType>(testValue: unknown) => defaultTo<FunctionType>(null)(testValue);

/**
 * Function that accepts a list of functions (which will be chained) and return a new function which will execute those functions one by one passing the result of execution along the chain.
 *
 * @param {FunctionsListType} chainFunctions - list of functions which will be chained.
 *
 * @template LastFunctionReturnType
 * @template FunctionsListType
 *
 * @returns {(...args: unknown[]): Promise<Awaited<ReturnType<LastElementOfUnknownArgsFunctionsList<FunctionsListType>>>>} function which executes the chain of functions (args will be passed to the first function in the chain).
 *
 */
function chain<
    LastFunctionReturnType = unknown,
    FunctionsListType extends ListOfUnknownArgsFunctionsWithLastReturnType<LastFunctionReturnType> = ListOfUnknownArgsFunctionsWithLastReturnType<LastFunctionReturnType>>
    (...chainFunctions: FunctionsListType) {
    return async (...args: unknown[]): Promise<Awaited<ReturnType<LastElementOfUnknownArgsFunctionsList<FunctionsListType>>>> => {
        if (chainFunctions.length === 1) {
            return await chainFunctions[chainFunctions.length - 1](...args);
        }

        let res: unknown = await chainFunctions[0](...args);

        for (let funcIdx = 1; funcIdx < chainFunctions.length - 1; funcIdx++) {
            res = await chainFunctions[funcIdx](res);
        }

        return await chainFunctions[chainFunctions.length - 1](res);
    };
}

const lens = (getter, setter) => {
    return ({
        get: obj => getter(obj),
        set: (val, obj) => setter(val, obj),
    })
};

const lensPath = (path = []) => {
    return ({
        get: obj => extractPropValueByPath(obj, path),
        set: (val, obj) => setPropValueByPath(path, val, obj),
    })
};

const view = (lens, obj) => {
    return lens.get(obj);
};

const set = (lens, val, obj) => {
    return lens.set(val, obj);
};

const oneTimeMemoizer = (functionToMemoize) => {
    let cache = null;

    const functionWrapper = (...args) => {
        if (isNil(cache)) {
            return cache;
        } else {
            cache = functionToMemoize(...args);
            return cache;
        }

    };

    return functionWrapper;
};

// exports
export {
    curry,

    defaultTo,
    defaultToNull,

    chain,

    lens,
    lensPath,

    view,
    set,

    oneTimeMemoizer,
}
