'use strict';

// external imports

// internal imports
import { isUndefined, isNil, isFunction } from './../../utils/misc/logic_utils.js';
import { toString } from './../../utils/misc/type_cast_utils.js';

import { defaultCompare } from './../../utils/misc/comparator_utils.js';

import DictionaryValuePairClass from './dictionary_value_pair_class.js';

// implementation
class DictionaryClass {
    #table = {};

    #comparator = defaultCompare;
    #toStrFunc = toString;

    clear() {
        this.#table = {};
    }

    hasKey(key) {
        return this.#table[this.#toStrFunc(key)] !== null;
    }

    get(key) {
        const valuePair = this.#table[this.#toStrFunc(key)];
        return isNil(valuePair) ? undefined : valuePair.value;
    }

    set(key, value) {
        if (isNil(key)) {
            throw new Error('Cannot set value - key is undefined of null');
        }

        if(isUndefined(value)) {
            throw new Error('Cannot set value - value is undefined');
        }

        const tableKey = this.#toStrFunc(key);
        this.#table[tableKey] = new DictionaryValuePairClass(key, value);

        return true;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.#table[this.#toStrFunc(key)];
            return true;
        }

        return false;
    }

    forEach(callback = () => {}) {
        for (const key in this.#table) {
            const entry = this.#table[key];
            callback(entry.key, entry.value)
        }
    }

    toString() {
        if (this.isEmpty) {
            return '';
        }

        const valuePairs = this.keyValues;
        let objString = `${valuePairs[0].toString()}`;

        for (let valueIndex = 1; valueIndex < valuePairs.length; valueIndex++) {
            objString = `${objString},${valuePairs[valueIndex].toString()}`;
        }

        return objString;
    }

    [Symbol.iterator]() {
        const keys = Object.keys(this.#table);

        if (this.isEmpty) {
            return {
                next: function() {
                    return {
                        done: true
                    };
                }
            }
        } else {
            const dictionary = this;
            const keysCount = keys.length;

            let keyCounter = -1;
            let currentKey;

            return {
                next: function() {
                    keyCounter += 1;

                    if (keyCounter >= keysCount) {
                        return {
                            done: true
                        };
                    } else {
                        currentKey = keys[keyCounter];

                        return {
                            value: dictionary.#table[currentKey],
                            done: false
                        };
                    }
                }
            }
        }
    }

    get size() {
        return Object.keys(this.#table).length;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get keyValues() {
        return Object.values(this.#table);
    }

    get keys() {
        return this.keyValues.map(valuePair => valuePair.key);
    }

    get values() {
        return this.keyValues.map(valuePair => valuePair.value);
    }

    constructor(toStrFunc, comparator) {
        if (!isNil(toStrFunc)) {
            if (!isFunction(toStrFunc)) {
                throw new Error('"toStrFunc" is not a function');
            }

            this.#toStrFunc = toStrFunc;
        }

        if (!isNil(comparator)) {
            if (!isFunction(comparator)) {
                throw new Error('Comparator is not a function');
            }

            this.#comparator = comparator;
        }
    }
}

// export
export default DictionaryClass;