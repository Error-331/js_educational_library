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
    title?: string;
    message: string;
}

// exports
export {
    UINotificationType,
    UINotification,
}