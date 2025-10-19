// external imports

// internal imports
import { isClientProductionEnvironment as isClientProductionEnvironmentIonic } from './ionic_utils';
import { isClientProductionEnvironment as isClientProductionEnvironmentFirebase} from './firebase/firebase_client_utils';
import { isClientProductionEnvironment as isClientProductionEnvironmentVite } from './vite_utils';

// implementation
function isClientProductionEnvironment(): boolean | null {
    return isClientProductionEnvironmentIonic() ||
        isClientProductionEnvironmentFirebase() ||
        isClientProductionEnvironmentVite();
}

// exports
export {
    isClientProductionEnvironment,
}