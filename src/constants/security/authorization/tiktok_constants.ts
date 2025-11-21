// external imports

// internal imports
import type { GenericObject } from '../../../declarations/collection_declarations';

// implementation
const TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_URL = 'https://www.tiktok.com/v2/auth/authorize/';

const TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION: Readonly<GenericObject> = Object.freeze({
    scrollbars: 'no',
    resizable: 'no',
    status: 'no',
    location: 'no',
    toolbar: 'no',
    menubar: 'no',
    width: 800,
    height: 800,
    left: -1000,
    top: -1000
});

// exports
export {
    TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_URL,
    TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION,
}