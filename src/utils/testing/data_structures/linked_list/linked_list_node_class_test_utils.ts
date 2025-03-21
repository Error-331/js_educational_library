// external imports

// internal imports
import LinkedListNode from '../../../../data_structures/linked_list/linked_list_node';

// implementation
function checkLinkedListNodeDestroyed<DataType>(linkedListNode: LinkedListNode<DataType>): void {
    expect(linkedListNode.data).toStrictEqual(null);
    expect(linkedListNode.next).toStrictEqual(null);
}

// exports
export {
    checkLinkedListNodeDestroyed,
}
