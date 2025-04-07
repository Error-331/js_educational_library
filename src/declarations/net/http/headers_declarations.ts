// external imports

// internal imports

// implementation
type HTTPHeadersObject = {
    [key: string]: string,
};

type HTTPHeadersCollection = Headers | HTTPHeadersObject;

// exports
export {
    HTTPHeadersObject,
    HTTPHeadersCollection,
}