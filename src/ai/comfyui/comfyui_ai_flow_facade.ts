// external imports

// internal imports
import type { ComfyUIAIFlowConfig, ComfyUIAFlowInputConfig } from '../../declarations/ai/comfyui/comfyui_ai_common_declarations';

import ComfyUIAIPromptFacade from './comfyui_ai_prompt_facade';

import { readJSONFileSync } from '../../utils/file/server_file_utils';
import { cloneDeep } from '../../utils/primitives/object_utils';
import { isObject } from '../../utils/misc/logic_utils';

// implementation
class ComfyUIAIFlowFacade {
    protected _flowData: ComfyUIAIFlowConfig;
    protected _preparedFlowData: ComfyUIAIFlowConfig;

    protected _flowInputConfig: ComfyUIAFlowInputConfig = {};

    protected findNodeIndexByClassType(nodeClassType: string): string {
        for (const nodeId in this._preparedFlowData) {
            if (this._preparedFlowData[nodeId].class_type === nodeClassType) {
                return nodeId;
            }
        }

        return null;
    }

    protected prepareFlowData() {
        this._preparedFlowData = cloneDeep(this._flowData);

        for (const nodeClassType in this._flowInputConfig) {
            const nodeId = this.findNodeIndexByClassType(nodeClassType);
            const nodeConfig = this._flowInputConfig[nodeClassType];

            for (const nodeConfigKey in nodeConfig) {
                if (isObject(this._preparedFlowData?.[nodeId]?.['inputs'])) {
                    this._preparedFlowData[nodeId]['inputs'][nodeConfigKey] = this._flowInputConfig[nodeClassType][nodeConfigKey];
                }
            }
        }
    }

    public async loadFlowJSONData(pathToFlowJSON: string): Promise<void> {
        this._flowData = readJSONFileSync<ComfyUIAIFlowConfig>(pathToFlowJSON);
    }

    public async executePrompt() {
        this.prepareFlowData();
        const promptFacadeInstance = new ComfyUIAIPromptFacade();

        return promptFacadeInstance.executePrompt(this._preparedFlowData);
    }

    set flowInputConfig(flowInputConfig: ComfyUIAFlowInputConfig) {
        if (!isObject(flowInputConfig)) {
            throw new RangeError('Cannot set flow input config (ComfyUI) - flow input config is not provided');
        }

        this._flowInputConfig = flowInputConfig;
    }
}

// exports
export default ComfyUIAIFlowFacade;