// external imports

// internal imports
import { GenericObject, IterableMapLikeEntity } from '../../declarations/collection_declarations';
import { isNil, isUndefined, isArray, isObject } from '../misc/logic_utils';

// implementation
function checkObjectKeys(objectLike: unknown, keysValidators: {[key: string]: (arg: unknown) => boolean}): boolean {
    if (!isIterableObject(objectLike)) {
        return false;
    }

    for (const key in keysValidators) {
        const validator = keysValidators[key];

        if (!(key in objectLike) && !validator(objectLike[key])) {
            return false;
        }
    }

    return true;
}

function isIterableObject(iterableObjectLike: unknown): iterableObjectLike is GenericObject {
    if (typeof iterableObjectLike !== 'object') {
        return false;
    }

    return Object.keys(iterableObjectLike).length > 0;
}

function isObjectOfType<ObjectType>(objectLike: unknown, keysValidators: {[key: string]: (arg: unknown) => boolean}): objectLike is ObjectType {
    return checkObjectKeys(objectLike, keysValidators);
}

function cloneArrayDeep(arrayToClone) {
    if (isNil(arrayToClone)) {
        throw new Error('Cannot clone an array - array is not provided');
    } else if (!isArray(arrayToClone)) {
        throw new Error('Cannot clone an array - provided entity is not a valid array');
    }

    return arrayToClone.map(value => {
        if (isObject(value)) {
            return cloneDeep(value);
        } else if (isArray(value)) {
            return cloneArrayDeep(value);
        } else {
            return value;
        }
    });
}

function cloneDeep<ObjectType = object>(obj: ObjectType): ObjectType {
    let newObj = Object.assign({}, obj);

    for (const objProp in newObj) {
        const objPropValue = newObj[objProp];

        if(isObject(objPropValue)) { // clone property that contains object
            newObj[objProp] = cloneDeep(objPropValue);
        } else if (isArray(objPropValue)) { // clone property that contains array
            newObj[objProp] = cloneArrayDeep(objPropValue);
        }
    }

    return newObj;
}

function extractPropValueByPath(obj, path = []) {
    if (isNil(obj)) {
        throw new Error('Cannot extract property value by path - object is not provided');
    }

    if (path.length === 0) {
        throw new Error('Cannot extract property value by path - path is empty');
    }

    let prop = obj;

    for (const key in path) {
        if (isObject(prop) || isArray(prop)) {
            prop = prop[key];
        } else {
            return undefined;
        }
    }

    return prop;
}

function setPropValueByPath(path = [], propValue, obj) {
    if (isNil(obj)) {
        throw new Error('Cannot set property value by path - object is not provided');
    }

    if (isUndefined(propValue)) {
        return false;
    }

    const pathLength = path.length;

    if (pathLength === 0) {
        throw new Error('Cannot set property value by path - path is empty');
    }

    let prop = obj;

    for (let keyCnt = 0; keyCnt < path.length; keyCnt++) {
        const key = path[keyCnt];

        if (isObject(prop) || isArray(prop)) {
            if (keyCnt + 1 === pathLength) {
                if (!isUndefined(prop[key])) {
                    prop[key] = propValue;
                    return true;
                } else {
                    return false;
                }
            }

            prop = prop[key];
        } else {
            return false;
        }
    }
}

function objectPropertiesToNormalize(obj) {
    for (const key in obj) {
        const newKey = key[0].toLowerCase() + key.substr(1);

        obj[newKey] = obj[key];
        delete obj[key];
    }

    return obj;
}

function mapToObject<ValueType>(customMap: IterableMapLikeEntity<ValueType>): Record<string, ValueType> {
    const customObj: Record<string, ValueType> = {};

    for(const [key, value] of customMap.entries()) {
        customObj[key] = value;
    }

    return customObj;
}

// TODO: map returns object? - not good
function pick<SourceObjectType, KeysListType extends keyof SourceObjectType>(objectToPickFrom: SourceObjectType, propertiesList: KeysListType[]): Pick<SourceObjectType, KeysListType> {
    if (!isObject(objectToPickFrom)) {
        throw new RangeError('Cannot pick properties from object - provided value is not an object');
    }

    return Object.assign(
        {},
        ...propertiesList.map(key => {
            if (objectToPickFrom && Object.prototype.hasOwnProperty.call(objectToPickFrom, key)) {
                return { [key]: objectToPickFrom[key] };
            }
        })
    );
}

function omit<SourceObjectType extends object, KeysListType extends keyof SourceObjectType>(objectToOmitIn: SourceObjectType, propertiesList: KeysListType[]): Omit<SourceObjectType, KeysListType>  {
    const objectToOmitInCopy = cloneDeep<SourceObjectType>(objectToOmitIn);

    propertiesList.forEach((key) => delete objectToOmitInCopy[key])
    return objectToOmitInCopy;
}

// exports
export {
    checkObjectKeys,

    isIterableObject,
    isObjectOfType,

    cloneArrayDeep,
    cloneDeep,

    extractPropValueByPath,
    setPropValueByPath,

    objectPropertiesToNormalize,
    mapToObject,

    pick,
    omit,
}