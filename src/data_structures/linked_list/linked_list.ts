// external imports

// internal imports
import { ComparatorType } from '../../declarations/utility_declarations';

import { isNil, isFunction } from '../../utils/misc/logic_utils';
import { comparatorIsEqual } from '../../utils/misc/comparator_utils';

import LinkedListNode from './linked_list_node';

// implementation
class LinkedList<DataType> {
    protected _head: LinkedListNode<DataType> | null  = null;
    protected _count: number = 0;

    protected _comparator: ComparatorType<DataType>;

    public findNode(data: DataType): LinkedListNode<DataType> | null {
        for (const node of this) {
            if (comparatorIsEqual(this._comparator(data, node.data))) {
                return node;
            }
        }

        return null;
    }

    // TODO
    public find(data: DataType): DataType | null {
        return this.findNode(data)?.data ?? null;
    }

    public indexOf(data: DataType): number {
        let current = this._head;

        for (let nodeCounter = 0; nodeCounter < this._count && !isNil(current); nodeCounter++) {
            if (comparatorIsEqual(this._comparator(data, current.data))) {
                return nodeCounter;
            }

            current = current.next;
        }

        return -1;
    }

    public push(data: DataType): LinkedListNode<DataType> {
        const node = new LinkedListNode<DataType>(data);

        if (isNil(this.head)) {
            this._head = node;
        } else {
            let current = this._head;

            while (current.next !== null) {
                current = current.next;
            }

            current.next = node;
        }

        this._count++;
        return node;
    }

    public insertBeforeHead(data: DataType): LinkedListNode<DataType> {
        const node = new LinkedListNode<DataType>(data);
        node.next = this.head;

        this._head = node;
        this._count++;

        return node;
    }

    public insertAfterNode(previousNode: LinkedListNode<DataType>, data: DataType): LinkedListNode<DataType> {
        const node = new LinkedListNode<DataType>(data);

        node.next = previousNode.next;
        previousNode.next = node;

        this._count++;
        return node;
    }

    public insert(data: DataType, index: number): LinkedListNode<DataType> | null {
        if (index >= 0 && index <= this._count) {
            if (index === 0) {
                return this.insertBeforeHead(data);
            } else {
                const previous = this.getNodeAt(index - 1);
                return this.insertAfterNode(previous, data);
            }
        }

        return null;
    }

    public removeHeadNode(): DataType {
        const node = this._head;
        this._head = node.next;

        const currentElement = node.data;
        node.abandon();

        this._count--;
        return currentElement;
    }

    public removeNextNode(previousNode: LinkedListNode<DataType>): DataType {
        const currentNode = previousNode.next
        previousNode.next = currentNode.next;

        const currentElement = currentNode.data;
        currentNode.abandon();

        this._count--;
        return currentElement;
    }

    public removeAt(index: number): DataType | null {
        if (index >= 0 && index < this._count) {
            if (index === 0) {
                return this.removeHeadNode();
            } else {
                const previous = this.getNodeAt(index - 1);
                return this.removeNextNode(previous);
            }
        }

        return null;
    }

    public remove(data: DataType): DataType | null {
        let previousNode = null;

        for (const node of this) {
            if (comparatorIsEqual(this._comparator(data, node.data))) {
                if (previousNode === null) {
                    return this.removeHeadNode();
                } else {
                    return this.removeNextNode(previousNode);
                }
            }

            previousNode = node;
        }

        return null;
    }

    public destroy(): void {
        this._head?.destroy();
        this._head = null;
        this._count = 0;

        this._comparator = null;
    }

    public toString(): string {
        if (this._head == null) {
            return '';
        }

        let objString = `${this._head.data.toString?.()}`;
        let current = this._head.next;

        for (let nodeCounter = 1; nodeCounter < this.size && current !== null; nodeCounter++) {
            objString = `${objString},${current.data.toString?.() ?? current.data}`;
            current = current.next;
        }

        return objString;
    }

    public toArray(): DataType[] {
        const dataArray = [];

        for (const node of this) {
            dataArray.push(node.data);
        }

        return dataArray;
    }

    public [Symbol.iterator](): Iterator<LinkedListNode<DataType>, undefined> {
        let nodeCounter = 0;
        let node: LinkedListNode<DataType> = null;

        const linkedList = this;

        return {
            next: function(): IteratorResult<LinkedListNode<DataType>, undefined> {
                if (nodeCounter >= linkedList._count) {
                    return { done: true, value: undefined };
                } else if (nodeCounter === 0) {
                    nodeCounter += 1;
                    node = linkedList._head;

                    return node === null ? { done: true, value: undefined } : { done: false, value: node };
                } else {
                    node = node.next;

                    if (isNil(node)) {
                        return { done: true, value: undefined };
                    } else {
                        nodeCounter += 1;
                        return { done: false, value: node };
                    }
                }
            }
        }
    }

    public getNodeAt(index: number): LinkedListNode<DataType> | null {
        if (index >= 0 && index <= this._count) {
            let node = this._head;

            for (let nodeCounter = 0; nodeCounter < index && node !== null; nodeCounter++) {
                node = node.next;
            }

            return node;
        }

        return null;
    }

    get comparator(): ComparatorType<DataType> {
        return this._comparator;
    }

    get count(): number {
        return this._count;
    }

    get size(): number {
        return this._count;
    }

    get isEmpty(): boolean {
        return this.size === 0;
    }

    get head(): LinkedListNode<DataType> | null {
        return this._head;
    }

    get lastChild(): LinkedListNode<DataType> | null {
        if (!this.isEmpty) {
            return this.getNodeAt(this.size - 1);
        } else {
            return null;
        }
    }

    set head(newHead: LinkedListNode<DataType>) {
        if (isNil(newHead)) {
            throw new RangeError('Node is not provided - cannot set new head node for linked list');
        } else {
            this._head = newHead;

            let nodeCount = 0;
            let currentNode = this._head;

            while(!isNil(currentNode)) {
                nodeCount++;
                currentNode = currentNode.next;
            }

            this._count = nodeCount;
        }
    }

    set count(count: number) {
        this._count = count;
    }

    set comparator(comparator: ComparatorType<DataType>) {
        if (!isNil(comparator)) {
            this._comparator = comparator;
        }
    }

    constructor(comparator?: ComparatorType<DataType>) {
        if (!isFunction(comparator)) {
            throw new RangeError('Cannot create linked list instance - comparator is not a function')
        }

        this.comparator = comparator;
    }
}

// exports
export default LinkedList;
