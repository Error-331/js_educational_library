// external imports

// internal imports
import type { ComfyUIAIFlowConfig, ComfyUIAIPromptResultData } from '../../declarations/ai/comfyui/comfyui_ai_common_declarations';
import { COMFYUI_AI_PROMPT_ENDPOINT } from '../../constants/ai/comfyui_ai_constants';

import AxiosRequestFacade from '../../net/http/request/axios/axios_client_request_facade';
import ComfyUIAIRegistry from '../../registers/comfyuiAI/comfyui_ai_registry';

import { isObject } from '../../utils/misc/logic_utils';

// implementation
class ComfyUIAIPromptFacade {
    public async executePrompt(flowConfig: ComfyUIAIFlowConfig): Promise<ComfyUIAIPromptResultData> {
        if (!isObject(flowConfig)) {
            throw new RangeError('Cannot execute prompt (ComfyUI) - prompt config file is not provided');
        }

        const comfyUIAIRegistryInstance = ComfyUIAIRegistry.getInstance();

        const httpClient = new AxiosRequestFacade<ComfyUIAIPromptResultData>({
            baseURL: comfyUIAIRegistryInstance.baseAPIURL,
            url: COMFYUI_AI_PROMPT_ENDPOINT,
            data: { 'prompt': flowConfig },
        });

        const response = await httpClient.post();
        return response.data;
    }
}

// exports
export default ComfyUIAIPromptFacade;