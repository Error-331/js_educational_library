// external imports

// internal imports

// implementation
type SimpleRedirectPolicyGuardFunction<AdditionalArgs extends unknown> = (path: string, state: string, ...args: AdditionalArgs[]) => Promise<boolean | unknown>;
type SimpleRedirectPolicyFallbackFunction<AdditionalArgs extends unknown> = (path: string, state: string, ...args: AdditionalArgs[]) => Promise<string | null>;

type SimpleRedirectPolicyFallbackMap<AdditionalFallbackFuncArgs extends unknown> = {
    [state: string]: string | SimpleRedirectPolicyFallbackFunction<AdditionalFallbackFuncArgs>;
};

type SimpleRedirectPolicyRule<PossibleStateNames extends string, AdditionalGuardFuncArgs extends unknown, AdditionalFallbackFuncArgs extends unknown> = {
    allowed: PossibleStateNames | PossibleStateNames[];
    guard?: SimpleRedirectPolicyGuardFunction<AdditionalGuardFuncArgs>;
    fallback?: string | SimpleRedirectPolicyFallbackMap<AdditionalFallbackFuncArgs> | SimpleRedirectPolicyFallbackFunction<AdditionalFallbackFuncArgs>;
};

type SimpleRedirectPolicyRules<PossibleStateNames extends string, AdditionalGuardFuncArgs = unknown, AdditionalFallbackFuncArgs = unknown> = {
    [path: string]: SimpleRedirectPolicyRule<PossibleStateNames, AdditionalGuardFuncArgs, AdditionalFallbackFuncArgs>
};

// exports
export {
    SimpleRedirectPolicyFallbackFunction,
    SimpleRedirectPolicyFallbackMap,

    SimpleRedirectPolicyRule,
    SimpleRedirectPolicyRules,
}