// external imports

// internal imports

// implementation
type ComfyUIAIFlowNodeConfig = {
    inputs: object;
    class_type: string;
    _meta: object;
}

type ComfyUIAIFlowConfig = {
    [key: string]: ComfyUIAIFlowNodeConfig;
}

type ComfyUIAFlowInputConfig = {
    [key: string]: {
        [key: string]: string | number | object;
    }
}

type ComfyUIAIOutputFile = {
    filename: string;
    subfolder: string;
    type: string;
}

type ComfyUIAIPromptResultData = {
    prompt_id: string;
    number: number;
    node_errors: object;
}

type ComfyUIAIHistoryData = {
    [promptId: string]: {
        outputs: {
            [nodeId: string]: {
                images: ComfyUIAIOutputFile[]
            }
        },
        status: {
            "status_str": "success",
            "completed": true,
        }
    };
};

type ComfyUIAIFlowConfigAdapterProps = {
    promptText?: string;
};

type ComfyUIAIFlowConfigAdapter<FlowConfig extends ComfyUIAIFlowConfig> = (flowConfig: FlowConfig, props?: ComfyUIAIFlowConfigAdapterProps) => FlowConfig;

// exports
export type {
    ComfyUIAIFlowNodeConfig,
    ComfyUIAIFlowConfig,
    ComfyUIAFlowInputConfig,

    ComfyUIAIOutputFile,
    ComfyUIAIPromptResultData,

    ComfyUIAIHistoryData,

    ComfyUIAIFlowConfigAdapterProps,
    ComfyUIAIFlowConfigAdapter,
}