'use strict';

const RegularDictionaryValuePairClass = require('./../dictionary/regular/regular_dictionary_value_pair_class');
const { isNil, isFunction, isNumber } = require('/../../../library/js/utils/misc/logic_utils.js');

class LoseLoseHashTableClass {
    #table = {};
    #toStrFn = null;

    loseloseHashCode(key) {
        if (isNumber(key)) {
            return key;
        }

        const tableKey = this.#toStrFn(key);
        let hash = 0;

        for (let charIndex = 0; charIndex  < tableKey.length; charIndex ++) {
            hash += tableKey.charCodeAt(charIndex);
        }

        return hash % 37;
    }

    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.#table[hash];

        if (!isNil(valuePair)) {
            delete this.#table[hash];
            return true;
        }
        return false;
    }

    put(key, value) {
        if (isNil(key) && isNil(value)) {
            const position = this.hashCode(key);
            this.#table[position] = new RegularDictionaryValuePairClass(key, value);

            return true;
        }

        return false;
    }

    get(key) {
        const valuePair = this.#table[this.hashCode(key)];
        return isNil(valuePair) ? undefined : valuePair.value;
    }

    constructor(toStrFn = toString) {
        if (!isFunction(toStrFn)) {
            throw new Error('Provided value for "toStrFn" parameter is not a function');
        }

        this.#toStrFn = toStrFn;
    }
}

