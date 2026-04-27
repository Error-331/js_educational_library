// external imports

// internal imports

// implementation
enum UINotificationType {
    Success = 'Success',
    Info = 'Info',
    Error = 'Error',
    Warning = 'Warning',
}

type UINotification<DataType = undefined> = {
    type: UINotificationType,
    title?: string;
    message: string;
    data?: DataType;
}

// exports
export {
    UINotificationType,
    UINotification,
}