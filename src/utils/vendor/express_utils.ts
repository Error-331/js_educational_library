// external imports
import { Request, Response } from 'express';

// internal imports
import {CommonServerReturn} from '../../declarations/net/api/common_declarations';
import BaseHTTPServerController from '../../net/api/common/base_http_server_controller';

// implementation
function handleJSONOnly(handler: (req: Request, res: Response) => Promise<CommonServerReturn>, req: Request, res: Response): void {
    res.format({
        async html() {
            return BaseHTTPServerController.serverNotAcceptable406Error(req, res);
        },

        async text() {
            return BaseHTTPServerController.serverNotAcceptable406Error(req, res);
        },

        async json() {
            return handler(req, res);
        },

        async default() {
            return BaseHTTPServerController.serverNotAcceptable406Error(req, res);
        }
    });
}

// exports
export {
    handleJSONOnly,
}