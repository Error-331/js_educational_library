// external imports
import { writeFile } from 'node:fs/promises';

// internal imports
import type { ComfyUIAIOutputFile } from '../../declarations/ai/comfyui/comfyui_ai_common_declarations';
import { COMFYUI_AI_VIEW_ENDPOINT } from '../../constants/ai/comfyui_ai_constants';

import ComfyUIAIRegistry from '../../registers/comfyuiAI/comfyui_ai_registry';
import AxiosRequestFacade from '../../net/http/request/axios/axios_client_request_facade';

import { extractFileExtension } from '../../utils/misc/path_utils';
import { isString, isNullOrEmpty } from '../../utils/misc/logic_utils';

// implementation
class ComfyUIAIViewFacade {
    public async writeOutputFile(fullFilepath: string, outputFileName: string, outputSubfolder: string = ''): Promise<string> {
        if (isNullOrEmpty(fullFilepath)) {
            throw new RangeError('Cannot write output file (ComfyUI) - full file path is not provided');
        }

        if (isNullOrEmpty(outputFileName)) {
            throw new RangeError('Cannot write output file (ComfyUI) - output file name is not provided');
        }

        if (!isString(outputSubfolder)) {
            throw new RangeError('Cannot write output file (ComfyUI) - output subfolder must be of type string');
        }

        const comfyUIAIRegistryInstance = ComfyUIAIRegistry.getInstance();

        const httpClient = new AxiosRequestFacade<ArrayBuffer>({
            baseURL: comfyUIAIRegistryInstance.baseAPIURL,
            url: COMFYUI_AI_VIEW_ENDPOINT,
            responseType: 'arraybuffer',

            params: {
                filename: outputFileName,
                subfolder: outputSubfolder,
                type: 'output'
            }
        });

        const response = await httpClient.get();
        const buffer = Buffer.from(response.data);

        await writeFile(fullFilepath, buffer);
        return fullFilepath;
    }

    public async writeOutputFiles(fullFilepath: string, outputFiles: ComfyUIAIOutputFile[], filePrefix: string = '', fileSuffix: string = ''): Promise<string[]> {
        if (isNullOrEmpty(fullFilepath)) {
            throw new RangeError('Cannot write output files (ComfyUI) - full file path is not provided');
        }

        if (isNullOrEmpty(outputFiles)) {
            throw new RangeError('Cannot write output files (ComfyUI) - output files names are not provided');
        }

        const promises: Promise<string>[] = [];

        for (let fileCount = 0; fileCount < outputFiles.length; fileCount++) {
            const outputFile = outputFiles[fileCount];
            const fileNumber = fileCount + 1;
            const fileExtension = extractFileExtension(outputFile.filename);

            const preparedFilePath = `${fullFilepath}/${filePrefix}${fileNumber}${fileSuffix}${fileExtension}`;
            promises.push(this.writeOutputFile(preparedFilePath, outputFile.filename, outputFile.subfolder));
        }

        return Promise.all(promises);
    }

    public async writeOutputToSpecificFile(fullFilepath: string, fileName: string, outputFile: ComfyUIAIOutputFile): Promise<string> {
        const preparedFilePath = `${fullFilepath}/${fileName}`;
        return this.writeOutputFile(preparedFilePath, outputFile.filename, outputFile.subfolder);
    }
}

// exports
export default ComfyUIAIViewFacade;