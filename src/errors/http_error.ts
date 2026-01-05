// external imports

// internal imports
import { CustomErrorName } from '../declarations/error/custom_error_declarations';
import { SerializedHTTPError } from '../declarations/error/serializable_error_declarations';
import { Serializable } from '../declarations/common_interfaces_declarations';

// implementation
class HTTPError extends Error implements Serializable<SerializedHTTPError> {
    public name: CustomErrorName;
    protected _httpCode: number;
    protected _isProxy: boolean;

    constructor(message: string, httpCode: number, isProxy: boolean = false) {
        super(message);

        this.name = CustomErrorName.HTTPError;
        this._httpCode = httpCode;
        this._isProxy = isProxy;

        Object.setPrototypeOf(this, HTTPError.prototype);
    }

    serialize(): SerializedHTTPError {
        return {
            name: this.name,
            message: this.message,
            httpCode: this.httpCode,
            isProxy: this.isProxy,
        }
    }

    get httpCode(): number {
        return this._httpCode
    }

    get isProxy(): boolean {
        return this._isProxy;
    }
}

// exports
export default HTTPError;