'use strict';

// external imports

// internal imports

// implementation
class StackClass {
    #items = [];

    push(element) {
        this.#items.push(element);
    }

    pop() {
        return this.#items.pop();
    }

    peek() {
        return this.#items[this.#items.length - 1];
    }

    clear() {
        this.#items = [];
    }

    [Symbol.iterator]() {
        let nextItemId = this.#items.length - 1;
        const stack = this;

        return {
            next: function() {
                if (stack.size === 0 || nextItemId < 0) {
                    return { done: true };
                } else {
                    const id = nextItemId;
                    const item = stack.#items[nextItemId];

                    nextItemId -= 1;

                    return { value: { id, item }, done: false }
                }
            }
        }
    }

    get isEmpty() {
        return this.#items.length === 0
    }

    get size() {
        return this.#items.length;
    }

    constructor() {
    }
}

// export
export default StackClass;
