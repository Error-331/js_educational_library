'use strict';

// external imports

// internal imports
import { isNull, isBoolean, isString } from './../../../utils/misc/logic_utils.js';

// implementation
class PrefixTreeNodeDataClass {
    #char = null;
    #isFinal = null;

    get char() {
        return this.#char;
    }

    get isFinal() {
        return this.#isFinal;
    }

    toObject() {
        return { char: this.#char, isFinal: this.#isFinal };
    }

    constructor(char, isFinal) {
        if (!isNull(char) && !isString(char)) {
            throw new Error(`Cannot set char data of the prefix node - unsupported data type ("${typeof char}")`);
        }

        if (!isBoolean(isFinal)) {
            throw new Error('"isFinal" flag must be of type boolean');
        }

        this.#char = char;
        this.#isFinal = isFinal;
    }
}

// exports
export default PrefixTreeNodeDataClass;