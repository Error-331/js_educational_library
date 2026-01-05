// external imports

// internal imports
import type { FFProbeOutputData } from '../../declarations/vendor/ffmpeg/ffprobe_declarations';
import { FFProbeStreamCodecType } from '../../declarations/vendor/ffmpeg/ffprobe_declarations';

import { calculateAspectRatio } from '../ui/display_utils';
import { isNil } from '../misc/logic_utils';

// implementation
function findVideoStreamByFFProbeData(ffprobeData: FFProbeOutputData) {
    if (isNil(ffprobeData)) {
        throw new Error('Cannot find video stream data - FFProbe data is not provided');
    }

    return ffprobeData.streams.find(stream => stream.codec_type === FFProbeStreamCodecType.Video);
}

function findAudioStreamByFFProbeData(ffprobeData: FFProbeOutputData) {
    if (isNil(ffprobeData)) {
        throw new Error('Cannot find video stream data - FFProbe data is not provided');
    }

    return ffprobeData.streams.find(stream => stream.codec_type === FFProbeStreamCodecType.Audio);
}

function calcAspectRatioByFFProbeData(ffprobeData: FFProbeOutputData): [number, number] {
    if (isNil(ffprobeData)) {
        throw new Error('Cannot calculate aspect ratio - FFProbe data is not provided');
    }

    const videoSteam = findVideoStreamByFFProbeData(ffprobeData);

    if (isNil(videoSteam)) {
        throw new Error('Cannot calculate aspect ratio - video stream is not found in FFProbe data');
    }

    return calculateAspectRatio(videoSteam.width, videoSteam.height);
}

// exports
export {
    findVideoStreamByFFProbeData,
    findAudioStreamByFFProbeData,

    calcAspectRatioByFFProbeData,
}