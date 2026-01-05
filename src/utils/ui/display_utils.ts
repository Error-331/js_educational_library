// external imports

// internal imports
import { calcGCD } from '../math/math_base_utils';
import { isNumber } from '../misc/logic_utils';

// implementation
function calculateAspectRatio(width: number, height: number): [number, number] {
    if (!isNumber(width)) {
        throw new Error('Cannot calculate aspect ratio - width should be a number');
    }

    if (!isNumber(height)) {
        throw new Error('Cannot calculate aspect ratio - height should be a number');
    }

    const divisor = calcGCD(width, height);
    const aspectWidth = width / divisor;
    const aspectHeight = height / divisor;

    return [aspectWidth, aspectHeight]
}

// exports
export {
    calculateAspectRatio,
}