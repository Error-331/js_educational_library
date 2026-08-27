// external imports

// internal imports
import { isNil, isArray } from '../../misc/logic_utils';

// implementation
function formatBytes(bytes: number, decimals = 2, units = ['B', 'KB', 'MB', 'GB', 'TB']): string {
    if (isNil(bytes)) {
        throw new RangeError('Cannot format bytes - value is not provided');
    }

    if (!Number.isFinite(bytes)) {
        throw new RangeError('Cannot format bytes - provided value must be a finite number');
    }

    if (bytes < 0) {
        throw new RangeError('Cannot format bytes - provided value must be non-negative number');
    }

    if (bytes === 0) {
        return `0 ${units[0]}`;
    }

    if (!isArray(units)) {
        throw new RangeError('Cannot format bytes - provided units value must be an array');
    }

    if (units.length < 5) {
        throw new RangeError('Cannot format bytes - provided units array must contain at least 5 entries');
    }

    const unitIndex = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        units.length - 1
    );

    const value = bytes / 1024 ** unitIndex;
    const formatted = Number(value.toFixed(decimals));

    return `${formatted} ${units[unitIndex]}`;
}

// exports
export {
    formatBytes,
}