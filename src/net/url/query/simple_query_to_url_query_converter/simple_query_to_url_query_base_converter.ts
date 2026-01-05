// external imports

// internal imports
import type { SimpleQueryEntry } from '../../../../declarations/net/url/query/simple_query_to_url_query_converter_declarations';
import { SimpleQueryEntryType, SimpleQueryValueType, SimpleQueryEntryOperator, } from '../../../../declarations/net/url/query/simple_query_to_url_query_converter_declarations';

import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isString, isArray } from '../../../../utils/misc/logic_utils';

// implementation
class SimpleQueryToURLQueryBaseConverter {
    private checkQueryEntry(queryEntry: Object): queryEntry is SimpleQueryEntry {
        const queryTypes: string[] = Object.values(SimpleQueryEntryType);
        const valueTypes: string[] = Object.values(SimpleQueryValueType);
        const operators: string[] = Object.values(SimpleQueryEntryOperator);

        return isObjectOfType<SimpleQueryEntry>(queryEntry, {
            type: (valueToCheck: unknown) => isString(valueToCheck) && queryTypes.includes(valueToCheck),
            field: isString,
            valueType: (valueToCheck: unknown) => isString(valueToCheck) && valueTypes.includes(valueToCheck),
            value: isString,
            operator: (valueToCheck: unknown) => isString(valueToCheck) && operators.includes(valueToCheck),
        });
    }

    public encodeQueryDataIntoURLQuery(query: SimpleQueryEntry[]): string {
        if (!isArray(query)) {
            throw new RangeError('Cannot encode query data into URL query - query must be of type array');
        }

        const queryParts = [];

        for (const queryPart of query) {
            const isValidQueryPart = this.checkQueryEntry(queryPart);

            if (!isValidQueryPart) {
                throw new Error('Cannot encode query data into URL query - invalid query part found');
            }

            queryParts.push(`${queryPart.type}:${queryPart.field}:${queryPart.valueType}:${queryPart.operator}=${queryPart.value.toString()}`);
        }

        return queryParts.join(';');
    }

    public decodeValueByValueType(valueType: string, value: string): number | string | string[] | number[] {
        if (!isString(valueType)) {
            throw new RangeError('Cannot decode value from URL query - raw value must be of type string');
        }

        switch (valueType) {
            case SimpleQueryValueType.Number:
                return parseFloat(value);
            case SimpleQueryValueType.String:
                return value;
            case SimpleQueryValueType.ArrayString:
                return value.split(',');
            default:
                throw new RangeError(`Cannot decode value from URL query - unknown value type "${valueType}"`);
        }
    }

    public decodeURLQueryPartIntoQuery(urlQueryPart: string): SimpleQueryEntry[] {
        const queryParts = urlQueryPart.split(';');
        const decodedQuery: SimpleQueryEntry[] = [];

        for (const queryPart of queryParts) {
            const [type, field, valueType, operatorValue] = queryPart.split(':');
            const [operator, rawValue] = operatorValue.split('=');

            const queryPartParsed: object = {
                type,
                field,
                valueType,
                operator,
                value: this.decodeValueByValueType(valueType, rawValue),
            }

            if (this.checkQueryEntry(queryPartParsed)) {
                decodedQuery.push(queryPartParsed);
            } else {
                throw new RangeError('Cannot decode query data from URL query - invalid query part found');
            }

            return decodedQuery;
        }

        return decodedQuery;
    }
}

// exports
export default SimpleQueryToURLQueryBaseConverter;