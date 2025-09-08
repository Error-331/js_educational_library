// external imports

// internal imports

// implementation
type MimeTypeValue = string | { [key: string]: string };

type FileExtensionToMimeTypeRecords = {
    [key: string]: MimeTypeValue
}

// exports
export {
    MimeTypeValue,
    FileExtensionToMimeTypeRecords,
}