// external imports

// internal imports

// implementation
type MockFirebaseClientAppOptions = {
    apiKey?: string;
    authDomain?: string;
    databaseURL?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    measurementId?: string;
};

type MockFirebaseClientApp = {
    readonly name: string;
    readonly options: MockFirebaseClientAppOptions;
}

type MockFirebaseClientAppAuth = {
    readonly app: MockFirebaseClientApp;
    readonly name: string;
    readonly config: MockFirebaseClientAppOptions;
}

type MockServiceAccount = {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
};

type MockServiceAccountJSONData = {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
};

type MockGoogleOAuthAccessToken = {
    access_token: string;
    expires_in: number;
};

type MockCredential = {
    getAccessToken(): Promise<MockGoogleOAuthAccessToken>;
};

type MockFirebaseClientAdminAppOptions = {
    credential: MockCredential;
    storageBucket: string;
};

type MockFirebaseAdminApp = {
    readonly name: string;
    readonly options: MockFirebaseClientAdminAppOptions;
}

type MockFirebaseAdminAppAuth = {
    readonly app: MockFirebaseAdminApp;
}

// exports
export {
    MockFirebaseClientAppOptions,
    MockFirebaseClientApp,

    MockFirebaseClientAppAuth,
    MockServiceAccount,
    MockServiceAccountJSONData,

    MockGoogleOAuthAccessToken,
    MockCredential,

    MockFirebaseClientAdminAppOptions,
    MockFirebaseAdminApp,

    MockFirebaseAdminAppAuth,
}