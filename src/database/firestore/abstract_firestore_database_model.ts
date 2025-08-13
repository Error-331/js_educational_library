// external imports
import {
    UpdateData,
    CollectionReference,
    DocumentReference,
    Firestore,
    Query,
    QuerySnapshot,
    QueryDocumentSnapshot,
    FirestoreDataConverter,
    WithFieldValue,
} from 'firebase-admin/firestore';

// internal imports
import { DatabaseDocument } from '../../declarations/database/general_database_model_declarations';
import { AtLeast } from '../../declarations/utility_declarations';

import { MODEL_PAGINATION_LIMIT } from '../../constants/database/general_database_model_constants';

import AbstractDatabaseModel from '../abstract_database_model';
import FirebaseAdminRegistry from '../../registers/firebase/firebase_admin_registry';

import { createCurrentUTCTimestamp } from '../../utils/date/current_date_utils';
import { cloneDeep } from '../../utils/primitives/object_utils';
import { calcElementsOffset } from '../../utils/math/math_count_utils';
import { isNil } from '../../utils/misc/logic_utils';

// implementation
type Filter = {
    [field: string]: {
        op: string;
        value: number | string | object | null;
    }
}

abstract class AbstractFirestoreDatabaseModel<EntityType extends DatabaseDocument>
    extends AbstractDatabaseModel<WithFieldValue<EntityType>, WithFieldValue<EntityType>> {

    public static getDatabase(): Firestore {
        return FirebaseAdminRegistry.getInstance().firestore;
    }

    protected prepareLimitOffsetQuery(collectionQuery: Query<EntityType, EntityType>, page = 1, limit = MODEL_PAGINATION_LIMIT): Query<EntityType, EntityType> {
        return collectionQuery
            .limit(limit)
            .offset(calcElementsOffset(page, limit));
    }

    protected async deleteQueryBatch(
        database: Firestore,
        query: Query<EntityType, EntityType>,
        resolve: (value?: void | PromiseLike<void>) => void,
    ): Promise<void> {
        const snapshot = await query.get();
        const batchSize = snapshot.size;

        if (batchSize === 0) {
            resolve();
            return;
        }

        const batch = database.batch();
        snapshot.docs.forEach((documentSnapshot) => batch.delete(documentSnapshot.ref));

        await batch.commit();
        setImmediate(() => {
            this.deleteQueryBatch(database, query, resolve);
        });
    }

    protected async loadCollectionInChunks(
        resolve: (value: EntityType[]) => void,
        reject: (error: unknown) => void,
        collectionRef: CollectionReference<EntityType, EntityType> | Query<EntityType, EntityType> | null,
        queryPreparationCB: (collectionRef: CollectionReference<EntityType, EntityType>) => Query<EntityType, EntityType>,
        data: EntityType[]
    ) {
        let snapshot: QuerySnapshot<EntityType, EntityType>;
        let collectionRefCopy: CollectionReference<EntityType, EntityType> | Query<EntityType, EntityType> | null;

        try {
            collectionRefCopy = collectionRef ?? queryPreparationCB(this.getCollectionReference());
            snapshot = await collectionRefCopy.get();

            snapshot.forEach((documentSnapshot: QueryDocumentSnapshot<EntityType, EntityType>) => data.push(documentSnapshot.data()));

            if (snapshot.docs.length < MODEL_PAGINATION_LIMIT) {
                return resolve(data)
            } else if (snapshot.docs.length > MODEL_PAGINATION_LIMIT) {
                reject(new RangeError(`Collection snapshot length cannot be greater than: ${MODEL_PAGINATION_LIMIT}`))
                return;
            }

            const last = snapshot.docs[snapshot.docs.length - 1];
            collectionRefCopy = queryPreparationCB(this.getCollectionReference()).startAfter(last);
        } catch (error: unknown) {
            reject(error);
        }

        setImmediate(() => {
            this.loadCollectionInChunks(resolve, reject, collectionRefCopy, queryPreparationCB, data)
        });
    }

    public async add(entity: Partial<WithFieldValue<EntityType>>): Promise<Partial<WithFieldValue<EntityType>>> {
        const entityClone = cloneDeep(entity);

        entityClone.createdTimestamp = isNil(entityClone.createdTimestamp) ? createCurrentUTCTimestamp() : entityClone.createdTimestamp;
        entityClone.updatedTimestamp = isNil(entityClone.updatedTimestamp) ? createCurrentUTCTimestamp() : entityClone.updatedTimestamp;

        const documentReference = await this.getCollectionReference().add(this.addDefaultValues(entityClone));
        return {
            id: documentReference.id,
            ...entity,
        };
    }

    public async update(entity: AtLeast<EntityType, 'id'>): Promise<void> {
        const entityClone = cloneDeep(entity);

        entityClone.updatedTimestamp = isNil(entityClone.updatedTimestamp) ? createCurrentUTCTimestamp() : entityClone.updatedTimestamp;

        const entityDocument = this.getDocumentReference(entityClone.id);
        await entityDocument.update(entityClone as UpdateData<EntityType>);
    }

    public async loadById(id: string | number): Promise<EntityType | null> {
        const entityDocument = this.getDocumentReference(id.toString());
        const documentSnapshot = await entityDocument.get();

        if (!documentSnapshot.exists) {
            return null;
        }

        const data = documentSnapshot.data();
        return isNil(data) ? null : { ...data, id: documentSnapshot.id };
    }

    public async deleteCollection(): Promise<void> {
        const query = this.getCollectionReference().orderBy('__name__').limit(MODEL_PAGINATION_LIMIT);
        const database = AbstractFirestoreDatabaseModel.getDatabase();

        return new Promise((resolve: (value?: void | PromiseLike<void>) => void, reject: (error: Error) => void) => {
            this.deleteQueryBatch(database, query, resolve).catch(reject);
        });
    }

    public async loadEntities(filter: Filter, page = 1, limit = MODEL_PAGINATION_LIMIT) {
        const snapshot = this.getCollectionReference();
        let query: Query<EntityType, EntityType>;

        /*for (const filterField in filter) {
            const
        }*/


            /*.where('type', '==', assetType)
            .where('userId', '==', userId)
            .count()
            .get();*/
    }

    protected abstract getCollectionConverter(): FirestoreDataConverter<EntityType, Omit<WithFieldValue<EntityType>, 'id'>>;

    protected getCollectionReference(): CollectionReference<EntityType, WithFieldValue<EntityType>> {
        const collectionRef = AbstractFirestoreDatabaseModel.getDatabase()
            .collection(`${this.collectionName}`);

        const firestoreDataConverter = this.getCollectionConverter();
        return isNil(firestoreDataConverter) ? collectionRef as CollectionReference<EntityType, WithFieldValue<EntityType>> : collectionRef.withConverter(firestoreDataConverter);
    }

    protected getDocumentReference(id: string): DocumentReference<EntityType, WithFieldValue<EntityType>> {
        const database = AbstractFirestoreDatabaseModel.getDatabase();
        return database.collection(this.collectionName).doc(id) as DocumentReference<EntityType, WithFieldValue<EntityType>>;
    }
}

// exports
export default AbstractFirestoreDatabaseModel;