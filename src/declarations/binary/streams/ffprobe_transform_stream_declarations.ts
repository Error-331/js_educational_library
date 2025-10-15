// external imports

// internal imports
import { FFProbeOutputData } from '../../vendor/ffmpeg/ffprobe_declarations';

// implementation
type FFProbeTransformStreamOptions = {
    onData?: (data: FFProbeOutputData) => void;
};

// exports
export type {
    FFProbeTransformStreamOptions,
}