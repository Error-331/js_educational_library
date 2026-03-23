// external imports

// internal imports
import type { GenericObject } from '../../../declarations/collection_declarations';

// implementation
const INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_URL = 'https://www.instagram.com/oauth/authorize/';

const INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION: Readonly<GenericObject> = Object.freeze({
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

const INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME = 'onJSELInstagramOAuthResolve';

// exports
export {
    INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_URL,
    INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION,
    INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME,
}