// external imports
import { Query, CollectionReference, WithFieldValue } from 'firebase-admin/firestore';

// internal imports
import { DatabaseDocument } from '../../../../declarations/database/general_database_model_declarations';

import { SimpleQueryEntryOperator } from '../../../../declarations/net/url/query/simple_query_to_url_query_converter_declarations';
import SimpleQueryToURLQueryBaseConverter from './simple_query_to_url_query_base_converter';

import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
class SimpleQueryToURLQueryFirestoreConverter<EntityType extends DatabaseDocument> extends SimpleQueryToURLQueryBaseConverter{
    private convertQueryOperatorToFirestoreQueryOperator(operator: string) {
        switch (operator) {
            case SimpleQueryEntryOperator.GreaterThanOrEqual:
                return '>=';
            case SimpleQueryEntryOperator.LessThanOrEqual:
                return '<=';
            case SimpleQueryEntryOperator.In:
                return 'in';
            default:
                throw new RangeError(`Cannot convert query operator to Firestore operator - unknown query operator "${operator}"`)
        }
    }

    public decodeURLQueryPartIntoFirestoreQuery(collectionReference: CollectionReference<EntityType, WithFieldValue<EntityType>>, urlQueryPart: string): Query<EntityType, EntityType> {
        const decodedQuery = super.decodeURLQueryPartIntoQuery(urlQueryPart);
        let preparedQuery: Query<EntityType, EntityType> = undefined;

        for (const decodeQueryPart of decodedQuery) {
            const value = decodeQueryPart.value;

            const operator = this.convertQueryOperatorToFirestoreQueryOperator(decodeQueryPart.operator.toLowerCase());
            preparedQuery = isNil(preparedQuery) ? collectionReference.where(decodeQueryPart.field, operator, value) : preparedQuery.where(decodeQueryPart.field, operator, value);
        }

        return preparedQuery;
    }
}

// exports
export default SimpleQueryToURLQueryFirestoreConverter;