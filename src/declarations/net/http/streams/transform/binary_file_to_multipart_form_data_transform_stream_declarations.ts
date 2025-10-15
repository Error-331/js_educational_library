// implementation
type BinaryFileToMultipartFormDataTransformStreamData = { [key: string]: string };

type BinaryFileToMultipartFormDataTransformStreamOptions = {
    fileName: string;
    fileFieldName?: string;
    fileMIMEType?: string;

    data?: BinaryFileToMultipartFormDataTransformStreamData
}

// exports
export type {
    BinaryFileToMultipartFormDataTransformStreamData,
    BinaryFileToMultipartFormDataTransformStreamOptions,
}