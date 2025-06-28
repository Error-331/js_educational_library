// external imports

// internal imports
import { isNumber } from '../misc/logic_utils';

// implementation
function digitsCount(usrNumber: number): number {
    let count = 0;
    if (usrNumber >= 1) {
        ++count;
    }

    while (usrNumber / 10 >= 1) {
        usrNumber /= 10;
        ++count;
    }

    return count;
}

function calcPagesCount(elementsCount: number, pageSize: number): number {
    if (pageSize >= elementsCount) {
        return 1;
    }

    const divisionReminder = elementsCount % pageSize;

    if (divisionReminder > 0) {
        return Math.floor(elementsCount / pageSize) + 1;
    } else {
        return elementsCount / pageSize;
    }
}

function calcElementsOffset(pageNumber: number, elementsPerPage: number): number {
    if (!isNumber(pageNumber)) {
        throw new RangeError('Cannot calculate offset value - page number is not a number');
    }

    if (!isNumber(elementsPerPage)) {
        throw new RangeError('Cannot calculate offset value - "elements per page" value must be of type number');
    }

    if (pageNumber <= 0) {
        throw new RangeError('Cannot calculate offset value - page number cannot be less than or equal to zero');
    }

    if (elementsPerPage <= 0) {
        throw new RangeError('Cannot calculate offset value - "elements per page" cannot be less than or equal to zero');
    }

    return (pageNumber - 1) * elementsPerPage;
}

// exports
export {
    digitsCount,
    calcPagesCount,
    calcElementsOffset,
}