// external imports

// internal imports
import { isArray, isFunction } from './../../misc/logic_utils';

// implementation
function findFirstInQueriesArray<QueryData>(callback: (data: QueryData) => boolean, queryTuples: [string[], QueryData[]][]): QueryData | null {
    if (!isFunction(callback)) {
        throw new RangeError('Cannot find element (first) in array of queries (React Query) - callback must a function');
    }

    if (!isArray(queryTuples)) {
        throw new RangeError('Cannot find element (first) in array of queries (React Query) - query tuples must be of type array');
    }

    for (const queryTuple of queryTuples) {
        const queryData = queryTuple[1];

        for (const queryRowData of queryData) {
            const callbackResult = callback(queryRowData);

            if (callbackResult) {
                return queryRowData;
            }
        }
    }

    return null;
}

// exports
export {
    findFirstInQueriesArray,
}
