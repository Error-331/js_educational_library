// external imports
import { drive_v3 } from '@googleapis/drive/v3';
import fs from 'node:fs';

// internal imports
import type {
    GCPDriveBaseFacadeOptions,
    GCPDriveUploadFileParameters,
    GCPDiveReplaceFileParameters,
} from '../../../../declarations/net/api/gcp/gcp_drive_declarations';

import HTTPError from '../../../../errors/http_error';

import { isNil, isNullOrEmpty, isString, isArray } from '../../../../utils/misc/logic_utils';
import { findMIMETypeByPathToFile } from '../../../../utils/file/server_file_utils';


// implementation

// https://developers.google.com/workspace/drive/api/guides/about-files
// https://developers.google.com/workspace/drive/api/quickstart/nodejs
// https://developers.google.com/workspace/drive/api/guides/mime-types
abstract class GCPAbstractDriveFacade<OptionsType extends GCPDriveBaseFacadeOptions> {
    protected options: OptionsType;
    protected scopes: string[];

    protected driveClient: drive_v3.Drive | null = null;

    constructor(options: OptionsType, scopes: string[]) {
        this.options = options;
        this.scopes = scopes;
    }

    protected abstract loadDriveClient(): Promise<drive_v3.Drive>;

    public async loadFilesList(parameters?: object, requestParameters?: object) {
        const driveClient = await this.loadDriveClient();
        const { status, statusText, data } = await driveClient.files.list(parameters, requestParameters);

        if (status === 200) {
            return data;
        } else {
            throw new HTTPError(`GCP Drive API error: ${statusText} (${status})`, status, true);
        }
    }

    public async loadAllMyRootFoldersList(requestParameters?: object) {
        return this.loadFilesList({
            corpora: 'user',
            q: '"root" in parents and mimeType = "application/vnd.google-apps.folder" and trashed = false'
        }, requestParameters);
    }

    public async checkMyFolderExistsByNameInRoot(folderName: string, requestParameters?: object): Promise<string | null> {
        if (isNullOrEmpty(folderName)) {
            throw new RangeError('Cannot check whether user folder exists in "root" by name (GCP Drive) - folder name is not specified');
        }

        const response = await this.loadFilesList({
            corpora: 'user',
            q: `"root" in parents and mimeType = "application/vnd.google-apps.folder" and trashed = false and name = "${folderName}"`
        }, requestParameters);

        if (isArray(response?.files) && response.files.length > 0 && isString(response?.files[0].id)) {
            return response?.files[0].id;
        } else {
            return null;
        }
    }

    public async checkFileExistsInFolder(fileName: string, parentFolderId = 'root', requestParameters?: object) {
        if (isNullOrEmpty(fileName)) {
            throw new RangeError('Cannot check whether user file exists in folder (GCP Drive) - file name is not specified');
        }

        const response = await this.loadFilesList({
            corpora: 'user',
            q: `"${parentFolderId}" in parents  and trashed = false and name = "${fileName}"`
        }, requestParameters);

        if (isArray(response?.files) && response.files.length > 0) {
            return response?.files?.map(fileObj => {
                if (isNil(fileObj.id)) {
                    throw new Error(`Cannot check if file exists in folder "${parentFolderId}" for file "${fileName}" on GCP Drive - file id not found on resulting object`);
                } else {
                    return fileObj.id;
                }
            });
        } else {
            return null;
        }
    }

    public async createRootFolder(folderName: string, requestParameters?: object) {
        if (isNullOrEmpty(folderName)) {
            throw new RangeError('Cannot create folder at the "root" (GCP Drive) - folder name is not specified');
        }

        const driveClient = await this.loadDriveClient();

        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
        };

        const file = await driveClient.files.create({
            requestBody: fileMetadata,
            fields: 'id',
        }, requestParameters);

        if (isNil(file.data.id)) {
            throw new Error(`Cannot create folder "${folderName}" at "root" level on GCP Drive - internal error`);
        }

        return file.data.id;
    }

    public async uploadFileToFolder(parameters: GCPDriveUploadFileParameters, requestParameters?: object) {
        const driveClient = await this.loadDriveClient();

        if (isNullOrEmpty(parameters.fileName)) {
            throw new RangeError('Cannot upload file to folder (GCP Drive) - file name is not specified');
        }

        if (isNullOrEmpty(parameters.filePath)) {
            throw new RangeError('Cannot upload file to folder (GCP Drive) - file path is not specified');
        }

        const { status, statusText, data } = await driveClient.files.create({
                requestBody: {
                    name: parameters.fileName,
                    parents: parameters.parentsFoldersIDs
                },
                media: {
                    mimeType: findMIMETypeByPathToFile(parameters.fileName),
                    body: fs.createReadStream(parameters.filePath),
                },

                fields: 'id',
            },

            requestParameters
        );

        if (status === 200) {
            if (isNil(data.id)) {
                throw new Error('Cannot upload file to GCP Drive - id of the uploaded file is not found in the response');
            }

            return data.id;
        } else {
            throw new HTTPError(`GCP Drive API error: ${statusText} (${status})`, status, true);
        }
    }

    public async deleteFiles(filesIDs: string[], requestParameters?: object) {
        if (isNullOrEmpty(filesIDs)) {
            throw new RangeError('Cannot delete files (GCP Drive) - files IDs list is empty');
        }

        const driveClient = await this.loadDriveClient();

        const deletePromises = filesIDs.map(fileId => {
            return driveClient.files.delete({
                fileId
            }, requestParameters);
        });

        const responses = await Promise.all(deletePromises);

        for (let fileIdx = 0; fileIdx < responses.length; fileIdx++) {
            const { status, statusText } = responses[fileIdx];

            if (status === 200 || status === 204) {
                return;
            } else {
                throw new HTTPError(`GCP Drive API error: ${statusText} (${status})`, status, true);
            }
        }
    }

    public async replaceFile(parameters: GCPDiveReplaceFileParameters, requestParameters?: object) {
        let parentFolderId: string;

        if (isNullOrEmpty(parameters.fileName)) {
            throw new RangeError('Cannot replace file in folder (GCP Drive) - file name is not specified');
        }

        if (isNullOrEmpty(parameters.filePath)) {
            throw new RangeError('Cannot replace file in folder (GCP Drive) - file path is not specified');
        }

        if (!isNil(parameters?.parentFolderId)) {
            parentFolderId = parameters.parentFolderId
        } else if (!isNil(parameters?.parentFolderName)) {
            const folderId = await this.checkMyFolderExistsByNameInRoot(parameters.parentFolderName, requestParameters);

            if (isNil(folderId)) {
                parentFolderId = await this.createRootFolder(parameters.parentFolderName, requestParameters);
            } else {
                parentFolderId = folderId;
            }
        } else {
            parentFolderId = 'root';
        }

        const existingFileIds = await this.checkFileExistsInFolder(parameters.fileName, parentFolderId, requestParameters);

        if (!isNil(existingFileIds)) {
            await this.deleteFiles(existingFileIds, requestParameters);
        }

        await this.uploadFileToFolder({
            fileName: parameters.fileName,
            filePath: parameters.filePath,
            parentsFoldersIDs: [parentFolderId]
        }, requestParameters);
    }
}

// exports
export default GCPAbstractDriveFacade;