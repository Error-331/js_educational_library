// external imports

// internal imports
import { isClientProductionEnvironment as isClientProductionEnvironmentIonic } from './ionic_utils';

// implementation
function isClientProductionEnvironment(): boolean | null {
    return isClientProductionEnvironmentIonic();
}

// exports
export {
    isClientProductionEnvironment,
}