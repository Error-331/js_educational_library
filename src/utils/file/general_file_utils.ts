// external imports

// internal imports

// implementation
function isFile(file: File): file is File {
    return file instanceof File;
}

async function extractBinaryDataFromFile(file: File): Promise<Uint8Array> {
    if (!isFile(file)) {
        throw new RangeError('Cannot extract binary data from a file - provided value is not a valid file');
    }

    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

// exports
export {
    isFile,
    extractBinaryDataFromFile,
}