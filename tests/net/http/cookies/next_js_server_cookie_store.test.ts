// external imports

// internal imports
import NextJSServerCookieStore from '../../../../src/net/http/cookies/stores/next_js_server_cookie_store';

import { SET_COOKIE_DEFAULT_OPTIONS } from '../../../../src/constants/net/http/cookie_constants';
import {
    testCookieName1,
    testCookieName2,
    testCookieName3,
    testCookieName4,

    testCookieValue1,
    testCookieValue2,
    testCookieValue3,
    testCookieValue4,

    testCookieOptions1,
    testCookieOptions2,
    testCookieOptions3,
    testCookieOptions4,

    testCookieOptionsMerged1,
} from './cookie_store_test_data';

import { cookieConfigAccessorByName, checkCookieByName } from '../../../../src/utils/testing/net/http/cookies/next_js_server_cookie_store_test_utils';

// implementation
describe('NextJS server cookie store tests...', () => {


    describe('Instance creation tests...', () => {

    });

    describe('setByName() method tests...', () => {
        test('Should correctly set cookie - case 1 (default cookie options)...', async () => {
            const cookieStore = new NextJSServerCookieStore();
            await cookieStore.setByName(testCookieName1, testCookieValue1);

            await checkCookieByName(cookieStore, testCookieName1, testCookieValue1, SET_COOKIE_DEFAULT_OPTIONS, cookieConfigAccessorByName);
        });

        test('Should correctly set cookie - case 2 (default cookie options provided via constructor)...', async () => {
            const cookieStore = new NextJSServerCookieStore({
                setCookieOptions: testCookieOptions1,
            });

            await cookieStore.setByName(testCookieName2, testCookieValue2);
            await checkCookieByName(cookieStore, testCookieName2, testCookieValue2, testCookieOptions1, cookieConfigAccessorByName);
        });

        test('Should correctly set cookie - case 3 (custom cookie options)...', async () => {
            const cookieStore = new NextJSServerCookieStore({
                setCookieOptions: testCookieOptions1,
            });

            await cookieStore.setByName(testCookieName3, testCookieValue3, testCookieOptions2);
            await checkCookieByName(cookieStore, testCookieName3, testCookieValue3, testCookieOptions2, cookieConfigAccessorByName);
        });

        test('Should correctly set cookie - case 4 (default cookie options merged with custom ones)...', async () => {
            const cookieStore = new NextJSServerCookieStore({
                setCookieOptions: testCookieOptions3,
            });

            await cookieStore.setByName(testCookieName4, testCookieValue4, testCookieOptions4);
            await checkCookieByName(cookieStore, testCookieName4, testCookieValue4, testCookieOptionsMerged1, cookieConfigAccessorByName);
        });
    });
});

// exports