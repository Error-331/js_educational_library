// external imports

// internal imports
import { GenericObject } from '../../../../declarations/collection_declarations';
import { HTTPRequestData } from '../../../../declarations/net/http/request_declarations';

import AbstractBaseRequestFacade from './abstract_base_request_facade';
import FormDataTransformer from '../../form/form_data_transformer';

// implementation
abstract class AbstractServerRequestFacade<ResponseDataType> extends AbstractBaseRequestFacade<ResponseDataType> {
    protected prepareData(data: GenericObject | FormData | Buffer): HTTPRequestData {
        if (FormDataTransformer.isFormData(data)) {
            return FormDataTransformer.clone(data);
        } else {
            return data;
        }
    }
}

// exports
export default AbstractServerRequestFacade;