// external imports
import { GoogleGenAI } from '@google/genai';

// internal imports
import type { GCPGenAIAdminRegisterOptions } from '../../../../../declarations/registers/gcp/gcp_gen_ai_admin_registry_declarations';
import GCPGenAIAdminRegistry from '../../../../../registers/gcp/gen_ai/gcp_gen_ai_admin_registry';

// implementation
class GCPGenAIYouTubeTranscriberFacade {
    protected getGCPGenAIAdminOptions(): GCPGenAIAdminRegisterOptions {
        const gcpGenAIAdminRegistry = GCPGenAIAdminRegistry.getInstance();
        gcpGenAIAdminRegistry.init();

        return gcpGenAIAdminRegistry.options;
    }

    public async transcribeVideo(modelName: string, videoId: string, prompt: string): Promise<string> {
        const { apiKey } = this.getGCPGenAIAdminOptions();
        const gcpGenAIInstance = new GoogleGenAI({ apiKey });

        const contents = [
            {
                fileData: {
                    fileUri: `https://www.youtube.com/watch?v=${videoId}`,
                },
            },
            { text: prompt }
        ];

        const response = await gcpGenAIInstance.models.generateContent({
            model: modelName,
            contents: contents,
        });

        return response.text;
    }
}

// exports
export default GCPGenAIYouTubeTranscriberFacade;