// external imports

// internal imports
import { htmlElementRefNodePreparer } from '../react/react_ref_node_preparer_utils';
import { isObjectOfType } from '../../primitives/object_utils';
import { isFunction, isObject } from '../../misc/logic_utils';

// implementation
function antdParentClosestRowRefNodePreparer(node: unknown): HTMLElement | null {
    const parentRow = htmlElementRefNodePreparer(node)?.parentElement?.closest('.ant-row');

    if (parentRow instanceof HTMLElement) {
        return parentRow;
    } else {
        return null;
    }
}

function antdFormItemClosestRowRefNodePreparer(node: unknown): HTMLElement | null {
    if (isObjectOfType<HTMLElement>(node, { closest: isFunction })) {
        return node.closest('.ant-row');
    } else {
        return null;
    }
}

function antdFormItemInputClosestRowRefNodePreparer(node: unknown): HTMLElement | null {
    if (isObjectOfType<{ nativeElement: HTMLElement }>(node, { nativeElement: (element: unknown) => isObject(element) && 'nativeElement' in element })) {
        return node.nativeElement.closest('.ant-row');
    } else {
        return null;
    }
}

function antdFormItemTextAreaClosestRowRefNodePreparer(node: unknown): HTMLElement | null {
    if (isObjectOfType<{ resizableTextArea: { textArea: HTMLElement } }>(node, { resizableTextArea: (element: unknown) => isObject(element) && 'textArea' in element })) {
        return node.resizableTextArea.textArea.closest('.ant-row');
    } else {
        return null;
    }
}

// exports
export {
    antdParentClosestRowRefNodePreparer,
    antdFormItemClosestRowRefNodePreparer,
    antdFormItemInputClosestRowRefNodePreparer,
    antdFormItemTextAreaClosestRowRefNodePreparer,
}