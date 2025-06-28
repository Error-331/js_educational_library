// external imports

// internal imports
import { CustomErrorName } from '../declarations/error/custom_error_declarations';
import { SerializedHTTPError } from '../declarations/error/serializable_error_declarations';

// implementation
class HTTPError extends Error {
    public name: CustomErrorName;
    protected _httpCode: number;

    constructor(message: string, httpCode: number) {
        super(message);

        this.name = CustomErrorName.HTTPError;
        this._httpCode = httpCode;

        Object.setPrototypeOf(this, HTTPError.prototype);
    }

    serialize(): SerializedHTTPError {
        return {
            name: this.name,
            message: this.message,
            httpCode: this.httpCode,
        }
    }

    get httpCode(): number {
        return this._httpCode
    }
}

// exports
export default HTTPError;