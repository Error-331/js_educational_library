# JS Educational library

My small JS multipurpose library used for educational purposes.

## Environment variables (.env)

### Common options

- **JSEL_SERVER_FRAMEWORK_VENDOR_NAME** - name of the host server framework (like `ExpressJS`, `NextJS`, etc.);
- **JSEL_COMMON_PRIVATE_KEY** (optional) - key that is used in various places across the project (sort of GCP service account private key, usually created following command: `openssl genrsa -out private.pem 2048`);

### Cookies related options

- **JSEL_DEFAULT_SET_COOKIES_STORE_OPTIONS_TYPE** - type of the cookie configuration;
- **JSEL_DEFAULT_JWT_SET_COOKIES_STORE_OPTIONS_TYPE** - type of the JWT cookie configuration (possible values: `jwt_unsecure`);

### GCP related

- **GOOGLE_APPLICATION_CREDENTIALS** - path to GCP service account file (JSON);

#### Gen AI related

- **JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON** - GCP Gen AI admin options (contains such options as api key, etc.);
- **JSEL_GCP_GENAI_ADMIN_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON* represented as stringified JSON;

### Firebase related

- **JSEL_FIREBASE_ADMIN_APP_NAME** - Firebase admin app name;
- **JSEL_FIREBASE_CLIENT_APP_CONFIG_JSON_PATH** - path to Firebase app configuration;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH** - path to GCP service account file (JSON);
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH** - path to JSON file which may contain additional configuration (like Firebase storage bucket) for Firebase application;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON** - GCP service account JSON represented either as plain string or encrypted string;
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON** - JSON file (represented either as plain string or encrypted string) which may contain additional configuration (like Firebase storage bucket) for Firebase application;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_CRYPTO_CONFIG** - configuration file which is used to decrypt *JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON* represented as stringified JSON;
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_CRYPTO_CONFIG** - configuration file which is used to decrypt *JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON* represented as stringified JSON;

#### Firestore

- **JSEL_FIREBASE_FIRESTORE_DB_NAME** - current Firebase Firestore database name (if not set - `(default)` name will be used);

### Facebook related

- **JSEL_FACEBOOK_SERVER_OPTIONS_JSON** - Facebook server options (contains such options as application id, application secret, etc.);
- **JSEL_FACEBOOK_SERVER_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_FACEBOOK_SERVER_OPTIONS_JSON* represented as stringified JSON;

### Instagram related

- **JSEL_INSTAGRAM_SERVER_OPTIONS_JSON** - Instagram server options (contains such options as client id, client secret, version, etc.);
- **JSEL_INSTAGRAM_SERVER_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_INSTAGRAM_SERVER_OPTIONS_JSON* represented as stringified JSON;

### TikTok related

- **JSEL_TIKTOK_SERVER_OPTIONS_JSON** - TikTok server options (contains such options as client key, client secret, etc.);
- **JSEL_TIKTOK_SERVER_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_TIKTOK_SERVER_OPTIONS_JSON* represented as stringified JSON;

### Stripe related

- **JSEL_STRIPE_SERVER_OPTIONS_JSON** - Stripe server options (contains such options as publishable key, secret key, etc.);
- **JSEL_STRIPE_SERVER_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_STRIPE_SERVER_OPTIONS_JSON* represented as stringified JSON;

### Vite related

- **VITE_JSEL_CLIENT_ENV** - flag which indicates which environment client is running in;

### Civitai related

- **JSEL_CIVITAI_SERVER_OPTIONS_JSON** - CivitAI server options (contains such options as api key, etc.);
- **JSEL_CIVITAI_SERVER_OPTIONS_CRYPTO_CONFIG** - configuration JSON which is used to decrypt *JSEL_CIVITAI_SERVER_OPTIONS_JSON* represented as stringified JSON;

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
