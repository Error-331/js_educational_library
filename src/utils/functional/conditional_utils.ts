// external imports

// internal imports

// implementation
async function switchByFunctionList<PredicateType = unknown, CallbackResultType = unknown>(
    predicatesToCBs: [ PredicateType, (predicate: PredicateType) => Promise<CallbackResultType> ][],
    checkCallback: (arg: PredicateType) => Promise<boolean>
): Promise<[ boolean, null | CallbackResultType ]> {
    for (const predicateToCB of predicatesToCBs) {
        const [predicate, callback] = predicateToCB;
        const checkResult = await checkCallback(predicate);

        if (checkResult === true) {
            const callbackResult = await callback(predicate);
            return [true, callbackResult]
        }
    }

    return [false, null];
}

// exports
export {
    switchByFunctionList,
}