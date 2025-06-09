# JS Educational library

My small JS multipurpose library used for educational purposes.

## Environment variables (.env)

- **JSEL_FIREBASE_CLIENT_APP_NAME** - Firebase client app name;
- **JSEL_FIREBASE_ADMIN_APP_NAME** - Firebase admin app name;
- **GOOGLE_APPLICATION_CREDENTIALS** - path to GCP service account file (JSON);
- **JSEL_FIREBASE_CLIENT_APP_CONFIG_JSON_PATH** - path to Firebase app configuration;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH** - path to GCP service account file (JSON);
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH** - path to JSON file which may contain additional configuration (like Firebase storage bucket) for Firebase application;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON** - GCP service account JSON represented either as plain string or encrypted string;
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON** - JSON file (represented either as plain string or encrypted string) which may contain additional configuration (like Firebase storage bucket) for Firebase application;
- **JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_CRYPTO_CONFIG** - configuration file which is used to decrypt *JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON* represented as stringified JSON;
- **JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_CRYPTO_CONFIG** - configuration file which is used to decrypt *JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON* represented as stringified JSON;

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

## TODO

- mergeSortSegmentsByLeftBoundary can be more efficient;
