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

function eq(value1: number, value2: number): boolean {
    return value1 === value2;
}

function lt(value: number, boundary: number): boolean {
    return value < boundary;
}

function gt(value: number, boundary: number): boolean {
    return value > boundary;
}

function lte(value: number, boundary: number): boolean {
    return value <= boundary;
}

function gte(value: number, boundary: number): boolean {
    return value >= boundary;
}

function between(leftBoundary: number, rightBoundary: number, value: number): boolean {
    return (gt(value, leftBoundary) && lt(value, rightBoundary)) ||
        eq(value, leftBoundary) ||
        eq (value, rightBoundary);
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
    eq,
    lt,
    gt,
    lte,
    gte,
    between,
    calcPagesCount,
}
