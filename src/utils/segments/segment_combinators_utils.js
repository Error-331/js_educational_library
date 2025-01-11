'use strict';

// external imports

// internal imports
import { isNumber, isArray } from './../misc/logic_utils.js';

// implementation
function combineNumericSegments(firstSegment, secondSegment) {
    if (!isArray(firstSegment)) {
        throw new Error('Cannot perform numeric segments merge, first segment pair is not an array');
    }

    if (!isArray(secondSegment)) {
        throw new Error('Cannot perform numeric segments merge, second segment pair is not an array');
    }

    const [ firstLeftSegment, firstRightSegment ] = firstSegment;
    const [ secondLeftSegment, secondRightSegment ] = secondSegment;

    if (!isNumber(firstLeftSegment)) {
        throw new Error('Cannot perform numeric segments merge, first segment start value is not numeric');
    }

    if (!isNumber(firstRightSegment)) {
        throw new Error('Cannot perform numeric segments merge, first segment end value is not numeric');
    }

    if (!isNumber(secondLeftSegment)) {
        throw new Error('Cannot perform numeric segments merge, second segment start value is not numeric');
    }

    if (!isNumber(secondRightSegment)) {
        throw new Error('Cannot perform numeric segments merge, second segment end value is not numeric');
    }

    if (
        firstLeftSegment > secondLeftSegment &&
        firstLeftSegment <= secondRightSegment
    ) {
        return [secondLeftSegment, firstRightSegment > secondRightSegment ? firstRightSegment : secondRightSegment ]
    } else if (
        firstLeftSegment < secondLeftSegment &&
        firstRightSegment >= secondLeftSegment
    ) {
        return [firstLeftSegment, firstRightSegment > secondRightSegment ? firstRightSegment : secondRightSegment]
    } else if (
        firstLeftSegment === secondLeftSegment &&
        firstRightSegment <= secondRightSegment
    ) {
        return [firstLeftSegment, secondRightSegment]
    } else {
        return null;
    }
}

// exports
export {
    combineNumericSegments,
}