// external imports
import type { PromptGenerateOptions, GenkitOptions } from 'genkit';

// internal imports
import GCPGenkitAIRegistry from '../../../registers/gcp/gen_ai/gcp_genkit_ai_registry';

import { writeDataURLToFileAsync } from '../../../utils/file/server_file_url_utils';
import { removeExtraTrailingSlashes } from '../../../utils/net/uri_utils';
import { isNil, isNullOrEmpty } from '../../../utils/misc/logic_utils';

// implementation
class GCPGenkitPromptFacade<PromptInputSchema extends object, PromptOutputSchema> {
    private promptPath: string;

    protected promptName: string;
    protected promptInstance;

    constructor (promptPath: string, promptName: string) {
        if (isNullOrEmpty(promptPath)) {
            throw new RangeError(`Cannot create Genkit AI prompt facade - prompt path is not provided`);
        }

        if (isNullOrEmpty(promptName)) {
            throw new RangeError(`Cannot create Genkit AI prompt facade - prompt name is not provided`);
        }

        this.promptPath = removeExtraTrailingSlashes(promptPath);
        this.promptName = promptName;

        const genKitRegistry = GCPGenkitAIRegistry.getInstance();
        this.promptInstance = genKitRegistry.ai.prompt(`${this.promptPath}/${this.promptName}`);
    }

    public async renderPrompt(inputData?: PromptInputSchema, config?: PromptGenerateOptions): Promise<GenkitOptions<PromptOutputSchema>> {
        return this.promptInstance.render(inputData, config);
    }

    public async generateText(inputData?: PromptInputSchema, config?: PromptGenerateOptions): Promise<string> {
        const response = await this.promptInstance(inputData, config);

        if (isNil(response?.text)) {
            throw new Error('Cannot generate text - generated data does not have an "text" parameter');
        }

        return response.text;
    }

    public async generateImageToFile(fileName?: string | null, pathToFile?: string | null, inputData?: PromptInputSchema, config?: PromptGenerateOptions) {
        const response = await this.promptInstance(inputData, config);

        if (isNil(response?.media?.url)) {
            throw new Error('Cannot generate image - generated data does not have an URL parameter');
        }

        const preparedFileName = isNullOrEmpty(fileName) ? `${this.promptName}.png` : fileName;
        await writeDataURLToFileAsync(preparedFileName, pathToFile, response?.media?.url)
    }
}

// exports
export default GCPGenkitPromptFacade;