// external imports
import { z } from 'zod';

// internal imports
import { UPLOAD_ALLOWED_DEFAULT_IMAGE_SIZE, UPLOAD_ALLOWED_DEFAULT_IMAGE_FILES_LIST } from '../../../constants/validation/file_validation_constants';

// implementation
function getUploadImageFileValidationSchema(
    fileList?: string[],
    fileSize?: number,

    fileListMessage?: string,
    fileSizeMessage?: string,
) {
    return z
        .instanceof(File)
        .refine(
            (file: File) => (fileList ?? UPLOAD_ALLOWED_DEFAULT_IMAGE_FILES_LIST).includes(file.type),
            { message: fileListMessage ?? 'Invalid image file type' })
        .refine((file: File) => file.size <= (fileSize ?? UPLOAD_ALLOWED_DEFAULT_IMAGE_SIZE),
            { message: fileSizeMessage ?? 'File size should not exceed 5MB' })
}

// exports
export {
    getUploadImageFileValidationSchema,
}