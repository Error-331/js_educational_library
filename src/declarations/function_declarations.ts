// external imports

// internal imports

// implementation
type GenericFunctionType = (...args: any[]) => any;

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

// exports
export type {
    GenericFunctionType,
    RequiredFirstParameters,
    RemainingParameters,
    CurriedFunction,
}