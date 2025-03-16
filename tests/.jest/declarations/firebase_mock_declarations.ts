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

// exports
export {
    MockFirebaseClientAppOptions,
    MockFirebaseClientApp,

    MockFirebaseClientAppAuth,
}