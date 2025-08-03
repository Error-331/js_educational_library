// external imports
import React from 'react';

// internal imports
import { UIFormTextInputProp } from '../form_components_declarations';

// implementation
type UIIonicTextInput = UIFormTextInputProp<React.ChangeEvent<HTMLInputElement>> & {
    labelPlacement?: string;
    fill?: string;

    children?: React.ReactNode;
}

// exports
export {
    UIIonicTextInput,
}