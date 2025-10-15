// external imports
import { TransformCallback, Transform } from 'node:stream';

// internal imports
import {
    BinaryFileToMultipartFormDataTransformStreamData,
    BinaryFileToMultipartFormDataTransformStreamOptions
} from '../../../../declarations/net/http/streams/transform/binary_file_to_multipart_form_data_transform_stream_declarations';

import { META_MIME_TYPE_VIDEO, MIME_TYPE_BIN } from '../../../../constants/net/common/mime_types_constants';

import { generateRandomString } from '../../../../utils/primitives/string/random_string_generation_utils';
import { extractFileExtension } from '../../../../utils/misc/path_utils';
import { findMIMETypeByFileExtension } from '../../../../utils/net/mime_types_utils';
import { isNullOrEmpty, isArray, isObject } from '../../../../utils/misc/logic_utils';

// implementation
class BinaryFileToMultipartFormDataTransformStream extends Transform {
    protected fileName: string;
    protected fileFieldName: string;
    protected fileMIMEType: string;

    protected data: BinaryFileToMultipartFormDataTransformStreamData | null = null;

    protected firstChunkPushed: boolean = false;
    protected _boundary: string;

    constructor(dataConfiguration: BinaryFileToMultipartFormDataTransformStreamOptions, options?: unknown) {
        super(options);

        if (isNullOrEmpty(dataConfiguration.fileName)) {
            throw new RangeError('Cannot create multipart form data stream - file name is not specified');
        }

        this.fileName = dataConfiguration.fileName;
        this.fileFieldName = dataConfiguration.fileFieldName ?? 'file';
        this.data = dataConfiguration.data ?? null;

        if (isNullOrEmpty(dataConfiguration.fileMIMEType)) {
            const fileExtension = extractFileExtension(this.fileName);
            const fileMIMEType = findMIMETypeByFileExtension(fileExtension);

            if (isArray<string>(fileMIMEType)) {
                this.fileMIMEType = fileMIMEType[0];
            } else if (isObject(fileMIMEType)) {
                this.fileMIMEType = fileMIMEType[META_MIME_TYPE_VIDEO] ?? MIME_TYPE_BIN;
            } else {
                this.fileMIMEType = fileMIMEType
            }

        } else {
            this.fileMIMEType = dataConfiguration.fileMIMEType;
        }

        this._boundary = generateRandomString(12);
    }

    protected pushEndBoundary(): boolean {
        return this.push(`
--${this._boundary}--
`);
    }

    protected pushLineBreak(): boolean {
        return this.push(`
`);
    }

    protected pushDataChunk(name: string, value: string): boolean {
        return this.push(`
--${this._boundary}
Content-Disposition: form-data; name="${name}"

${value}`);
    }

    protected pushInitialFileChunk(chunk: Buffer): boolean {
        const myBuffer = Buffer.from(`--${this._boundary}
Content-Disposition: form-data; name="${this.fileFieldName}"; filename="${this.fileName}"
Content-Type: ${this.fileMIMEType}

`, 'utf8');

        return this.push(Buffer.concat([myBuffer, chunk]));
    }

    public _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
        if (!this.firstChunkPushed) {
            this.firstChunkPushed = true;
            this.pushInitialFileChunk(chunk);
        } else {
            this.push(chunk);
        }

        callback();
    }

    _flush(callback: TransformCallback) {
        for (const key in this.data) {
            this.pushDataChunk(key, this.data[key]);
        }

        this.pushEndBoundary()
        callback();
    }

    get boundary(): string {
        return this._boundary;
    }
}

// exports
export default BinaryFileToMultipartFormDataTransformStream;