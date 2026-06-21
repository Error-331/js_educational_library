// external imports

// internal imports
import {
    ComfyUIAIFlowConfig,
    ComfyUIAIFlowConfigAdapter
} from '../../declarations/ai/comfyui/comfyui_ai_common_declarations';

import GCPGenkitPromptFacade from '../gcp/genkit/gcp_genkit_prompt_facade';
import ComfyUIAIGenerateImageFlowFacade from './comfyui_ai_generate_image_flow_facade';

import { isNullOrEmpty } from '../../utils/misc/logic_utils';

// implementation
class ComfyUIAIGCPGenkitPromptFacade<
    PromptInputSchema extends object,
    PromptOutputSchema,
    FlowConfig extends ComfyUIAIFlowConfig,
> extends GCPGenkitPromptFacade<PromptInputSchema, PromptOutputSchema> {
    private pathToFlow: string;
    private flowConfigAdapter: ComfyUIAIFlowConfigAdapter<FlowConfig | {}>;

    constructor(promptPath: string, promptName: string, pathToFlow: string, flowConfigAdapter: ComfyUIFlowConfigAdapter<FlowConfig | {}>) {
        super(promptPath, promptName);

        this.pathToFlow = pathToFlow;
        this.flowConfigAdapter = flowConfigAdapter;
    }

    public async generateImageToFile(fileName?: string | null, pathToFile?: string | null, inputData?: PromptInputSchema, config?: FlowConfig) {
        const renderedPrompt = await this.renderPrompt(inputData, config);
        const preparedPromptText = renderedPrompt.messages[0].content[0].text;

        const flowFacadeInstance = new ComfyUIAIGenerateImageFlowFacade();
        await flowFacadeInstance.loadFlowJSONData(this.pathToFlow);
        flowFacadeInstance.flowInputConfig = this.flowConfigAdapter(config ?? {}, { promptText: preparedPromptText });

        const preparedFileName = isNullOrEmpty(fileName) ? `${this.promptName}` : fileName;
        const preparedPathToFile = isNullOrEmpty(pathToFile) ? './' : pathToFile;

        await flowFacadeInstance.generateImageToFile(preparedPathToFile, preparedFileName);
    }
}

// exports
export default ComfyUIAIGCPGenkitPromptFacade;