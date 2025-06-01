// external imports
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

// internal imports

// implementation
type CommonServerRequest = ExpressRequest | Request;
type CommonServerResponse = ExpressResponse | null;

type CommonServerReturn = Response | void;

// exports
export {
    CommonServerRequest,
    CommonServerResponse,

    CommonServerReturn,
}