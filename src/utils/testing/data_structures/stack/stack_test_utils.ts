// external imports

// internal imports
import { Serializable } from '../../../../declarations/common_interfaces_declarations';

import Stack from '../../../../data_structures/stack/stack';

import { isObjectOfType } from '../../../primitives/object_utils';
import { isFunction } from '../../../misc/logic_utils';

// implementation
function checkRegularStackEmpty<StackItemType>(stack: Stack<StackItemType>): void {
    expect(stack.size).toEqual(0);
    expect(stack.isEmpty).toBeTruthy();
}

function checkRegularStackNotEmpty<StackItemType>(stack: Stack<StackItemType>, size: number, head: StackItemType): void {
    expect(stack.size).toEqual(size);
    expect(stack.isEmpty).toBeFalsy();

    let currentStackItem: StackItemType | object = stack.peek();
    let testStackItem: StackItemType | object = head;

    if (isObjectOfType<Serializable<object>>(currentStackItem, { serialize: isFunction })) {
        currentStackItem = currentStackItem.serialize();
    }

    if (isObjectOfType<Serializable<object>>(head, { serialize: isFunction })) {
        testStackItem = head.serialize();
    }

    expect(currentStackItem).toStrictEqual(testStackItem);
}

function checkRegularStackItems<StackItemType>(stack: Stack<StackItemType>, testItems: StackItemType[] = [], idShift: number = 0): void {
    const testItemsLength = testItems.length;
    expect(stack.size).toEqual(testItemsLength);

    let itemsCount = 0;

    for (const { id, item } of stack) {
        itemsCount += 1;

        let currentStackItem: StackItemType | object = item;
        let testStackItem: StackItemType | object = testItems[id];

        if (isObjectOfType<Serializable<object>>(item, { serialize: isFunction })) {
            currentStackItem = item.serialize();
        }

        if (isObjectOfType<Serializable<object>>(testStackItem, { serialize: isFunction })) {
            testStackItem = testStackItem.serialize();
        }

        expect(currentStackItem).toStrictEqual(testStackItem);
    }

    expect(itemsCount).toEqual(testItems.length);
}

// exports
export {
    checkRegularStackEmpty,
    checkRegularStackNotEmpty,
    checkRegularStackItems,
}
