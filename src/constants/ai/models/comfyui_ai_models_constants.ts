// external imports

// internal imports

// implementation
enum ComfyUIAIModels {
    Flux1Schnell = 'flux1-schnell',
    Wan2_1 = 'wan2_1',
}

const COMFYUI_FLUX1_SCHNELL_IMAGE_PREVIEW_FLOW_CONFIG = Object.freeze({
    samplerName: 'dpmpp_2m',
    schedulerName: 'karras',
    previewDimensions: {
        width: 1024,
        height: 1024,
    },
});

const COMFYUI_WAN2_1_VIDEO_FLOW_CONFIG = Object.freeze({
    samplerName: 'uni_pc',
    schedulerName: 'simple',
    previewDimensions: {
        width: 832,
        height: 480,
        length: 33,
    },
});

// exports
export {
    ComfyUIAIModels,
    COMFYUI_FLUX1_SCHNELL_IMAGE_PREVIEW_FLOW_CONFIG,
    COMFYUI_WAN2_1_VIDEO_FLOW_CONFIG,
}