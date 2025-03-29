// external imports

// internal imports

// implementation
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

// exports
export {
    eq,
    lt,
    gt,
    lte,
    gte,
    between,
}
