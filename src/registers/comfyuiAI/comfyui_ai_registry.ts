// external imports

// internal imports
import { COMFYUI_BASE_URL } from '../../constants/ai/comfyui_ai_constants';

import { isNullOrEmpty } from '../../utils/misc/logic_utils';

// implementation
class ComfyUIAIRegistry {
    private static instance: ComfyUIAIRegistry;
    private _baseAPIURL: string = COMFYUI_BASE_URL;

    private constructor() {}

    public static getInstance(): ComfyUIAIRegistry {
        if (!ComfyUIAIRegistry.instance) {
            ComfyUIAIRegistry.instance = new ComfyUIAIRegistry();
        }

        return ComfyUIAIRegistry.instance;
    }

    get baseAPIURL(): string {
        return this._baseAPIURL;
    }

    set baseAPIURL(baseAPIURL: string) {
        if (isNullOrEmpty(baseAPIURL)) {
            throw new RangeError('Cannot set base API URL (ComfyUI) - URL is not provided');
        }

        this._baseAPIURL = baseAPIURL;
    }
}

// exports
export default ComfyUIAIRegistry;