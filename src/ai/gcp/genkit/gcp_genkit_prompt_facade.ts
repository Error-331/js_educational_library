// external imports
import type { PromptGenerateOptions } from 'genkit';

import { removeExtraTrailingSlashes } from 'js_educational_library/utils/net/uri_utils';

// internal imports
import GCPGenkitAIRegistry from '../../../registers/gcp/gen_ai/gcp_genkit_ai_registry';

import { writeDataURLToFileAsync } from '../../../utils/file/server_file_url_utils';
import { isNil, isNullOrEmpty } from '../../../utils/misc/logic_utils';

// implementation
class GCPGenkitPromptFacade<PromptInputSchema extends object> {
    private promptPath: string;
    private promptName: string;
    private promptInstance;

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

    public async renderPrompt(inputData?: PromptInputSchema) {
        return this.promptInstance.render(inputData);
    }

    public async generateImageToFile(fileName?: string | null, pathToFile?: string | null, inputData?: PromptInputSchema, config?: PromptGenerateOptions) {
        const response = await this.promptInstance(inputData, config);

        if (isNil(response?.media?.url)) {
            throw new Error(`Cannot generate image - generated data does not have an URL parameter`);
        }

        const preparedFileName = isNullOrEmpty(fileName) ? `${this.promptName}.png` : fileName;
        await writeDataURLToFileAsync(preparedFileName, pathToFile, response?.media?.url)
    }
}

// exports
export default GCPGenkitPromptFacade;