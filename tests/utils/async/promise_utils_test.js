'use strict';

// external imports
import { mock, test } from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { promiseRetry } from './../../../src/utils/async/promise_utils.js';

// implementation
test('Async utilities tests...', async (t) => {
    await t.test('promiseRetry() function tests...', async (t) => {
        // immediate test functions
        function userFunc1ReturnUndefined() {}
        function userFunc2ResolveUndefined() { return Promise.resolve(); }
        function userFunc3ReturnNumber() { return 3; }
        function userFunc4ResolveNumber() { return Promise.resolve(4); }
        function userFunc5ReturnUserNumber(userNumber) { return userNumber; }
        function userFunc6ResolveUserNumber(userNumber) { return Promise.resolve(userNumber); }

        function userFunc7ThrowsError() { throw new Error('Test error 1'); }
        function userFunc8Rejects() { return Promise.reject(new Error('Test error 2')); }

        // delayed test functions
        function userFunc9ResolveUndefinedDelayed() { return new Promise(resolve => setTimeout(resolve, 1000)); }
        function userFunc10ResolveNumberDelayed() { return new Promise(resolve => setTimeout(() => resolve(3), 1000)); }

        function userFunc11ResolveUserNumberDelayed(userNumber) { return new Promise(resolve => setTimeout(() => resolve(userNumber), 1000)); }

        function userFunc12RejectsDelayed() { return new Promise((resolve, reject) => setTimeout(() => reject(new Error('Test error 3')), 1000)) }

        await t.test('No retry, no timeout, no delay, tests...', async (t) => {
            await t.test('Should resolve(return) to "undefined"...', async () => {
                const promiseResult = await promiseRetry(userFunc1ReturnUndefined);
                assert.strictEqual(promiseResult, undefined);
            });

            await t.test('Should resolve to "undefined"...', async () => {
                const promiseResult = await promiseRetry(userFunc2ResolveUndefined);
                assert.strictEqual(promiseResult, undefined);
            });

            await t.test('Should resolve(return) to "number"...', async () => {
                const promiseResult = await promiseRetry(userFunc3ReturnNumber);
                assert.strictEqual(promiseResult, 3);
            });

            await t.test('Should resolve to "number"...', async () => {
                const promiseResult = await promiseRetry(userFunc4ResolveNumber);
                assert.strictEqual(promiseResult, 4);
            });

            await t.test('Should resolve(return) to "number" specified by the user...', async () => {
                const promiseResult = await promiseRetry(userFunc5ReturnUserNumber, null, null, 0, 5);
                assert.strictEqual(promiseResult, 5);
            });

            await t.test('Should resolve to "number" specified by the user...', async () => {
                const promiseResult = await promiseRetry(userFunc6ResolveUserNumber, null, null, 0, 6);
                assert.strictEqual(promiseResult, 6);
            });

            await t.test('Should reject to error when user func throws error...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc7ThrowsError));
            });

            await t.test('Should reject...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc8Rejects));
            });
        });

        await t.test('Multiple retries, no timeout, no delay, tests...', async (t) => {
            await t.test('Should reject after 7 attempts (function throws error)...', async () => {
                const userFunc7ThrowsErrorMock = mock.fn(userFunc7ThrowsError);

                await assert.rejects(async () => promiseRetry(userFunc7ThrowsErrorMock, 7));
                assert.strictEqual(userFunc7ThrowsErrorMock.mock.callCount(), 7);
            });

            await t.test('Should reject after 8 attempts (function rejects)...', async () => {
                const userFunc8RejectsMock = mock.fn(userFunc8Rejects);

                await assert.rejects(async () => promiseRetry(userFunc8RejectsMock, 8));
                assert.strictEqual(userFunc8RejectsMock.mock.callCount(), 8);
            });

            await t.test('Should resolve(return) to "number" after function rejects (function throws error) 3 times...', async () => {
                let counter = 0;
                const userFuncMock = mock.fn(() => {
                    if (counter < 2) {
                        counter += 1;
                        userFunc7ThrowsError();
                    } else {
                        return 3;
                    }
                });

                const promiseResult = await promiseRetry(userFuncMock, 5);
                assert.strictEqual(promiseResult, 3);
                assert.strictEqual(userFuncMock.mock.callCount(), 3);
            });

            await t.test('Should resolve to "number" after function rejects (function throws error) 4 times...', async () => {
                let counter = 0;
                const userFuncMock = mock.fn(() => {
                    if (counter < 3) {
                        counter += 1;
                        userFunc7ThrowsError();
                    } else {
                        return Promise.resolve(4);
                    }
                });

                const promiseResult = await promiseRetry(userFuncMock, 6);
                assert.strictEqual(promiseResult, 4);
                assert.strictEqual(userFuncMock.mock.callCount(), 4);
            });

            await t.test('Should resolve(return) to "number" after function rejects 3 times...', async () => {
                let counter = 0;
                const userFuncMock = mock.fn(() => {
                    if (counter < 2) {
                        counter += 1;
                        return userFunc8Rejects();
                    } else {
                        return 6;
                    }
                });

                const promiseResult = await promiseRetry(userFuncMock, 5);
                assert.strictEqual(promiseResult, 6);
                assert.strictEqual(userFuncMock.mock.callCount(), 3);
            });

            await t.test('Should resolve to "number" after function rejects 8 times...', async () => {
                let counter = 0;
                const userFuncMock = mock.fn(() => {
                    if (counter < 7) {
                        counter += 1;
                        return userFunc8Rejects();
                    } else {
                        return Promise.resolve(24);
                    }
                });

                const promiseResult = await promiseRetry(userFuncMock, 8);
                assert.strictEqual(promiseResult, 24);
                assert.strictEqual(userFuncMock.mock.callCount(), 8);
            });
        });

        await t.test('No retries, fixed timeouts, no delay, tests...', async (t) => {
            await t.test('Should resolve(return) to "undefined" (timeout 0/1000)...', async () => {
                const promiseResult = await promiseRetry(userFunc1ReturnUndefined, null, 1000);
                assert.strictEqual(promiseResult, undefined);
            });

            await t.test('Should resolve to "undefined" (timeout 0/1000)...', async () => {
                const promiseResult = await promiseRetry(userFunc2ResolveUndefined, null, 1000);
                assert.strictEqual(promiseResult, undefined);
            });

            await t.test('Should resolve(return) to "number" (timeout 0/1000)...', async () => {
                const promiseResult = await promiseRetry(userFunc3ReturnNumber, null, 1000);
                assert.strictEqual(promiseResult, 3);
            });

            await t.test('Should resolve to "number" (timeout 0/1000)...', async () => {
                const promiseResult = await promiseRetry(userFunc4ResolveNumber, null, 1000);
                assert.strictEqual(promiseResult, 4);
            });

            await t.test('Should resolve(return) to "number" specified by the user (timeout 0/1000)...', async () => {
                const promiseResult = await promiseRetry(userFunc5ReturnUserNumber, null, 1000, 0, 5);
                assert.strictEqual(promiseResult, 5);
            });

            await t.test('Should resolve to "number" specified by the user (timeout 0/1000)...', async () => {
                const promiseResult = await promiseRetry(userFunc6ResolveUserNumber, null, 1000, 0, 6);
                assert.strictEqual(promiseResult, 6);
            });

            await t.test('Should reject to error when user func throws error (timeout 0/1000)...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc7ThrowsError, null, 1000));
            });

            await t.test('Should reject (timeout 0/1000)...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc8Rejects, null, 1000));
            });

            await t.test('Should resolve to "undefined" (timeout 1000/1500)...', async () => {
                const promiseResult = await promiseRetry(userFunc9ResolveUndefinedDelayed, null, 1500);
                assert.strictEqual(promiseResult, undefined);
            });

            await t.test('Should resolve to "number" (timeout 1000/1500)...', async () => {
                const promiseResult = await promiseRetry(userFunc10ResolveNumberDelayed, null, 1500);
                assert.strictEqual(promiseResult, 3);
            });

            await t.test('Should resolve to "number" specified by the user (timeout 1000/1500)...', async () => {
                const promiseResult = await promiseRetry(userFunc11ResolveUserNumberDelayed, null, 1500, 0, 6);
                assert.strictEqual(promiseResult, 6);
            });

            await t.test('Should reject (timeout 1000/1500)...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc12RejectsDelayed, null, 1500));
            });

            await t.test('Should reject due to timeout (timeout 1000/500) - case 1...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc9ResolveUndefinedDelayed, null, 500));
            });

            await t.test('Should reject due to timeout (timeout 1000/500) - case 2...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc10ResolveNumberDelayed, null, 500));
            });

            await t.test('Should reject due to timeout (timeout 1000/500) - case 3...', async () => {
                await assert.rejects(async () => promiseRetry(userFunc11ResolveUserNumberDelayed, null, 500, 0, 6));
            });

            await t.test('Should reject due to timeout (timeout 1000/500) - case 4', async () => {
                await assert.rejects(async () => promiseRetry(userFunc12RejectsDelayed, null, 500));
            });
        });

        await t.test('Multiple retries, fixed timeouts, no delay, tests...', async (t) => {
            await t.test('Should reject after 8 attempts (function rejects, timeout 1000/1200)...', async () => {
                const userFunc8RejectsMock = mock.fn(userFunc12RejectsDelayed);

                await assert.rejects(async () => promiseRetry(userFunc8RejectsMock, 8, 1200));
                assert.strictEqual(userFunc8RejectsMock.mock.callCount(), 8);
            });

            await t.test('Should reject after 4 attempts (function rejects, timeout 1000-2000/1500)...', async () => {
                let counter = 0;
                let timeout = 1000;

                const userFuncMock = mock.fn(() => {
                    return new Promise((resolve, reject) => {
                        if (counter > 2) {
                            timeout = 2000;
                        }

                        setTimeout(() => {
                            if (counter < 5) {
                                counter += 1;
                                reject(new Error('Test error 4'));
                            } else {
                                resolve(5);
                            }
                        }, timeout);
                    });
                });

                await assert.rejects(async () => promiseRetry(userFuncMock, 6, 1500));
                assert.strictEqual(userFuncMock.mock.callCount(), 6);
            });

            await t.test('Should reject after 7 attempts (timeout 2000-500/1200)...', async () => {
                let counter = 0;
                let timeout = 2000;

                const userFuncMock = mock.fn(() => {
                    return new Promise((resolve, reject) => {
                        if (counter > 3) {
                            timeout = 500;
                        }

                        setTimeout(() => {
                            reject(new Error('Test error 5'));
                        }, timeout);

                        counter += 1;
                    });
                });

                await assert.rejects(async () => promiseRetry(userFuncMock, 7, 1200));
                assert.strictEqual(userFuncMock.mock.callCount(), 7);
            });

            await t.test('Should resolve to "number" after function rejects 4 times (timeout 1000/1500)...', async () => {
                let counter = 0;
                const userFuncMock = mock.fn(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (counter < 3) {
                                counter += 1;
                                reject(new Error('Test error 6'));
                            } else {
                                resolve(4);
                            }
                        }, 1000);
                    });
                });

                const promiseResult = await promiseRetry(userFuncMock, 6, 1500);
                assert.strictEqual(promiseResult, 4);
                assert.strictEqual(userFuncMock.mock.callCount(), 4);
            });

            await t.test('Should resolve to "number" after function rejects 6 times (timeout 1000/1200)...', async () => {
                let counter = 0;
                const userFuncMock = mock.fn(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (counter < 5) {
                                counter += 1;
                                reject(new Error('Test error 7'));
                            } else {
                                resolve(33);
                            }
                        }, 500);
                    });
                });

                const promiseResult = await promiseRetry(userFuncMock, 6, 1200);
                assert.strictEqual(promiseResult, 33);
                assert.strictEqual(userFuncMock.mock.callCount(), 6);
            });

            await t.test('Should resolve to "number" after function rejects 5 times (timeout 2000-500/1200)...', async () => {
                let counter = 0;
                let timeout = 2000;

                const userFuncMock = mock.fn(() => {
                    return new Promise((resolve, reject) => {
                        if (counter > 3) {
                            timeout = 500;
                        }

                        setTimeout(() => {
                            resolve(8);
                        }, timeout);

                        counter += 1;
                    });
                });

                const promiseResult = await promiseRetry(userFuncMock, 6, 1200);
                assert.strictEqual(promiseResult, 8);
                assert.strictEqual(userFuncMock.mock.callCount(), 5);
            });
        });
    });
});