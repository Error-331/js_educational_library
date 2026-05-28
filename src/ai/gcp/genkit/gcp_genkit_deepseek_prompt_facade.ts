// external imports
import type { PromptGenerateOptions } from 'genkit';

// internal imports
import GCPGenkitPromptFacade from './gcp_genkit_prompt_facade';
import { isNil } from '../../../utils/misc/logic_utils';

// implementation
class GCPGenkitDeepSeekPromptFacade<PromptInputSchema extends object, PromptOutputSchema> extends GCPGenkitPromptFacade<PromptInputSchema, PromptOutputSchema> {
    public async generateText(inputData?: PromptInputSchema, config?: PromptGenerateOptions): Promise<string> {
        const preparedConfig = isNil(config) ? {} : config;

        if (isNil(preparedConfig.output)) {
            preparedConfig.output = {};
        }

        preparedConfig.output.constrained = false;
        return super.generateText(inputData, preparedConfig);
    }
}

// exports
export default GCPGenkitDeepSeekPromptFacade;