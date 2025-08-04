// external imports
import React from 'react';

// internal imports

// implementation
type UIFormInputProps = {
    name: string;
    label?: string;

    required?: boolean;

    errorMessage?: string | string[];

    style?: React.CSSProperties;
}

type UIFormTextInputProp<EventType> = UIFormInputProps & {
    type?: string;

    defaultValue?: string;
    placeholder?: string;

    onChange?: (event: EventType) => void;
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
    UIFormUploadInputProps,
}