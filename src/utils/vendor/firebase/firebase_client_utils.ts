// external imports

// internal imports
import { isString } from '../../misc/logic_utils';

// implementation
function isClientProductionEnvironment(): boolean | null {
    if (!isString(process.env.NODE_ENV)) {
        return null;
    } else {
        return process.env.NODE_ENV === 'development';
    }
}

// exports
export {
    isClientProductionEnvironment,
}