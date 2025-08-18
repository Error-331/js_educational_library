// external imports

// internal imports
import { isBoolean } from '../misc/logic_utils';

// implementation
function isClientProductionEnvironment(): boolean | null {
    if (!isBoolean(import.meta.env?.PROD)) {
        return null;
    } else {
        return import.meta.env?.PROD === true;
    }
}

// exports
export {
    isClientProductionEnvironment,
}