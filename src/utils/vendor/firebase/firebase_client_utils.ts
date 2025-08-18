// external imports

// internal imports
import { isString } from '../../misc/logic_utils';

// implementation
function isClientProductionEnvironment(): boolean | null {
    if (!isString(process.env.NODE_ENV)) {
        return null;
    } else {
        console.log('test2', process.env.NODE_ENV === 'production');
        return process.env.NODE_ENV === 'production';
    }
}

// exports
export {
    isClientProductionEnvironment,
}