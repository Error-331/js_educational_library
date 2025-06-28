// external imports

// internal imports

// implementation
const env = {
    JSEL_FIREBASE_CLIENT_APP_NAME: 'test_client_web_app',
    JSEL_FIREBASE_CLIENT_APP_CONFIG_JSON_PATH: './tests/__mocks__/firebase_client_app_config.json',

    JSEL_FIREBASE_ADMIN_APP_NAME: 'test_admin_web_app',
    JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH: './tests/__mocks__/firebase_admin_app_additional_config.json',
    JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH: './tests/__mocks__/firebase_admin_service_account.json',
};

function setEnvVars(): void {
    process.env = Object.assign({}, process.env, env);
}

function resetEnvVars(): void {
    process.env = {};
}

// exports
export default env;
export { setEnvVars, resetEnvVars };