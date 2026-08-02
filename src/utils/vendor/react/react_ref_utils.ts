// external imports

// internal imports
import { isNil } from '../../misc/logic_utils';

// implementation
function onRefNodeProcessByMap(nodeKey: string, refNodePreparer: (node: unknown) => HTMLElement | null, nodeMap: Map<string, HTMLElement | null> | null, node?: unknown): void {
    if (isNil(nodeMap)) {
        return;
    }

    if (!isNil(node)) {
        nodeMap.set(nodeKey, refNodePreparer(node))
    } else {
        if (nodeMap.has(nodeKey)) {
            nodeMap.delete(nodeKey);
        }
    }
}

// exports
export {
    onRefNodeProcessByMap,
}