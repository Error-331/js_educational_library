# JS Educational library

My small JS multipurpose library used for educational purposes.

## Environment variables (.env)

### Common options

- **JSEL_SERVER_FRAMEWORK_VENDOR_NAME** - name of the host server framework (like `ExpressJS`, `NextJS`, etc.);

### Cookies related options

- **JSEL_DEFAULT_SET_COOKIES_STORE_OPTIONS_TYPE** - type of the cookie configuration;
- **JSEL_DEFAULT_JWT_SET_COOKIES_STORE_OPTIONS_TYPE** - type of the JWT cookie configuration (possible values: `jwt_unsecure`);

### Firebase related

- **JSEL_FIREBASE_ADMIN_APP_NAME** - Firebase admin app name;
- **GOOGLE_APPLICATION_CREDENTIALS** - path to GCP service account file (JSON);
- **JSEL_FIREBASE_CLIENT_APP_CONFIG_JSON_PATH** - path to Firebase app configuration;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH** - path to GCP service account file (JSON);
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH** - path to JSON file which may contain additional configuration (like Firebase storage bucket) for Firebase application;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON** - GCP service account JSON represented either as plain string or encrypted string;
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON** - JSON file (represented either as plain string or encrypted string) which may contain additional configuration (like Firebase storage bucket) for Firebase application;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_CRYPTO_CONFIG** - configuration file which is used to decrypt *JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON* represented as stringified JSON;
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_CRYPTO_CONFIG** - configuration file which is used to decrypt *JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON* represented as stringified JSON;

### Facebook related

- **JSEL_FACEBOOK_SERVER_OPTIONS_JSON** - Facebook server options (contains such options as application id, application secret, etc.);
- **JSEL_FACEBOOK_SERVER_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_FACEBOOK_SERVER_OPTIONS_JSON* represented as stringified JSON;

### TikTok related

- **JSEL_TIKTOK_SERVER_OPTIONS_JSON** - TikTok server options (contains such options as client key, client secret, etc.);
- **JSEL_TIKTOK_SERVER_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_TIKTOK_SERVER_OPTIONS_JSON* represented as stringified JSON;

### Vite related

- **VITE_JSEL_CLIENT_ENV** - flag which indicates which environment client is running in;

### 'JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_CRYPTO_CONFIG' structure

```json

{
  "encryptorName": "CHA_CHA20_POLY1305_BASE64",
  "key": "XXX"
}

```

### JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON

```json

{
  "encryptorName": "CHA_CHA20_POLY1305_BASE64",
  "key": "XXX"
}

```

## Examples

### env.local (shared emulator)

```text

FIRESTORE_EMULATOR_HOST='127.0.0.1:8080'

JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_CRYPTO_CONFIG='{"encryptorName": "PLAIN_TEXT", "key": ""}'
JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON='{"projectId": "demo-test"}'


```

## TODO

- mergeSortSegmentsByLeftBoundary can be more efficient;
