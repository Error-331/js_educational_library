'use strict';

// external imports

// internal imports

// implementation
class SetClass {
    #items = null;

    add(element) {
        if (!this.has(element)) {
            this.#items[element] = element;
            return true;
        }

        return false;
    }

    has(element) {
        return Object.prototype.hasOwnProperty.call(this.#items, element);
    }

    clear() {
        this.#items = {};
    }

    delete(element) {
        if (this.has(element)) {
            delete this.#items[element];
            return true;
        }

        return false;
    }

    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    get size() {
        return Object.keys(this.#items).length; // {1}
    }

    get items(){
        return new Proxy(this.#items, {
            get(target, prop) {
                return target[prop];
            },

            set() {
                return true;
            }
        });
    }

    get values() {
        return Object.values(this.#items);
    }

    [Symbol.iterator]() {
        let keyIdx = 0;
        const values = this.values;

        return {
            next: function () {
                if (keyIdx >= values.length) {
                    return { done: true };
                } else {
                    const id = keyIdx;
                    const item = values[keyIdx];

                    keyIdx += 1;

                    return { value: item, done: false };
                }
            }
        }
    }

    constructor() {
        this.#items = {};
    }
}

// exports
export default SetClass;