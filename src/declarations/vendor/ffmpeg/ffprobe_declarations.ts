// external imports

// internal imports

// implementation
enum FFProbeStreamCodecType {
    Video = 'video',
    Audio = 'audio',
}

type FFProbeStreamDisposition = {
    default?: number;
    dub?: number;
    original?: number;
    comment?: number;
    lyrics?: number;
    karaoke?: number;
    forced?: number;
    hearing_impaired?: number;
    visual_impaired?: number;
    clean_effects?: number;
    attached_pic?: number;
    timed_thumbnails?: number;
    captions?: number;
    descriptions?: number;
    metadata?: number;
    dependent?: number;
    still_image?: number;
};

type FFProbeStreamTags = {
    language?: string;
    handler_name?: string;
    vendor_id?: string;
    encoder?: string;
};

type FFProbeStreamData = {
    index: number;

    codec_type: FFProbeStreamCodecType;
    codec_name?: string;
    codec_long_name?: string;
    codec_tag_string?: string;
    codec_tag?: string;

    profile?: string;

    width?: number;
    height?: number;

    coded_width?: number;
    coded_height?: number;

    closed_captions?: number;
    film_grain?: number;
    has_b_frames?: number;
    pix_fmt?: string;
    level: number;
    chroma_location?: string;
    field_order?: string;
    refs?: number;
    is_avc?: string;
    nal_length_size?: string;
    id?: string;
    r_frame_rate?: string;
    avg_frame_rate?: string;
    time_base?: string;
    start_pts?: number;
    start_time?: string;
    duration_ts?: number;
    duration?: string;
    bit_rate?: string;
    bits_per_raw_sample?: string;
    nb_frames?: string;
    extradata_size?: number;

    disposition?: FFProbeStreamDisposition;
    tags?: FFProbeStreamTags;
};

type FFProbeFormatData = {
    filename?: string;
    nb_streams?: number;
    nb_programs?: number;
    format_name?: string;
    format_long_name?: string;
    start_time?: string;
    duration?: string;
    size?: string;
    probe_score?: number;
    tags?: {
        major_brand?: string;
        minor_version?: string;
        compatible_brands?: string;
        encoder?: string;
    }
}

type FFProbeOutputData = {
    streams?: FFProbeStreamData[];
    format?: FFProbeFormatData;
}

// exports
export type {
    FFProbeStreamDisposition,
    FFProbeStreamTags,
    FFProbeStreamData,

    FFProbeFormatData,
    FFProbeOutputData,
}

export {
    FFProbeStreamCodecType
}