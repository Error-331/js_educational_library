// external imports

// internal imports
import { isNil, isString, isNumber } from '../../utils/misc/logic_utils';

// implementation
abstract class AbstractCurrency {
    private _name: string;
    private _description?: string;

    constructor(name: string, description?: string) {
        this.name = name;

        if (!isNil) {
            this.description = description;
        }
    }

    abstract get code(): string;

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    set name(name: string) {
        if (!isString(name)) {
            throw new RangeError('Cannot set name for currency - name is not a string');
        }

        this._name = name;
    }

    set description(description: string) {
        if (!isString(description)) {
            throw new RangeError('Cannot set description for currency - description is not a string');
        }

        this._description = description;
    }
}

// exports
export default AbstractCurrency;