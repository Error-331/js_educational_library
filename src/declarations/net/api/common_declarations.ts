// external imports
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { NextRequest } from 'next/server';

// internal imports

// implementation
type CommonServerRequest = ExpressRequest | NextRequest | Request;
type CommonServerResponse = ExpressResponse | null;

type CommonServerReturn = Response | void;

// exports
export {
    CommonServerRequest,
    CommonServerResponse,

    CommonServerReturn,
}