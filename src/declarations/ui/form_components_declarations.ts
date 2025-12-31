// external imports
import React from 'react';

// internal imports

// implementation
interface UIFormInputProps {
    name: string;
    label?: string;

    required?: boolean;
    disabled?: boolean;

    errorMessage?: string | string[];

    style?: React.CSSProperties;
}

interface UIFormTextInputProp<EventType> extends UIFormInputProps {
    type?: string;

    maxLength?: number;

    defaultValue?: string;
    placeholder?: string;

    onChange?: (event: EventType) => void;
}

interface UIFormTextAreaInputProp<EventType> extends UIFormTextInputProp<EventType> {
    rows?: number;
}

interface UIFormUploadInputProps extends UIFormInputProps {
    caption?: string;

    multiple?: boolean;
    maxCount?: number;

    onBeforeUpload: (file: File) => void | boolean;
}

interface UIFormSelectInputProp<EventType, T> extends UIFormInputProps {
    mode?: 'single' | 'multiple' | 'tags';
    placeholder?: string;
    loading?: boolean;

    options: T[];

    notFoundContent?: React.ReactNode;
    optionRender?: (option: { data: T }) =>  React.ReactNode;

    onChange?: (event: EventType) => void;
}

interface UIFormCheckboxInputProp extends UIFormInputProps {
    checked?: boolean;
}

// exports
export {
    UIFormInputProps,

    UIFormTextInputProp,
    UIFormTextAreaInputProp,
    UIFormUploadInputProps,

    UIFormSelectInputProp,
    UIFormCheckboxInputProp,
}