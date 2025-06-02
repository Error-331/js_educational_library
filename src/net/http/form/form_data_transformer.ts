// external imports

// internal imports
import { GenericObject } from '../../../declarations/collection_declarations';

import { extractBinaryDataFromFile } from '../../../utils/file/general_file_utils';
import { isNil, isString, isObject } from '../../../utils/misc/logic_utils';

// implementation
class FormDataTransformer {
    protected _formData: FormData;

    constructor(formData?: FormData) {
        if (!isNil(formData)) {
            if (!FormDataTransformer.isFormData(formData)) {
                throw new RangeError('Cannot create form data transformer - provided data is not a valid FormData');
            } else {
                this._formData = formData;
            }
        } else {
            this._formData = new FormData();
        }
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

    public getFileData(key: string): File {
        if (!isString(key)) {
            throw new RangeError('Cannot get file binary data - form data key is not a string');
        }

        if (!this._formData.has(key)) {
            throw new RangeError('Cannot get file binary data - image data not found');
        }

        const dataFile = this._formData.get(key);
        if (!(dataFile instanceof File)) {
            throw new RangeError('Cannot get file binary data - none-file data was found in form data');
        }

        return dataFile;
    }

    public async getFileBinaryData(key: string): Promise<Uint8Array> {
        const dataFile = this.getFileData(key);
        return extractBinaryDataFromFile(dataFile);
    }

    get formData(): FormData {
        return FormDataTransformer.clone(this._formData);
    }
}

// exports
export default FormDataTransformer;