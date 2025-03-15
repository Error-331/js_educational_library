// external imports

// internal imports
import {
    COMPARATOR_EQUAL,
} from '../../constants/comparator_constants';

import { isNil, isFunction } from '../misc/logic_utils';

// implementation
function leftSegmentComparator(segmentElementComparator, first, second) {
    if (!isFunction(segmentElementComparator)) {
        throw new Error('Cannot merge segments - segment element comparator is not a function');
    }

    if (isNil(first)) {
        throw new Error('Cannot perform comparison, "first" cannot be "Nil"');
    }

    if (isNil(second)) {
        throw new Error('Cannot perform comparison, "second" cannot be "Nil"');
    }

    const [ firstLeftSegment, firstRightSegment ] = first === Infinity ? [Infinity, Infinity] : first;
    const [ secondLeftSegment, secondRightSegment ] = second === Infinity ? [Infinity, Infinity] : second;

    if (segmentElementComparator(firstLeftSegment, secondLeftSegment) === COMPARATOR_EQUAL) {
        return segmentElementComparator(firstRightSegment, secondRightSegment) === COMPARATOR_EQUAL ?
            COMPARATOR_EQUAL :
            segmentElementComparator(firstRightSegment, secondRightSegment);
    } else {
        return segmentElementComparator(firstLeftSegment, secondLeftSegment);
    }
}

// exports
export {
    leftSegmentComparator,
}