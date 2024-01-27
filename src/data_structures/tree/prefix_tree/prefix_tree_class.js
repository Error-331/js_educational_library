'use strict';

// external imports

// internal imports
import { isNil } from './../../../utils/misc/logic_utils.js';
import { prefixTreeCharComparator } from './prefix_tree_comparator.js';

import GenericTreeClass from './../../generic_tree/generic_tree_class.js';
import PrefixTreeNodeDataClass from './prefix_tree_node_data_class.js';

// implementation
class PrefixTreeClass extends GenericTreeClass {
    insert(key) {
        let currentNode = this.root;

        for (const char of key) {
            const tempNode = currentNode.findChild(char);

            if (isNil(tempNode)) {
                currentNode = currentNode.addChild(new PrefixTreeNodeDataClass(char, false));
            } else {
                currentNode = tempNode;
            }
        }

        currentNode.data = new PrefixTreeNodeDataClass(currentNode.data.char, true);
    }

    findKey(key) {
        let parentNode = this.root;

        for (let charIdx = 0; charIdx < key.length; charIdx++) {
            const char = key[charIdx];
            const childNode = parentNode.findChild(char);

            if (isNil(childNode)) {
                return null;
            }

            parentNode = childNode;
        }

        if (parentNode.data.isFinal) {
            return parentNode;
        } else {
            return null;
        }
    }

    /*prefixSeach(trie, prefix) {
        results = {};
        if (key.length === 0) {
            return results;
        }

        node = trie.root;
        for i = 0 to key.length {
            char = key[i];
            if (!node.hasChild(char)) {
                return null;
            }
            node = node.getChild(char);
        }

        foreach d of node.getDescendants() {
            if (d.isKey()) {
                results.add(d);
            }
        }

        return results;
    }*/

    constructor(comparator = null) {
        if (isNil(comparator)) {
            super(prefixTreeCharComparator);
        } else {
            super(comparator);
        }

        this.createNewRoot(new PrefixTreeNodeDataClass(null, false));
    }
}

// exports
export default PrefixTreeClass;