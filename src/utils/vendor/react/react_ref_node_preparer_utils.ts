// external imports

// internal imports

// implementation
function htmlElementRefNodePreparer(node: unknown): HTMLElement | null {
    if (node instanceof HTMLElement) {
        return node;
    } else {
        return null;
    }
}

// exports
export {
    htmlElementRefNodePreparer,
}