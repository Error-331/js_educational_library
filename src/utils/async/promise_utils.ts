// external imports

// internal imports

// implementation
type PromiseRetryDebugFunction = <ReturnValueType>(
    message: string,
    retries: number,
    timeout: number | null,
    delay: number | null,
    error: unknown | undefined,
    returnValue: ReturnValueType | undefined,
    ...userFuncArgs: unknown[]
) => void;

function promiseRetry<ResponseType>(
    userFunc: (...userFuncArgs: unknown[]) => Promise<ResponseType>,
    retries = 0,
    timeout: number | null = null,
    delay: number | null = null,
    debugFunction: PromiseRetryDebugFunction | undefined,
    ...userFuncArgs: unknown[]
): Promise<ResponseType> {
    const debugFunctionCopy = typeof debugFunction === 'function' ? debugFunction : () => {};
    debugFunctionCopy('Promise retry - initialization...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);

    return new Promise((resolve, reject) => {
        let tryTimeoutId: NodeJS.Timeout;
        let tryTimeoutExecuted = false;

        new Promise<void>((delayResolve) => {
            if (delay !== null) {
                debugFunctionCopy('Promise retry - delay set...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);
                setTimeout(delayResolve, delay);
            } else {
                debugFunctionCopy('Promise retry - delay absent...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);
                delayResolve();
            }
        })
            .then(() => {
                try {
                    debugFunctionCopy('Promise retry - user function execution...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);
                    const userFuncRes = userFunc(...userFuncArgs);

                    return userFuncRes instanceof Promise ?
                        new Promise<ResponseType>((innerResolve, innerReject) => {
                            if (timeout !== null) {
                                tryTimeoutId = setTimeout(() => {
                                    debugFunctionCopy('Promise retry - user function timeout...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);

                                    tryTimeoutExecuted = true;
                                    innerReject(new Error(`Timeout (${retries})`));
                                }, timeout);
                            }

                            userFuncRes
                                .then((result: ResponseType) => {
                                    debugFunctionCopy('Promise retry - async user function resolved...', retries, timeout, delay, undefined, result, ...userFuncArgs);
                                    innerResolve(result);
                                })
                                .catch((error: unknown) => {
                                    debugFunctionCopy('Promise retry - async user function rejected...', retries, timeout, delay, error, undefined, ...userFuncArgs);
                                    innerReject(error);
                                });
                        }) :
                        (() => {
                            debugFunctionCopy('Promise retry - sync user function resolved...', retries, timeout, delay, undefined, userFuncRes, ...userFuncArgs);
                            return Promise.resolve(userFuncRes)
                        })();
                } catch (error) {
                    debugFunctionCopy('Promise retry - user function throws error...', retries, timeout, delay, error, undefined, undefined, ...userFuncArgs);
                    return Promise.reject(error);
                }
            })
            .then((value) => {
                if (tryTimeoutExecuted) {
                    debugFunctionCopy('Promise retry - try timout already executed...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);
                } else {
                    if (tryTimeoutId) {
                        debugFunctionCopy('Promise retry - try timeout cleanup before resolve...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);
                        clearTimeout(tryTimeoutId);
                    }

                    debugFunctionCopy('Promise retry - promise resolved on initial call...', retries, timeout, delay, undefined, value, ...userFuncArgs);
                    resolve(value);
                }
            })
            .catch((error: unknown) => {
                if (tryTimeoutExecuted) {
                    debugFunctionCopy('Promise retry - promise try timout already executed...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);
                }

                if (tryTimeoutId) {
                    debugFunctionCopy('Promise retry - try timeout cleanup...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);
                    clearTimeout(tryTimeoutId);
                }

                if (retries <= 1) {
                    debugFunctionCopy('Promise retry - no more retries...', retries, timeout, delay, error, undefined, ...userFuncArgs);
                    reject(error);
                } else {
                    debugFunctionCopy('Promise retry - making another attempt...', retries, timeout, delay, undefined, undefined, ...userFuncArgs);

                    return promiseRetry(userFunc, retries - 1, timeout, delay, debugFunction, ...userFuncArgs)
                        .then((value) => {
                            debugFunctionCopy('Promise retry - user function resolved on retry...', retries, timeout, delay, undefined, value, ...userFuncArgs);

                            resolve(value);
                        })
                        .catch((error) => {
                            debugFunctionCopy('Promise retry - user function rejected after retry...', retries, timeout, delay, error, undefined, ...userFuncArgs);
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