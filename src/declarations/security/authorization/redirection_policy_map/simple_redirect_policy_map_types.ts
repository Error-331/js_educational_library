// external imports

// internal imports

// implementation
type SimpleRedirectPolicyGuardFunction = (path: string, state: string) => Promise<boolean | unknown>;
type SimpleRedirectPolicyFallbackFunction = (path: string, state: string) => Promise<string | null>;

type SimpleRedirectPolicyFallbackMap = {
    [state: string]: string | SimpleRedirectPolicyFallbackFunction;
};

type SimpleRedirectPolicyRule<PossibleStateNames extends string> = {
    allowed: PossibleStateNames | PossibleStateNames[];
    guard?: SimpleRedirectPolicyGuardFunction;
    fallback?: string | SimpleRedirectPolicyFallbackMap | SimpleRedirectPolicyFallbackFunction;
};

type SimpleRedirectPolicyRules<PossibleStateNames extends string> = {
    [path: string]: SimpleRedirectPolicyRule<PossibleStateNames>
};

// exports
export {
    SimpleRedirectPolicyFallbackFunction,
    SimpleRedirectPolicyFallbackMap,

    SimpleRedirectPolicyRule,
    SimpleRedirectPolicyRules,
}