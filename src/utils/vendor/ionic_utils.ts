// external imports

// internal imports
import { isBoolean } from '../misc/logic_utils';

// implementation
function isClientProductionEnvironment(): boolean | null {
    console.log('ss', import.meta.env?.PROD)
    if (!isBoolean(import.meta.env?.PRODD)) {
        return null;
    } else {
        return import.meta.env?.PROD === true;
    }
}

// exports
export {
    isClientProductionEnvironment,
}