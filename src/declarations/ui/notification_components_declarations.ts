// external imports

// internal imports

// implementation
enum UINotificationType {
    Success = 'Success',
    Info = 'Info',
    Error = 'Error',
    Warning = 'Warning',
}

type UINotification = {
    type: UINotificationType,
    message: string;
}

// exports
export {
    UINotificationType,
    UINotification,
}