// external imports

// internal imports
import { HTTPResponseSchema } from '../../../../declarations/net/http/response_declarations';
import { RequestFacade } from '../../../../declarations/net/http/request_declarations';

import AbstractServerRequestFacade from '../base/abstract_server_request_facade';
import AxiosBaseRequestFacade from './axios_base_request_facade';

// implementation
class AxiosRequestFacade<ResponseDataType>
    extends AbstractServerRequestFacade<ResponseDataType>
    implements RequestFacade<ResponseDataType> {

    public async request(): Promise<HTTPResponseSchema<ResponseDataType>> {
        return null;
    }
}

const AxiosServerRequestFacade = AxiosBaseRequestFacade(AxiosRequestFacade);

// exports
export default AxiosServerRequestFacade;