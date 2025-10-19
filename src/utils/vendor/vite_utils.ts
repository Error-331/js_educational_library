// external imports

// internal imports
import { isString } from '../misc/logic_utils';

// implementation
function isClientProductionEnvironment(): boolean | null {
    if (!isString(import.meta.env.VITE_JSEL_CLIENT_ENV)) {
        return null;
    } else {
        return import.meta.env.VITE_JSEL_CLIENT_ENV === 'production';
    }
}

// exports
export {
    isClientProductionEnvironment,
}