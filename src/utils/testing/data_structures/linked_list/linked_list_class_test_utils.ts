// external imports

// internal imports
import LinkedList from '../../../../data_structures/linked_list/linked_list';
import LinkedListNode from '../../../../data_structures/linked_list/linked_list_node';

// implementation
function checkLinkedListEmpty<DataType>(linkedList: LinkedList<DataType>): void {
    expect(linkedList.size).toEqual(0);
    expect(linkedList.isEmpty).toEqual(true);
    expect(linkedList.head).toEqual(null);
    expect(linkedList.lastChild).toEqual(null);
}

function checkLinkedListNotEmpty<DataType>(linkedList: LinkedList<DataType>, size: number, head: DataType, lastChild: DataType): void {
    expect(linkedList.size).toEqual(size);
    expect(linkedList.isEmpty).toEqual(false);

    expect(linkedList.head.data.serialize?.() ?? linkedList.head.data).toStrictEqual(head.serialize?.() ?? head);
    expect(linkedList.lastChild.data.serialize?.() ?? linkedList.lastChild.data).toStrictEqual(lastChild.serialize?.() ?? lastChild);
}

function checkLinkedListData<DataType>(listData: DataType, testData: DataType): void {
    expect(testData.serialize?.() ?? testData).toStrictEqual(listData.serialize?.() ?? listData);
}

function checkLinkedListItem<DataType>(listNode: LinkedListNode<DataType>, testNode: LinkedListNode<DataType>): void {
    checkLinkedListData<DataType>(testNode.data, listNode.data);
}

function checkLinkedListItemAt<DataType>(linkedList: LinkedList<DataType>, itemIndex: number, testItem: DataType): void {
    const linkedListItem = linkedList.getNodeAt(itemIndex);
    checkLinkedListData<DataType>(testItem, linkedListItem.data);
}

function checkLinkedListFind<DataType>(linkedList: LinkedList<DataType>, itemIndex: number, testItemSearch: DataType, testItemStored: DataType): void {
    checkLinkedListItemAt<DataType>(linkedList, itemIndex, testItemStored);

    const linkedListItem = linkedList.find(testItemSearch);
    expect(linkedListItem.serialize?.() ?? linkedListItem).toStrictEqual(testItemStored.serialize?.() ?? testItemStored);
}

function checkLinkedListIndexOf<DataType>(linkedList: LinkedList<DataType>, itemIndex: number, testItemSearch: DataType, testItemStored: DataType): void {
    checkLinkedListItemAt<DataType>(linkedList, itemIndex, testItemStored);

    const linkedListItemIndex = linkedList.indexOf(testItemSearch);

    expect(linkedListItemIndex).toStrictEqual(itemIndex);
    checkLinkedListItemAt<DataType>(linkedList, linkedListItemIndex, testItemStored);
}

function checkLinkedListItems<DataType>(linkedList: LinkedList<DataType>, testItems: DataType[] = []): void {
    const testItemsLength = testItems.length;
    expect(linkedList.size).toEqual(testItemsLength);

    for (let itemsCnt = 0; itemsCnt < testItemsLength; itemsCnt++) {
        const testItem = testItems[itemsCnt];
        const linkedListItem = linkedList.getNodeAt(itemsCnt).data;

        expect(testItem.serialize?.() ?? testItem).toStrictEqual(linkedListItem.serialize?.() ?? linkedListItem);
    }
}

function checkLinkedListIterator<DataType>(linkedList: LinkedList<DataType>, testItems: DataType[] = []): void {
    const iteratedLinkedListItems = [];

    for (const node of linkedList) {
        iteratedLinkedListItems.push(node.data.serialize?.() ?? node.data);
    }

    expect(testItems).toStrictEqual(iteratedLinkedListItems);
}

// exports
export {
    checkLinkedListEmpty,
    checkLinkedListNotEmpty,

    checkLinkedListData,
    checkLinkedListItem,
    checkLinkedListFind,
    checkLinkedListItemAt,
    checkLinkedListIndexOf,

    checkLinkedListItems,
    checkLinkedListIterator,
};
