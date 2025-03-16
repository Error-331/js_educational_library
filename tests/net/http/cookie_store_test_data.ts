// external imports

// internal imports
import { SetCookieOptions } from '../../../src/declarations/net/cookie_declarations';

// implementation
const testCookieName1 = 'test1';
const testCookieName2 = 'test2';
const testCookieName3 = 'test3';
const testCookieName4 = 'test4';

const testCookieValue1 = 'value1';
const testCookieValue2 = 'value2';
const testCookieValue3 = 'value3';
const testCookieValue4 = 'value4';

const testCookieOptions1: SetCookieOptions = {
    domain: 'testdomain1.com',
    expires: 'Tue, 5 May 2024 18:25:34 GMT',
    httpOnly: true,
    maxAge: 4000,
    path: '/path1/path2',
    secure: true,
    sameSite: false,
};

const testCookieOptions2: SetCookieOptions = {
    domain: 'testdomain2.com',
    expires: 'Tue, 7 May 2025 00:00:00 GMT',
    httpOnly: false,
    maxAge: 5500,
    path: '/path1/path2/path3',
    secure: false,
    sameSite: true,
};

const testCookieOptions3: SetCookieOptions = {
    domain: 'testdomain3.com',
    maxAge: 75000,
    secure: false,
    sameSite: true,
};

const testCookieOptions4: SetCookieOptions = {
    domain: 'testdomain4.com',
    expires: 'Mon, 2 Dec 2025 01:25:37 GMT',
    path: '/',
    secure: true,
};

const testCookieOptionsMerged1: SetCookieOptions = {
    domain: 'testdomain4.com',
    expires: 'Mon, 2 Dec 2025 01:25:37 GMT',
    httpOnly: false,
    maxAge: 75000,
    path: '/',
    secure: true,
    sameSite: true,
}

// exports
export {
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
}