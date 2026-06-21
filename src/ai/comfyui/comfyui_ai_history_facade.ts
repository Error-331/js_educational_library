// external imports

// internal imports
import type { ComfyUIAIHistoryData } from '../../declarations/ai/comfyui/comfyui_ai_common_declarations';

import { COMFYUI_AI_HISTORY_ENDPOINT } from '../../constants/ai/comfyui_ai_constants';

import ComfyUIAIRegistry from '../../registers/comfyuiAI/comfyui_ai_registry';
import AxiosRequestFacade from '../../net/http/request/axios/axios_client_request_facade';

import { sanitizeURLPathPart } from '../../utils/net/uri_utils';
import {isNil, isArray, isNullOrEmpty } from '../../utils/misc/logic_utils';

// implementation
class ComfyUIAIHistoryFacade {
    protected _promptHistoryCache: ComfyUIAIHistoryData = {};

    public async loadPromptHistory(promptId: string): Promise<ComfyUIAIHistoryData> {
        if (isNullOrEmpty(promptId)) {
            throw new RangeError('Cannot load prompt history (ComfyUI) - prompt ID is not provided');
        }

        const comfyUIAIRegistryInstance = ComfyUIAIRegistry.getInstance();

        const httpClient = new AxiosRequestFacade<ComfyUIAIHistoryData>({
            baseURL: comfyUIAIRegistryInstance.baseAPIURL,
            url: `/${sanitizeURLPathPart(COMFYUI_AI_HISTORY_ENDPOINT)}/${promptId}`,
        });

        let response = await httpClient.get();

        if (!isNil(response.data[promptId])) {
            this._promptHistoryCache[promptId] = response.data[promptId];
            return response.data;
        } else {
            return null;
        }
    }

    public findImagesOutput(promptId: string) {
        if (isNullOrEmpty(promptId)) {
            throw new RangeError('Cannot find images output section in prompt history (ComfyUI) - prompt ID is not provided');
        }

        if (isNil(this._promptHistoryCache[promptId]?.outputs)) {
            return null;
        }

        for (const outputKey in this._promptHistoryCache[promptId]?.outputs) {
            if (isArray(this._promptHistoryCache[promptId]?.outputs[outputKey]?.images)) {
                return this._promptHistoryCache[promptId]?.outputs[outputKey]?.images;
            }
        }

        return null;
    }
}

// exports
export default ComfyUIAIHistoryFacade;