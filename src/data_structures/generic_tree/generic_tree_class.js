'use strict';

// external imports

// internal imports
import { isNil } from './../../utils/misc/logic_utils.js';
import { defaultCompare } from './../../utils/misc/comparator_utils.js';

import GenericTreeNodeClass from './generic_tree_node_class.js';

// implementation
class GenericTreeClass {
    #root = null;
    #comparator = defaultCompare;

    createNewRoot(data = null) {
        this.destroy();
        this.#root = new GenericTreeNodeClass(this, null, this.#comparator, data);

        return this.#root;
    }

    destroy() {
        if (!isNil(this.#root)) {
            this.#root.destroy();
        }
    }

    get root() {
        return this.#root;
    }

    get comparator() {
        return this.#comparator;
    }

    constructor(comparator = null) {
        if (!isNil(comparator)) {
            this.#comparator = comparator;
        }
    }
}

// exports
export default GenericTreeClass;
