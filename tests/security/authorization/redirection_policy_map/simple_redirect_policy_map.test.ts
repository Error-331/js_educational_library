// external imports

// internal imports
import { SimpleRedirectPolicyRules } from '../../../../src/declarations/security/authorization/redirection_policy_map/simple_redirect_policy_map_types';
import SimpleRedirectPolicyMap from '../../../../src/security/authorization/redirection_policy_map/simple_redirect_policy_map';

import { isNil } from '../../../../src/utils/misc/logic_utils';

// implementation
type TestContextType = {
    date?: Date;
    settings?: boolean;
    caption?: string;
    vmEnabled: boolean;
};

type PossibleTestStateNames1 = 'none-authenticated' | 'anonymous' | 'authenticated';

describe('Simple redirect policy map class tests...', () => {
    let testContext1: TestContextType = {
        vmEnabled: false,
    };

    beforeEach(() => {
        testContext1 = {
            vmEnabled: false,
        };
    });

    const testRedirectRules1: SimpleRedirectPolicyRules<PossibleTestStateNames1> = {
        '/report/text/': {
            allowed: 'authenticated',
            fallback: '/auth/anonymous',
        },

        '////report/date/': {
            allowed: ['anonymous', 'authenticated'],
            fallback: '/auth/anonymous',
        },

        '///report/pdf/////': {
            allowed: ['anonymous', 'authenticated'],
            guard: async (path: string, state: string) => {
                return !isNil(testContext1.date);
            },
            fallback: '/auth/anonymous',
        },

        '/auth/anonymous': {
            allowed: ['none-authenticated'],
            fallback: {
                'anonymous': '/auth/regular',
                'authenticated': async (path: string, state: string) => {
                    if (!isNil(testContext1.date)) {
                        return `/report/text?state=${state}`;
                    } else {
                        return `/report/date?state=${state}`;
                    }
                }
            }
        },

        '/settings/vm': {
            allowed: ['authenticated'],
            fallback: {
                'none-authenticated': '/auth/regular',
                'anonymous': '/vm',
            }
        }
    }

    describe('isAllowed() method tests...', () => {
        describe('Allowed single role tests...', () => {
            test('Should not allow access to route for specific role (none-authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('////report/text', 'none-authenticated');

                expect(isAllowed).toBe(false);
            });

            test('Should not allow access to route for specific role (anonymous)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('////report/text////', 'anonymous');

                expect(isAllowed).toBe(false);
            });

            test('Should allow access to route for specific role (authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/text////', 'authenticated');

                expect(isAllowed).toBe(true);
            });
        });

        describe('Array allowed list tests...', () => {
            test('Should not allow access to route for specific role (none-authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/date/////', 'none-authenticated');

                expect(isAllowed).toBe(false);
            });

            test('Should allow access to route for specific role (anonymous)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('//report/date/////', 'anonymous');

                expect(isAllowed).toBe(true);
            });

            test('Should allow access to route for specific role (authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('////report/date', 'authenticated');

                expect(isAllowed).toBe(true);
            });
        });

        describe('Array allowed list with guard tests...', () => {

            test('Should not allow access to route for specific role (none-authenticated) with date not set', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/pdf/////', 'none-authenticated');

                expect(isAllowed).toBe(false);
            });

            test('Should not allow access to route for specific role (anonymous) with date not set', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/pdf/////', 'anonymous');

                expect(isAllowed).toBe(false);
            });

            test('Should not allow access to route for specific role (authenticated) with date not set', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/pdf/////', 'authenticated');

                expect(isAllowed).toBe(false);
            });

            test('Should not allow access to route for specific role (none-authenticated) with date set', async () => {
                testContext1.date = new Date();

                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/pdf/////', 'none-authenticated');

                expect(isAllowed).toBe(false);
            });

            test('Should allow access to route for specific role (anonymous) with date set', async () => {
                testContext1.date = new Date();

                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/pdf/////', 'anonymous');

                expect(isAllowed).toBe(true);
            });

            test('Should allow access to route for specific role (authenticated) with date set', async () => {
                testContext1.date = new Date();

                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const isAllowed = await redirectMap.isAllowed('/report/pdf/////', 'authenticated');

                expect(isAllowed).toBe(true);
            });
        });
    });

    describe('getFallback() method tests...', () => {
        describe('String fallback tests...', () => {
            test('Should return fallback url for known role (none-authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/////report/text/////', 'none-authenticated');

                expect(fallback).toBe('/auth/anonymous');
            });

            test('Should return fallback url for known role (anonymous)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/////report/text', 'anonymous');

                expect(fallback).toBe('/auth/anonymous');
            });

            test('Should return fallback url for known role (authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/report/text/////', 'authenticated');

                expect(fallback).toBe('/auth/anonymous');
            });
        });

        describe('Map fallback tests...', () => {
            test('Should return fallback url for known role (none-authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/settings/vm', 'none-authenticated');

                expect(fallback).toBe('/auth/regular');
            });

            test('Should return fallback url for known role (anonymous)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/settings/vm', 'anonymous');

                expect(fallback).toBe('/vm');
            });

            test('Should return fallback url for known role (authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/settings/vm', 'authenticated');

                expect(fallback).toBe(null);
            });
        });

        describe('Mixed fallback tests...', () => {
            test('Should return fallback url for known role (none-authenticated)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/auth/anonymous', 'none-authenticated');

                expect(fallback).toBe(null);
            });

            test('Should return fallback url for known role (anonymous)', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/auth/anonymous', 'anonymous');

                expect(fallback).toBe('/auth/regular');
            });

            test('Should return fallback url for known role (authenticated) with no date set', async () => {
                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/auth/anonymous', 'authenticated');

                expect(fallback).toBe('/report/date?state=authenticated');
            });

            test('Should return fallback url for known role (authenticated) with date set', async () => {
                testContext1.date = new Date();

                const redirectMap = new SimpleRedirectPolicyMap<PossibleTestStateNames1>(testRedirectRules1)
                const fallback = await redirectMap.getFallback('/auth/anonymous', 'authenticated');

                expect(fallback).toBe('/report/text?state=authenticated');
            });
        });
    });
});

// exports