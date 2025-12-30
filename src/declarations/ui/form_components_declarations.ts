// external imports
import React from 'react';

// internal imports

// implementation
type UIFormInputProps = {
    name: string;
    label?: string;

    required?: boolean;
    disabled?: boolean;

    errorMessage?: string | string[];

    style?: React.CSSProperties;
}

type UIFormTextInputProp<EventType> = UIFormInputProps & {
    type?: string;

    maxLength?: number;

    defaultValue?: string;
    placeholder?: string;

    onChange?: (event: EventType) => void;
};

type UIFormTextAreaInputProp<EventType> = UIFormTextInputProp<EventType> & {
    rows?: number;
};

type UIFormUploadInputProps = UIFormInputProps & {
    caption?: string;

    multiple?: boolean;
    maxCount?: number;

    onBeforeUpload: (file: File) => void | boolean;
}

// exports
export {
    UIFormInputProps,

    UIFormTextInputProp,
    UIFormTextAreaInputProp,
    UIFormUploadInputProps,
}