// external imports

// internal imports
import type { ComfyUIAIOutputFile } from '../../declarations/ai/comfyui/comfyui_ai_common_declarations';

import { ASYNC_FUNC_EXEC_TIMEOUT } from '../../constants/async_constants';

import ComfyUIAIFlowFacade from './comfyui_ai_flow_facade';
import ComfyUIAIHistoryFacade from './comfyui_ai_history_facade';
import ComfyUIAIViewFacade from './comfyui_ai_view_facade';

import { asyncDelay } from '../../utils/async/timeout_utils';
import { isNil, isNumber } from '../../utils/misc/logic_utils';

// implementation
class ComfyUIAIGenerateImageFlowFacade extends ComfyUIAIFlowFacade {
    protected async initImageGeneration(pullInterval: number = ASYNC_FUNC_EXEC_TIMEOUT, pullTimeout: number = Infinity): Promise<ComfyUIAIOutputFile[]> {
        if (!isNumber(pullInterval)) {
            throw new RangeError('Cannot images to files (ComfyUI) - provided pull interval is not a number');
        }

        const { prompt_id } = await this.executePrompt();
        const historyFacadeInstance = new ComfyUIAIHistoryFacade();

        await historyFacadeInstance.loadPromptHistory(prompt_id);
        let outputsDataImages = historyFacadeInstance.findImagesOutput(prompt_id);

        while(isNil(outputsDataImages)) {
            await historyFacadeInstance.loadPromptHistory(prompt_id);
            outputsDataImages = historyFacadeInstance.findImagesOutput(prompt_id);

            if (isNil(outputsDataImages)) {
                await asyncDelay(pullInterval);
            }
        }

        return outputsDataImages;
    }

    public async generateImagesToFiles(pathToFolder: string = './', filePrefix: string = '', fileSuffix: string = '') {
        const outputsDataImages = await this.initImageGeneration();
        const viewFacade = new ComfyUIAIViewFacade();

        return viewFacade.writeOutputFiles(pathToFolder, outputsDataImages, filePrefix, fileSuffix);
    }

    public async generateImageToFile(pathToFolder: string = './', fileName: string) {
        const outputsDataImages = await this.initImageGeneration();
        const viewFacade = new ComfyUIAIViewFacade();

        return viewFacade.writeOutputToSpecificFile(pathToFolder, fileName, outputsDataImages[0]);
    }
}

// exports
export default ComfyUIAIGenerateImageFlowFacade;