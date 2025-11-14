'use strict';

// @flow

// external imports
import {Map} from 'immutable';

// local imports

// type definitions
type NewMapType = {[string]: any};

// register implementation

/*
 * Possible register key/values
 *
 * apiEndpoint: string - used when sending requests to server
 *
 * authenticationReducerName: string - key for authentication reducer
 *
 * entityCollectionItemsCountFieldName: string - new name for 'itemsCount' field of entity collection meta
 * entityCollectionTotalItemCountFieldName: string - new name for 'totalItemCount' field of entity collection meta
 *
 */

let registerInstance: Map<string, any> = Map();

export function hasKey(key: string): boolean {
    return registerInstance.has(key);
}

export function deleteKey(key: string): void {
    if (!hasKey(key)) {
        throw new Error(`Key "${key}" does not exist it registry`);
    }

    registerInstance = registerInstance.delete(key);
}

export function merge(newMap: NewMapType): void {
    registerInstance = registerInstance.merge(newMap);
}

export function getValue(key: string): any {
    if (!hasKey(key)) {
        throw new Error(`Key "${key}" does not exist it registry`);
    }

    return registerInstance.get(key);
}

export function getRegister(): Map<string, any> {
    return registerInstance;
}

export function setValue(key: string, value: any): void {
    registerInstance = registerInstance.set(key, value);
}