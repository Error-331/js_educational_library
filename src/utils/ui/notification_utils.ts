// external imports

// internal imports
import { UINotification, UINotificationType } from '../../declarations/ui/notification_components_declarations';
import { isNil } from '../misc/logic_utils';

// implementation
function createNotification<DataType = undefined>(type: UINotificationType, message: string, title?: string, data?: DataType): UINotification<DataType> {
    if (isNil(message) || isNil(type)) {
        return {
            type: UINotificationType.Error,
            title,
            message: 'Something went wrong...'
        };
    }

    return {
        type,
        title,
        message,
        data,
    }
}

// exports
export {
    createNotification,
}