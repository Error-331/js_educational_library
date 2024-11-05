'use strict';

// external imports

// internal imports

// implementation
function promiseRetry(userFunc, retries = 0, timeout = null, delay = null, ...userFuncArgs) {
    console.log('Enter promise retry...');

    return new Promise((resolve, reject) => {
        console.log(`Returning new promise from promise retry (${retries})...`);

        let tryTimeoutId;
        let tryTimeoutExecuted = false;

        new Promise((delayResolve) => {
            if (delay !== null) {
                setTimeout(delayResolve, delay);
            } else {
                delayResolve();
            }
        })
            .then(() => {
                try {
                    const userFuncRes = userFunc(...userFuncArgs);
                    return userFuncRes instanceof Promise ?
                        new Promise((innerResolve, innerReject) => {
                            if (timeout !== null) {
                                tryTimeoutId = setTimeout(() => {
                                    tryTimeoutExecuted = true;
                                    console.log(`Not good - timeout (${retries})`);
                                    innerReject(new Error(`Timeout (${retries})`));
                                }, timeout);
                            }

                            userFuncRes
                                .then(innerResolve)
                                .catch(innerReject);
                        }) :
                        Promise.resolve(userFuncRes)
                } catch (error) {
                    return Promise.reject(error);
                }
            })
            .then((value) => {
                if (tryTimeoutExecuted) {
                    console.log('Timeout already executed just after function call');
                } else {
                    if (tryTimeoutId) {
                        console.log('Clearing timeout(resolve)');
                        clearTimeout(tryTimeoutId);
                    }

                    console.log('All good - promise retry resolved on initial call: ', value);
                    resolve(value);
                }
            })
            .catch((error) => {
                if (tryTimeoutExecuted) {
                    console.log(`Timeout already executed on retry (${retries})`);
                }

                if (tryTimeoutId) {
                    console.log(`Clearing timeout (reject, attempt: ${retries})`);
                    clearTimeout(tryTimeoutId);
                }

                if (retries <= 1) {
                    console.log(`Not good - no more retries (${retries})`, error);
                    reject(error);
                } else {
                    console.log(`Not good - retrying (${retries})`, error);

                    return promiseRetry(userFunc, retries - 1, timeout, delay, ...userFuncArgs)
                        .then((value) => {
                            console.log(`All normal - promise retry resolved on retry (${retries}): `, value);
                            resolve(value);
                        })
                        .catch((error) => {
                            console.log(`Not good at all - promise rejected even after retry (${retries})`, error);
                            reject(error);
                        })
                }
            })
    });
}

// exports
export {
    promiseRetry,
}