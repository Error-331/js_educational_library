// external imports

// internal imports

// implementation

// general UI declarations
type UIFormInputProps = {
    name: string;
    label?: string;

    errorMessage?: string | string[];

    style?: React.CSSProperties;
}

type UIFormTextInputProp = UIFormInputProps & {
    type?: string;

    defaultValue?: string;
    placeholder?: string;
};

type UIFormUploadInputProps = UIFormInputProps & {
    caption?: string;

    multiple?: boolean;
    maxCount?: number;

    onBeforeUpload: (file: File) => void | boolean;
}

// Ionic declarations
type UIIonicTextInput = UIFormTextInputProp & {
    labelPlacement?: string;
    fill?: string;

    children?: React.ReactNode;
}

// exports
export {
    UIFormInputProps,

    UIFormTextInputProp,
    UIFormUploadInputProps,
}