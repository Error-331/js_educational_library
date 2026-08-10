// external imports

// internal imports
import { DisplayOrientation } from '../../declarations/display_declarations';

import { calcGCD } from '../math/math_base_utils';
import { isNumber } from '../misc/logic_utils';

// implementation
function calculateAspectRatio(width: number, height: number): [number, number] {
    if (!isNumber(width)) {
        throw new RangeError('Cannot calculate aspect ratio - width should be a number');
    }

    if (!isNumber(height)) {
        throw new RangeError('Cannot calculate aspect ratio - height should be a number');
    }

    const divisor = calcGCD(width, height);
    const aspectWidth = width / divisor;
    const aspectHeight = height / divisor;

    return [aspectWidth, aspectHeight]
}

function calculateAspectRatioValue(width: number, height: number): number {
    if (!isNumber(width)) {
        throw new RangeError('Cannot calculate aspect ratio value - width should be a number');
    }

    if (!isNumber(height)) {
        throw new RangeError('Cannot calculate aspect ratio value - height should be a number');
    }

    if (width <= 0) {
        throw new RangeError('Cannot calculate aspect ratio value - width must be greater than zero')
    }

    if (height <= 0) {
        throw new RangeError('Cannot calculate aspect ratio value - height must be greater than zero')
    }

    return width / height;
}

function determineOrientation(width: number, height: number): DisplayOrientation {
    const aspectRatio = calculateAspectRatioValue(width, height);

    return aspectRatio > 1.2 ?
        DisplayOrientation.Landscape :
        aspectRatio < 0.8 ? DisplayOrientation.Portrait : DisplayOrientation.Square;
}

// exports
export {
    calculateAspectRatio,
    calculateAspectRatioValue,
    determineOrientation,
}