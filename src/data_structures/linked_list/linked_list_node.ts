// external imports

// internal imports
import { isObject, isNil } from '../../utils/misc/logic_utils';

// implementation
class LinkedListNode<DataType> {
    protected _data: DataType | null = null;
    protected _next: LinkedListNode<DataType> | null = null;

    public clear(): void {
        this._data = null;
    }

    public unlink(): void {
        this._next = null;
    }

    public abandon(): void {
        this.clear();
        this.unlink();
    }

    public destroy(): void {
        if (isObject(this._data)) {
            this._data?.destroy();
        }

        if (isNil(this._next)) {
            this._next?.destroy();
        }

        this.abandon();
    }

    get data(): DataType | null {
        return this._data;
    }

    get next(): LinkedListNode<DataType> | null {
        return this._next;
    }

    set data(data: DataType | null) {
        this._data = data;
    }

    set next(node: LinkedListNode<DataType> | null) {
        this._next = node;
    }

    constructor(data: DataType | null) {
        this._data = data;
    }
}

// export
export default LinkedListNode;
