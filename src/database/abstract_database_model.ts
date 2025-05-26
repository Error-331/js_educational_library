// external imports

// internal imports
import { AtLeast } from '../declarations/utility_declarations';
import { AbstractDatabaseDocument, WithDatabaseDocument } from '../declarations/database/general_model_declarations';

import { cloneDeep } from '../utils/primitives/object_utils';
import { isFunction, defaultTo } from '../utils/misc/logic_utils';

// implementation
abstract class AbstractDatabaseModel<InputEntityType extends object, OutputEntityType> {
    protected _collectionName: string;
    protected defaultValues: Partial<InputEntityType> = {};

    public abstract add(entity: Partial<InputEntityType>): Promise<OutputEntityType>;
    public abstract update(entity: AtLeast<WithDatabaseDocument<InputEntityType>, 'id'>): Promise<void>;
    public abstract deleteCollection(): Promise<void>;

    public abstract loadDocumentById(Id: string | number): Promise<OutputEntityType | null>;

    protected addDefaultValues(entity: Partial<InputEntityType>): Partial<InputEntityType> | InputEntityType {
        const entityClone = cloneDeep<Partial<InputEntityType>>(entity);

        for (const key in this.defaultValues) {
            const value: Partial<InputEntityType>[keyof InputEntityType] = this.defaultValues[key];
            (entityClone as AbstractDatabaseDocument)[key] = defaultTo(entityClone[key], isFunction(value) ? value() : value);
        }

        return entityClone;
    }

    protected constructor(collectionName: string) {
        this._collectionName = collectionName;
    }

    get collectionName() {
        return this._collectionName;
    }
}

// exports
export default AbstractDatabaseModel;