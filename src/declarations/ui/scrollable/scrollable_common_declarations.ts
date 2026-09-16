// external imports

// internal imports

// implementation
type ScrollableContentRequestState = {
    pending: boolean;
    sawLoading: boolean;
    autoRevision: number
};

type ScrollableContentRequestProgress = {
    nodes: Node[];

    height: number;
    revision: number;

    prev: ScrollableContentRequestState;
    next: ScrollableContentRequestState;
};

type ScrollableAnchor = {
    element: Element;
    offset: number
};

// exports
export type {
    ScrollableContentRequestState,
    ScrollableContentRequestProgress,
    ScrollableAnchor,
}