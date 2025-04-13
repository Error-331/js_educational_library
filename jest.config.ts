// external imports
import type { Config } from 'jest';

// internal imports

// implementation
const config: Config = {
    verbose: true,

    setupFiles: [
        './tests/.jest/set_env_vars.ts',
        './tests/.jest/reset_npm_modules_mocks.ts',
    ],

    testPathIgnorePatterns: [
        './tests/algorithms/',
        './tests/data_structures/',
        './tests/errors/',
        './tests/state_machines/',
        './tests/utils/async',
        './tests/utils/hashing',
        './tests/utils/misc',
        './tests/utils/physics',
        //'./tests/utils/primitives',
        './tests/utils/testing',
        './tests/utils/validators',
        './tests/validators/',
        './tests/net/',
       // './tests/registers/firebase'
    ],

    roots: [
        './tests/'
    ]
};

// exports
export default config;