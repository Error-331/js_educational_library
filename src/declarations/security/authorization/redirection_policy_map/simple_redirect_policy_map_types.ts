// external imports

// internal imports

// implementation
type SimpleRedirectPolicyFallbackFunction = (path: string, state: string) => Promise<string>;

type SimpleRedirectPolicyFallbackMap = {
    [state: string]: string | SimpleRedirectPolicyFallbackFunction;
};

type SimpleRedirectPolicyRule<PossibleStateNames extends string> = {
    allowed: PossibleStateNames | PossibleStateNames[];
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

/*
const redirectRules: RedirectRule[] = [
    {
        pattern: '/path1/sub1',
        allowed: ['AUTHENTICATED'],
        fallback: '/login',
    },
    {
        pattern: '/path1/sub2',
        allowed: ['ANONYMOUS', 'AUTHENTICATED'],
        fallback: '/login/anonymous',
    },
    {
        pattern: '/path2/sub',
        allowed: ['UNAUTHENTICATED'],
        fallback: '/home',
    },
    {
        pattern: '/public-page',
        allowed: ['UNAUTHENTICATED', 'ANONYMOUS', 'AUTHENTICATED'],
        fallback: '/public-page',
    },
    {
        pattern: '/admin/:subpage*',
        allowed: ['AUTHENTICATED'],
        fallback: '/login',
    },
];
 */