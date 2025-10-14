// external imports
import pino from 'pino';

// internal imports
import { isObjectOfType } from '../primitives/object_utils';
import { isSerializableError } from './error_utils';
import { isNil, isString } from './logic_utils';

// implementation
const pinoInstance = pino({});

function logDebug(data: unknown, message?: string): void {
    let preparedMessage = isString(message) ? message : 'Unknown debug';
    pinoInstance.debug(data, preparedMessage);
}

function logInfo(data: unknown, message: string): void {
    pinoInstance.info(data, message);
}

function logWarning(data: unknown, message: string): void {
    pinoInstance.warn(data, message);
}

function logError(error: unknown, topic?: string, message?: string | unknown): void {
    let preparedTopic = 'Unknown topic';
    let preparedMessage = 'Unknown error';

    if (!isNil(topic) && isString(topic)) {
        preparedTopic = topic;
    }

    if (isObjectOfType<Error>(error, { message: isString })) {
        preparedMessage = error.message;
    }
    
    if (!isNil(message) && isString(message)) {
        preparedMessage = message;
    }

    const errorData = isSerializableError(error) ? error.serialize() : error;
    pinoInstance.error({ err: errorData, topic: preparedTopic }, preparedMessage);
}

// exports
export {
    logDebug,
    logInfo,
    logWarning,
    logError,
}