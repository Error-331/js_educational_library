// external imports

// internal imports

// implementation
enum ComfyUIAIModels {
    Flux1Schnell = 'flux1-schnell'
}

const COMFYUI_FLUX1_SCHNELL_IMAGE_PREVIEW_FLOW_CONFIG = Object.freeze({
    samplerName: 'dpmpp_2m',
    schedulerName: 'karras',
    previewDimensions: {
        width: 1024,
        height: 1024,
    },
});



// exports
export {
    ComfyUIAIModels,
    COMFYUI_FLUX1_SCHNELL_IMAGE_PREVIEW_FLOW_CONFIG,
}