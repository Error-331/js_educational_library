// external imports
import { TransformCallback, Transform } from 'node:stream';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';

import ffprobe from '@ffprobe-installer/ffprobe';

// internal imports
import { FFProbeOutputData } from '../../../declarations/vendor/ffmpeg/ffprobe_declarations';
import { FFProbeTransformStreamOptions } from '../../../declarations/binary/streams/ffprobe_transform_stream_declarations';

import { convertUnknownToError } from '../../../utils/misc/error_utils';
import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { isError } from '../../../utils/misc/error_utils';
import { isNil, isNumber, isString, isFunction } from '../../../utils/misc/logic_utils';

// implementation
class FFProbeTransformStream extends Transform {
    protected ffprobeProcess: ChildProcessWithoutNullStreams;
    protected ffprobeOutput: string = '';

    protected data: FFProbeOutputData;
    protected shouldWriteToFFProbe: boolean = true;

    protected nextChunk: Buffer | null = null;
    protected nextEncoding: BufferEncoding | null = null;
    protected nextCallback: TransformCallback | null = null;

    protected onDataCallback: (data: FFProbeOutputData) => void;

    constructor(dataConfiguration?: FFProbeTransformStreamOptions, options?: unknown) {
        super(options);

        if (isFunction(dataConfiguration.onData)) {
            this.onDataCallback = dataConfiguration.onData;
        }

        this.createFFProbeProcess();
        this.bindEvents();
    }

    protected createFFProbeProcess(): void {
       this.ffprobeProcess = spawn(ffprobe.path, [
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            '-probesize', '10M',
            '-i', '-',
        ],  { stdio: ['pipe', 'pipe', 'pipe'] });
    }

    protected resetNextData(): void {
        this.nextChunk = null;
        this.nextEncoding = null;
        this.nextCallback = null;
    }

    protected canWriteToPipe(): boolean {
        return !isNil(this.nextChunk) && !isNil(this.nextEncoding) && !isNil(this.nextCallback);
    }

    protected cleanup(): void {
        this.ffprobeProcess.stdout.removeAllListeners();
        this.ffprobeProcess.stdin.removeAllListeners();
        this.ffprobeProcess.stderr.removeAllListeners();

        this.ffprobeProcess.removeAllListeners();

        this.ffprobeProcess.kill('SIGKILL');
    }

    protected cleanupAndDestroy(error?: Error | unknown): void {
        this.cleanup();

        if (!isNil(error)) {
            this.destroy(isError(error) ? error : convertUnknownToError(error));
        }
    }

    protected bindEvents(): void {
        this.ffprobeProcess.once('error', (error: Error) => this.cleanupAndDestroy(error));
        this.ffprobeProcess.once('close', (code) => {
            this.shouldWriteToFFProbe = false;

            if (code === 0) {
                try {
                    this.data = JSON.parse(this.ffprobeOutput);
                    this.emit('ffprobeData', this.data);

                    if (isFunction(this.onDataCallback)) {
                        this.onDataCallback(this.data);
                    }

                    this.cleanup();
                } catch (error: unknown) {
                    this.cleanupAndDestroy(error);
                }
            } else {
                this.cleanupAndDestroy(new Error(`Cannot parse ffprobe output - process exited with code "${code}"`));
            }
        });

        this.ffprobeProcess.stdout.on('data', (data: Buffer) => this.ffprobeOutput += data.toString());

        this.ffprobeProcess.stdin.on('error', (stdinError: Error | unknown) => {
            if (isObjectOfType<{ errno: number; code: string }>(stdinError, { errno: isNumber, code: isString }) &&
                stdinError?.errno === -32 &&
                stdinError?.code === 'EPIPE'
            ) {
                this.shouldWriteToFFProbe = false;
               // this._transform(this.nextChunk, this.nextEncoding, this.nextCallback);
            } else {
                this.cleanupAndDestroy(stdinError);
            }
        });

        //this.ffprobeProcess.stdin.on('drain', () => this._transform(this.nextChunk, this.nextEncoding, this.nextCallback));
    }

    public _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
        try {
            if (this.shouldWriteToFFProbe) {
                this.ffprobeProcess.stdin.write(chunk, encoding);

              /*  if (stdinWriteResult === false) {
                    console.log('stdinWriteResult', stdinWriteResult);
                    this.nextChunk = chunk;
                    this.nextEncoding = encoding;
                    this.nextCallback = callback;

                    return;
                }*/
            }

            this.resetNextData();

            this.push(chunk, encoding);
            callback();
        } catch(error: unknown) {
            this.cleanupAndDestroy(error);
        }
    }

    public _flush(callback: TransformCallback) {
        this.ffprobeProcess.stdin.end();
        callback();
    }
}

// exports
export default FFProbeTransformStream;
