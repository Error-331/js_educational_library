// external imports
import { Compute, JWT, UserRefreshClient, OAuth2Client, GoogleAuth, BaseExternalAccountClient } from 'googleapis-common';

// internal imports

// implementation
type GCPDriveBaseFacadeOptions = {};

type GCPDriveLocalAuthFacadeOptions = GCPDriveBaseFacadeOptions & {
    keyfilePath: string;
};

type GCPDriveAuthType = string
    | Compute
    | JWT
    | UserRefreshClient
    | OAuth2Client
    | GoogleAuth
    | BaseExternalAccountClient;

type GCPDriveRemoteFileParameters = {
    fileName: string;
    filePath: string;
};

type GCPDriveUploadFileParameters = GCPDriveRemoteFileParameters & {
    parentsFoldersIDs?: string[];
};

type GCPDiveReplaceFileParameters = GCPDriveRemoteFileParameters & {
    parentFolderId?: string;
    parentFolderName?: string;
};

// exports
export type {
    GCPDriveBaseFacadeOptions,
    GCPDriveLocalAuthFacadeOptions,
    GCPDriveAuthType,
    GCPDriveRemoteFileParameters,
    GCPDriveUploadFileParameters,
    GCPDiveReplaceFileParameters,
}