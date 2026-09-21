// external imports

// internal imports

// implementation
type ScrollableLazyLoadListSettings = {
    id?: string;

    className?: string;
    loadingPrev?: boolean;

    loadingNext: boolean;
    /** Allow loading in either direction (default: true). */
    canLoad?: boolean;

    hasPrev?: boolean;
    hasNext: boolean;

    onLoadPrev?: () => unknown;
    onLoadNext: () => unknown;

    /** Distance in pixels from the top that triggers loading. */
    topTrigger?: number;
    /** Distance in pixels from the bottom that triggers loading. */
    bottomTrigger?: number;

    /** Preserve the visible item across prepends. Use stable child keys (default: true). */
    keepScroll?: boolean;
    /** Access the rendered list element. */
    containerRef?: { current: HTMLDivElement | null }
    /** Observe this external scroller instead of scrolling the list itself. Changes require a React commit. */
    parentContainerRef?: { current: HTMLDivElement | null }
};

type ScrollableLazyLoadListControllerSettings = Required<Pick<ScrollableLazyLoadListSettings,
    'loadingPrev' |
    'loadingNext' |
    'canLoad' |
    'hasPrev' |
    'hasNext' |
    'topTrigger' |
    'bottomTrigger' |
    'keepScroll'>> &
    Pick<ScrollableLazyLoadListSettings, 'onLoadPrev' | 'onLoadNext' | 'parentContainerRef'>;

// exports
export {
    ScrollableLazyLoadListSettings,
    ScrollableLazyLoadListControllerSettings,
}