// external imports

// internal imports

// implementation
type UIFormInputProps = {
    name: string;
    label?: string;

    errorMessage?: string | string[];
}

type UIFormTextInputProp = UIFormInputProps;

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