// external imports

// internal imports

// implementation

/**
 * A generic stack implementation.
 * @template StackItemType - The type of elements stored in the stack.
 */

class Stack<StackItemType> {

    /**
     * The internal array to hold stack items.
     * @protected
     */

    protected items: StackItemType[] = [];

    /**
     * Adds an element to the top of the stack.
     * @param {StackItemType} element - The element to add.
     */

    push(element: StackItemType) {
        this.items.push(element);
    }

    /**
     * Removes and returns the element from the top of the stack.
     * @returns {StackItemType} - The removed element.
     */

    pop(): StackItemType {
        return this.items.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * @returns {StackItemType} - The element at the top of the stack.
     */

    peek(): StackItemType {
        return this.items[this.items.length - 1];
    }

    /**
     * Removes all elements from the stack.
     * @returns {void}
     */

    clear(): void {
        this.items = [];
    }

    /**
     * Iterator for the stack, iterates from top to bottom.
     * @returns {Iterator<{id: number, item: StackItemType}>} - An iterator that provides the id and item of each stack element.
     */

    [Symbol.iterator]() {
        let nextItemId = this.items.length - 1;
        const stack = this;

        return {
            next: function() {
                if (stack.size === 0 || nextItemId < 0) {
                    return { done: true };
                } else {
                    const id = nextItemId;
                    const item = stack.items[nextItemId];

                    nextItemId -= 1;

                    return { value: { id, item }, done: false }
                }
            }
        }
    }

    /**
     * Indicates whether the stack is empty.
     * @returns {boolean} - True if the stack is empty, otherwise false.
     */

    get isEmpty(): boolean {
        return this.items.length === 0
    }

    /**
     * Gets the number of elements in the stack.
     * @returns {number} - The number of elements in the stack.
     */

    get size(): number {
        return this.items.length;
    }

    constructor() {}
}

// export
export default Stack;
