'use strict';

// external imports

// internal imports
import { isObject, isNil } from './../../utils/misc/logic_utils.js';

// implementation
class LinkedListNodeClass {
    #element = null;
    #next = null;

    clear() {
        this.#element = null;
    }

    unlink() {
        this.#next = null;
    }

    abandon() {
        this.clear();
        this.unlink();
    }

    destroy() {
        if (isObject(this.#element)) {
            this.#element?.destroy();
        }

        if (isNil(this.#next)) {
            this.#next?.destroy();
        }

        this.abandon();
    }

    get element() {
        return this.#element;
    }

    get next() {
        return this.#next;
    }

    set element(element) {
        this.#element = element;
    }

    set next(node) {
        this.#next = node;
    }

    constructor(element) {
        this.#element = element;
    }
}

// export
export default LinkedListNodeClass;
