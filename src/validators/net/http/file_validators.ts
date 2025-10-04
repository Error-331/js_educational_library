// external imports
import { z } from 'zod';

// internal imports
import {
    UPLOAD_ALLOWED_DEFAULT_IMAGE_SIZE,
    UPLOAD_ALLOWED_DEFAULT_VIDEO_SIZE,

    UPLOAD_ALLOWED_DEFAULT_IMAGE_FILES_LIST,
    UPLOAD_ALLOWED_DEFAULT_VIDEO_FILES_LIST,
} from '../../../constants/validation/file_validation_constants';

// implementation
function getUploadImageFileValidationSchema(
    fileList?: string[],
    fileSize?: number,

    fileListMessage?: string,
    fileSizeMessage?: string,
) {
    const fileSizeLimit = fileSize ?? UPLOAD_ALLOWED_DEFAULT_IMAGE_SIZE;

    return z
        .instanceof(File)
        .refine(
            (file: File) => (fileList ?? UPLOAD_ALLOWED_DEFAULT_IMAGE_FILES_LIST).includes(file.type),
            { message: fileListMessage ?? 'Invalid image file type' })
        .refine((file: File) => file.size <= fileSizeLimit,
            { message: fileSizeMessage ?? `File size should not exceed "${fileSizeLimit}" bytes` })
}

function getUploadVideoFileValidationSchema(
    fileList?: string[],
    fileSize?: number,

    fileListMessage?: string,
    fileSizeMessage?: string,
) {
    const fileSizeLimit = fileSize ?? UPLOAD_ALLOWED_DEFAULT_VIDEO_SIZE;

    return z
        .instanceof(File)
        .refine(
            (file: File) => (fileList ?? UPLOAD_ALLOWED_DEFAULT_VIDEO_FILES_LIST).includes(file.type),
            { message: fileListMessage ?? 'Invalid video file type' })
        .refine((file: File) => file.size <= fileSizeLimit,
            { message: fileSizeMessage ?? `File size should not exceed "${fileSizeLimit}" bytes` })
}

// exports
export {
    getUploadImageFileValidationSchema,
    getUploadVideoFileValidationSchema,
}