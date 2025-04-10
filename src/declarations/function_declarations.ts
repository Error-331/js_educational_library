// external imports

// internal imports

// implementation
type GenericFunctionType = (...args: any[]) => any;
type GenericUnknownArgsFunctionType = (...args: unknown[]) => any;
type ParametrisedReturnUnknownFunctionType<ReturnType> = (...args: unknown[]) => ReturnType;

type GenericUnknownFunctionArgsButLastType<LastArgumentType> = [...unknown[], LastArgumentType];
type GenericFunctionWithLastArgKnown<LastArgumentType, ReturnType> = (...args: GenericUnknownFunctionArgsButLastType<LastArgumentType>) => ReturnType;

type RequiredFirstParameters<FunctionType extends GenericFunctionType> = Parameters<FunctionType> extends [
        infer HeadParameters,
        ...infer TailParameters
    ]
    ? [HeadParameters, ...Partial<TailParameters>]
    : [];

type RemainingParameters<
    AppliedParameters extends any[],
    ExpectedParameters extends any[]
> = AppliedParameters extends [any, ...infer AppliedParametersTail]
    ? ExpectedParameters extends [any, ...infer ExpectedParametersTail]
        ? RemainingParameters<AppliedParametersTail, ExpectedParametersTail>
        : []
    : ExpectedParameters;

type CurriedFunction<FunctionType extends GenericFunctionType> = <
    AppliedParams extends RequiredFirstParameters<FunctionType>
>(
    ...args: AppliedParams
) => RemainingParameters<AppliedParams, Parameters<FunctionType>> extends [
        any,
        ...any[]
    ]
    ? CurriedFunction<
        (
            ...args: RemainingParameters<AppliedParams, Parameters<FunctionType>>
        ) => ReturnType<FunctionType>
    >
    : ReturnType<FunctionType>;

type LastElementOfUnknownArgsFunctionsList<FunctionListType extends GenericUnknownArgsFunctionType[]> = FunctionListType extends [...infer L, infer R] ? R : never;
type ListOfUnknownArgsFunctionsWithLastReturnType<ReturnType> = [...GenericUnknownArgsFunctionType[], ParametrisedReturnUnknownFunctionType<ReturnType>];

// exports
export type {
    GenericFunctionType,
    GenericUnknownArgsFunctionType,
    ParametrisedReturnUnknownFunctionType,

    GenericUnknownFunctionArgsButLastType,
    GenericFunctionWithLastArgKnown,

    RequiredFirstParameters,
    RemainingParameters,
    CurriedFunction,

    LastElementOfUnknownArgsFunctionsList,
    ListOfUnknownArgsFunctionsWithLastReturnType,
}