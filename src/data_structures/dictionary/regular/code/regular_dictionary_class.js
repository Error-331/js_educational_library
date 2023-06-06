'use strict';

import { isUndefined, isNil, isFunction } from './../../../../../library/js/utils/misc/logic_utils.js';
import { toString } from './../../../../../library/js/utils/misc/type_cast_utils.js';

import RegularDictionaryValuePairClass from './regular_dictionary_value_pair_class.js';

class RegularDictionaryClass {
    #table = {};
    #toStrFn = null;

    size() {
        return Object.keys(this.#table).length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.table = {};
    }

    hasKey(key) {
        return this.#table[this.#toStrFn(key)] !== null;
    }

    keyValues() {
        return Object.values(this.#table);
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }

    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }

    get(key) {
        if (this.hasKey(key)) {
            return this.#table[this.#toStrFn(key)];
        }

        return undefined;
    }

    set(key, value) {
        if (isNil(key)) {
            throw new Error('Cannot set value - key is undefined of null');
        }

        if(isUndefined(value)) {
            throw new Error('Cannot set value - value is undefined');
        }

        const tableKey = this.#toStrFn(key);
        this.#table[tableKey] = new RegularDictionaryValuePairClass(key, value);

        return true;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.#table[this.#toStrFn(key)];
            return true;
        }

        return false;
    }

    forEach(cb = () => {}) {
        for (const value of this) {
            cb(value.key, value.value)
        }
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }

        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;

        for (let valueIndex = 1; valueIndex < valuePairs.length; valueIndex++) {
            objString = `${objString},${valuePairs[valueIndex].toString()}`;
        }

        return objString; // {3}
    }

    [Symbol.iterator]() {
        const keys = Object.keys(this.#table);

        if (keys.length <= 0) {
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
                            value: dictionary.get(currentKey),
                            done: false
                        };
                    }
                }
            }
        }
    }

    constructor(toStrFn = toString) {
        if (!isFunction(toStrFn)) {
            throw new Error('Provided value for "toStrFn" parameter is not a function');
        }

        this.#toStrFn = toStrFn;
    }
}

export default RegularDictionaryClass;