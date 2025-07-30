// external imports

// internal imports
import { UINotification, UINotificationType } from '../../declarations/ui/notification_components_declarations';
import { isNil } from '../misc/logic_utils';

// implementation
function createNotification(message: string, type: UINotificationType): UINotification {
    if (isNil(message) || isNil(type)) {
        return {
          type: UINotificationType.Error,
          message: 'Something went wrong...'
        };
    }

    return {
        type,
        message,
    }
}

// exports
export {
    createNotification,
}