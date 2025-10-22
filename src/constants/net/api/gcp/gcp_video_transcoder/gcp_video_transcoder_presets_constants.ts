// external imports

// internal imports

// implementation
const DEFAULT_VIDEO_STREAM_KEY = 'video-stream-0';
const DEFAULT_AUDIO_STREAM_KEY = 'audio-stream-0';

const DEFAULT_INPUT_KEY = 'input0';
const DEFAULT_EDIT_ATOM_KEY = 'atom-0';

const FACEBOOK_REEL_VIDEO_STREAM_HD_PRESET = {
    key: DEFAULT_VIDEO_STREAM_KEY,
    videoStream: {
        h264: {
            widthPixels: 1080,
            heightPixels: 1920,
            bitrateBps: 8000000,
            frameRate: 30,
            profile: 'main'
        }
    }
};

const TIKTOK_VIDEO_STREAM_HD_PRESET = {
    key: DEFAULT_VIDEO_STREAM_KEY,
    videoStream: {
        h264: {
            widthPixels: 1080,
            heightPixels: 1920,
            bitrateBps: 10000000,
            frameRate: 30,
            profile: 'main'
        }
    }
};

const FACEBOOK_REEL_AUDIO_STREAM_PRESET = {
    key: DEFAULT_AUDIO_STREAM_KEY,
    audioStream: {
        codec: 'aac',
        bitrateBps: 64000,
    },
};

const TIKTOK_AUDIO_STREAM_PRESET = {
    key: DEFAULT_AUDIO_STREAM_KEY,
    audioStream: {
        codec: 'aac',
        bitrateBps: 128000
    }
};

const FACEBOOK_REEL_EDIT_ATOM_PRESET = {
    key: DEFAULT_EDIT_ATOM_KEY,
    inputs: [
        DEFAULT_INPUT_KEY,
    ],
    startTimeOffset: {
        seconds: 0
    },
    endTimeOffset: {
        seconds: 90
    }
};

const TIKTOK_REEL_EDIT_ATOM_PRESET = {
    key: DEFAULT_EDIT_ATOM_KEY,
    inputs: [
        DEFAULT_INPUT_KEY,
    ],
    startTimeOffset: {
        seconds: 0,
    },
    endTimeOffset: {
        seconds: 180,
    }
};

// exports
export {
    DEFAULT_VIDEO_STREAM_KEY,
    DEFAULT_AUDIO_STREAM_KEY,

    DEFAULT_INPUT_KEY,
    DEFAULT_EDIT_ATOM_KEY,

    FACEBOOK_REEL_VIDEO_STREAM_HD_PRESET,
    TIKTOK_VIDEO_STREAM_HD_PRESET,

    FACEBOOK_REEL_AUDIO_STREAM_PRESET,
    TIKTOK_AUDIO_STREAM_PRESET,

    FACEBOOK_REEL_EDIT_ATOM_PRESET,
    TIKTOK_REEL_EDIT_ATOM_PRESET,
}
