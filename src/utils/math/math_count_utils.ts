// external imports

// internal imports

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

// exports
export {
    digitsCount,
    calcPagesCount,
}