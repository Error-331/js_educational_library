// external imports
import type { Config } from 'jest';

// internal imports

// implementation
const config: Config = {
    verbose: true,

    testPathIgnorePatterns: [
        './tests/algorithms/',
        './tests/data_structures/',
        './tests/errors/',
        './tests/state_machines/',
        './tests/utils/',
        './tests/validators/'
    ],

    roots: [
        './tests'
    ]
};

// exports
export default config;