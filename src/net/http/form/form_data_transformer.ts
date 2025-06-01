// external imports

// internal imports
import { GenericObject } from '../../../declarations/collection_declarations';
import { isNil, isObject } from '../../../utils/misc/logic_utils';

// implementation
class FormDataTransformer {
    protected _formData: FormData;

    constructor(formData?: FormData) {
        this._formData = isNil(formData) ? new FormData() : formData;
    }

    public static isFormData(formDataToCheck: object): formDataToCheck is FormData {
        return isObject(formDataToCheck) && formDataToCheck instanceof FormData;
    }

    public static clone(originalFormData: FormData): FormData {
        const newFormData = new FormData;

        for (const keyValue of originalFormData.entries()) {
            newFormData.append(keyValue[0], keyValue[1]);
        }

        return newFormData;
    }

    public appendFromObject(values: GenericObject): void {
        for (const key in values) {
            if (!isNil(values[key])) {
                this._formData.append(key, values[key]);
            }
        }
    }

    public toObject(): GenericObject {
        const data: GenericObject = {};

        for (const keyValue of this._formData.entries()) {
            data[keyValue[0]] = keyValue[1];
        }

        return data;
    }

    get formData(): FormData {
        return FormDataTransformer.clone(this._formData);
    }
}

// exports
export default FormDataTransformer;