// external imports

// internal imports
import { HTTPResponseSchema } from '../../../../declarations/net/http/response_declarations';
import { RequestFacade } from '../../../../declarations/net/http/request_declarations';

import AbstractClientRequestFacade from '../base/abstract_client_request_facade';
import AxiosBaseRequestFacade from './axios_base_request_facade';

// implementation
class AxiosRequestFacade<ResponseDataType>
    extends AbstractClientRequestFacade<ResponseDataType>
    implements RequestFacade<ResponseDataType> {

    public async request(): Promise<HTTPResponseSchema<ResponseDataType>> {
        return null;
    }
}

const AxiosClientRequestFacade = AxiosBaseRequestFacade(AxiosRequestFacade);

// exports
export default AxiosClientRequestFacade;