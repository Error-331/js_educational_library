// external imports

// internal imports
import type { SimpleQueryEntryValue } from '../../../../declarations/net/url/query/simple_query_to_url_query_converter_declarations';
import SimpleQueryToURLQueryBaseConverter from './simple_query_to_url_query_base_converter';

// implementation
class SimpleQueryToURLQueryMapConverter extends SimpleQueryToURLQueryBaseConverter {
    public decodeURLQueryPartIntoMap(urlQueryPart: string) {
        const decodedQuery = super.decodeURLQueryPartIntoQuery(urlQueryPart);
        const decodeQueryMap = new Map<string, { operator: string, value: SimpleQueryEntryValue }>();


        for (const decodeQueryPart of decodedQuery) {
            decodeQueryMap.set(decodeQueryPart.field, { operator: decodeQueryPart.operator.toLowerCase(), value: decodeQueryPart.value });
        }

        return decodeQueryMap;
    }
}

// exports
export default SimpleQueryToURLQueryMapConverter;