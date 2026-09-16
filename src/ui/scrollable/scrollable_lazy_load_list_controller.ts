// external imports

// internal imports
import { ScrollableLazyLoadListControllerSettings } from '../../declarations/ui/scrollable/scrollable_lazy_load_list_declarations';
import { ScrollableAnchor, ScrollableContentRequestProgress } from '../../declarations/ui/scrollable/scrollable_common_declarations';

import { ScrollLoadDirection } from '../../constants/ui/scrollable_constants';

// implementation
/** Owns DOM subscriptions and cancellable work for exactly one scroll container. */
function createScrollableLazyLoadListController(
    container: HTMLDivElement,
    content: HTMLDivElement,

    getSettings: () => ScrollableLazyLoadListControllerSettings,
    isCurrentContainer: () => boolean,

    progress: ScrollableContentRequestProgress,
) {
    let anchors: ScrollableAnchor[] = [];

    let scrollTop = container.scrollTop;
    let direction: ScrollLoadDirection | null = null;

    let timer: number | undefined;
    let frame: number | undefined;
    let fillFrame: number | undefined;

    let trailing = false;
    let disposed = false;

    const previousOverflowAnchor = container.style.overflowAnchor;

    // One owner of scroll correction, including when an external container is used.
    container.style.overflowAnchor = 'none';

    const viewportTop = () => {
        return container.getBoundingClientRect().top + container.clientTop;
    }

    const captureAnchorsAndScrollTop = () => {
        const top = viewportTop();
        const bottom = top + container.clientHeight;

        anchors = [];

        for (const element of content.children) {
            const rect = element.getBoundingClientRect();

            if (rect.bottom > top && rect.top < bottom) {
                anchors.push({ element, offset: rect.top - top });
            }

            if (rect.top >= bottom) {
                break;
            }
        }

        scrollTop = container.scrollTop;
    };

    const request = (next: boolean, automatic: boolean) => {
        // An ancestor can replace ref.current after layout effect, before passive effects rebind the listener.
        // Ignore work for that old target.

        if (disposed || !isCurrentContainer()) {
            return;
        }

        const settings = getSettings();
        const state = next ? progress.next : progress.prev;
        const callback = next ? settings.onLoadNext : settings.onLoadPrev;
        const available = next ? settings.hasNext : settings.hasPrev;
        const loading = next ? settings.loadingNext : settings.loadingPrev;

        if (!settings.canLoad ||
            !available ||
            loading ||
            !callback ||
            state.pending ||
            (automatic && state.autoRevision === progress.revision)
        ) {
            return;
        }

        state.pending = true;
        state.sawLoading = false;
        state.autoRevision = progress.revision;

        callback();
    };

    const checkEdge = () => {
        frame = undefined;

        if (disposed || container.clientHeight === 0) {
            return;
        }

        const settings = getSettings();

        if (direction === ScrollLoadDirection.Next &&
            container.scrollTop + container.clientHeight + settings.bottomTrigger >= container.scrollHeight) {
            request(true, false);
        } else if (direction === ScrollLoadDirection.Previous &&
            container.scrollHeight > container.clientHeight && container.scrollTop <= settings.topTrigger) {
            request(false, false);
        }
    };

    const scheduleEdge = () => {
        if (frame === undefined) {
            frame = window.requestAnimationFrame(checkEdge);
        }
    };

    const endWindow = () => {
        timer = undefined;

        if (trailing) {
            trailing = false;
            scheduleEdge();
            timer = window.setTimeout(endWindow, 500);
        }
    };

    const onScroll = () => {
        if (!isCurrentContainer())  {
            return;
        }

        const current = container.scrollTop;

        if (current === scrollTop) {
            return;
        }

        direction = current > scrollTop ? ScrollLoadDirection.Next : ScrollLoadDirection.Previous;
        captureAnchorsAndScrollTop();

        if (timer === undefined) {
            scheduleEdge();
            timer = window.setTimeout(endWindow, 500);
        } else {
            trailing = true;
        }
    };

    const sync = () => {
        if (disposed || !isCurrentContainer()) {
            return;
        }

        const settings = getSettings();
        if (settings.keepScroll) {
            const anchor = anchors.find(({ element }) => content.contains(element));

            if (anchor) {
                // Ref consumers can scroll in a parent layout effect before a scroll event arrives.
                // Preserve that movement, only correct layout changes.
                // Shrinking content can instead clamp scrollTop.
                const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
                const clamped = scrollTop > maxScroll && container.scrollTop === maxScroll;
                const pendingScroll = clamped ? 0 : container.scrollTop - scrollTop;
                const delta = anchor.element.getBoundingClientRect().top - viewportTop() - anchor.offset + pendingScroll;

                if (Math.abs(delta) > 0.5) {
                    container.scrollTop += delta;
                    // A layout correction must not look like the reader scrolled to an edge.
                    direction = null;
                }
            }
        }

        captureAnchorsAndScrollTop();

        // Exclude loader height and React element identity: neither is data progress.
        const nodes = Array.from(content.childNodes);
        const height = content.getBoundingClientRect().height;
        const changed = height !== progress.height
            || nodes.length !== progress.nodes.length
            || nodes.some((node, index) => node !== progress.nodes[index]);

        if (changed) {
            progress.nodes = nodes;
            progress.height = height;
            progress.revision++;
        }

        for (const [state, loading, available] of [
            [progress.prev, settings.loadingPrev, settings.hasPrev],
            [progress.next, settings.loadingNext, settings.hasNext],
        ] as const) {
            if (loading) {
                state.sawLoading = true;
            }

            if (changed || !available || (!loading && state.sawLoading)) {
                state.pending = false;
                state.sawLoading = false;
            }
        }

        if (fillFrame !== undefined) {
            window.cancelAnimationFrame(fillFrame);
        }

        fillFrame = window.requestAnimationFrame(() => {
            fillFrame = undefined;
            const latest = getSettings();

            if (disposed || container.clientHeight === 0 || container.scrollHeight > container.clientHeight) {
                return;
            }

            // Do not fall back to previous while the preferred next page is in flight.
            if (latest.hasNext) {
                request(true, true);
            } else if (latest.hasPrev) {
                request(false, true);
            }
        });
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(container);
    observer.observe(content);

    captureAnchorsAndScrollTop();

    return {
        container,
        sync,
        dispose() {
            disposed = true;

            container.removeEventListener('scroll', onScroll);
            observer.disconnect();
            window.clearTimeout(timer);

            if (frame !== undefined) {
                window.cancelAnimationFrame(frame);
            }

            if (fillFrame !== undefined) {
                window.cancelAnimationFrame(fillFrame);
            }

            container.style.overflowAnchor = previousOverflowAnchor;
        },
    };
}

// exports
export {
    createScrollableLazyLoadListController,
}