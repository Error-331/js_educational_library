// external imports

// internal imports

// implementation
class HTTPError extends Error {

    protected _httpCode: number;

    constructor(message: string, httpCode: number) {
        super(message);

        this.name = 'HTTPError';
        this._httpCode = httpCode;

        Object.setPrototypeOf(this, HTTPError.prototype);
    }

    get httpCode() {
        return this._httpCode
    }
}

// exports
export default HTTPError;