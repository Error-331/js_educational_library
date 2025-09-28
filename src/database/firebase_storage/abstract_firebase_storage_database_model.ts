// external imports
import type { File as StorageFile, Bucket, CreateWriteStreamOptions, DownloadResponse } from '@google-cloud/storage';

import { Readable } from 'node:stream';
import { posix } from 'node:path'

// internal imports
import { AtLeast } from '../../declarations/utility_declarations';
import { WithDatabaseDocument } from '../../declarations/database/general_database_model_declarations';
import { FirebaseStorageDatabaseEntity } from '../../declarations/database/firebase_database_model_declarations';

import { REMOTE_FILE_READ_LINK_TTL_MINUTES } from '../../constants/remote_api_constants';

import AbstractDatabaseModel from '../abstract_database_model';
import FirebaseAdminRegistry from '../../registers/firebase/firebase_admin_registry';
import FormDataTransformer from '../../net/http/form/form_data_transformer';

import { extractBinaryDataFromFile } from '../../utils/file/general_file_utils';
import { createDatePlusMinutesFromNow } from '../../utils/date/current_date_utils';
import { sanitizeURLPathPart } from '../../utils/net/uri_utils';
import { isNil, isString } from '../../utils/misc/logic_utils';

// implementation
abstract class AbstractFirebaseStorageDatabaseModel extends AbstractDatabaseModel<FirebaseStorageDatabaseEntity, FirebaseStorageDatabaseEntity> {
    /**
     * Example: AbstractFirebaseStorageDatabaseModel.sanitizeFileName('///converted/sd.mp4///');
     */

    public static sanitizeFileName(name: string): string {
        return sanitizeURLPathPart(name);
    }

    /**
     * Example: AbstractFirebaseStorageDatabaseModel.makeDocumentPublic('converted/sd.mp4');
     */

    public static async makeDocumentPublic(name: string): Promise<string> {
        if (!isString(name)) {
            throw new RangeError('Cannot make public Firebase storage item - name of the item must be of type string');
        }

        const preparedName = AbstractFirebaseStorageDatabaseModel.sanitizeFileName(name);
        const storage = FirebaseAdminRegistry.getInstance().storage;

        await storage.bucket().file(preparedName).makePublic();
        return storage.bucket().file(preparedName).publicUrl();
    }

    protected getStorageBucket(): Bucket {
        const storage = FirebaseAdminRegistry.getInstance().storage;
        return storage.bucket();
    }

    protected getFilePath(id: string | number): string {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot prepare path to file in Firebase storage');
        }

        return posix.join(`${this.collectionName}`, id.toString());
    }

    protected getFileRef(id: string | number): StorageFile {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot prepare file reference to Firebase storage');
        }

        const pathToFile = this.getFilePath(id);
        return this.getStorageBucket().file(pathToFile);
    }

    public async add(entity: Partial<FirebaseStorageDatabaseEntity>): Promise<FirebaseStorageDatabaseEntity> {
        if (isNil(entity.fileName)) {
            throw new RangeError('Filename is not specified - cannot add file to Firebase storage');
        }

        if (isNil(entity.file)) {
            throw new RangeError('File is not specified - cannot add file to Firebase storage');
        }

        const storage = FirebaseAdminRegistry.getInstance().storage;
        const storageBucket = storage.bucket();

        const pathToFile = posix.join(`${this.collectionName}`, entity.fileName);
        const fileRef = storageBucket.file(pathToFile);

        await fileRef.save(entity.file);
        return {
            fileName: entity.fileName,
            pathToFile,
            metadata: {},
            id: entity.fileName,
        };
    }

    public async addByFormDataKey(formData: FormData, key: string): Promise<FirebaseStorageDatabaseEntity> {
        const formDataTransformer = new FormDataTransformer(formData);
        const fileData = formDataTransformer.getFileData(key);
        const fileBinaryData = await formDataTransformer.getFileBinaryData(key);

        return this.add({
            fileName: fileData.name,
            file: fileBinaryData,
        });
    }

    public async addByFile(file: File): Promise<FirebaseStorageDatabaseEntity> {
        const fileBinaryData = await extractBinaryDataFromFile(file);

        return this.add({
            fileName: file.name,
            file: fileBinaryData,
        });
    }

    public update(entity: AtLeast<WithDatabaseDocument<FirebaseStorageDatabaseEntity>, 'id'>): Promise<void> {
        return Promise.resolve();
    }

    public deleteCollection(): Promise<void> {
        return Promise.resolve();
    }

    public async loadById(id: string | number): Promise<FirebaseStorageDatabaseEntity | null> {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot load image metadata from Firebase storage');
        }

        const pathToFile = this.getFilePath(id);
        const fileRef = this.getFileRef(id);

        const fileMetadata = await fileRef.getMetadata();
        const idStr = id.toString();

        return Promise.resolve<FirebaseStorageDatabaseEntity>({
            id: idStr,
            collectionName: this.collectionName,

            fileName: idStr,
            pathToFile,
            metadata: {
                name: fileMetadata[0].name,
                size: fileMetadata[0].size,
                contentType: fileMetadata[0].contentType
            },
        })
    }

    public createFileUploadStream(id: string | number, options?: CreateWriteStreamOptions) {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot create file upload stream for Firebase storage item');
        }

        const fileRef = this.getFileRef(id);
        return fileRef.createWriteStream(options);
    }

    public createFileDownloadStream(id: string | number): Readable {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot create file read stream for Firebase storage item');
        }

        const fileRef = this.getFileRef(id);
        return fileRef.createReadStream();
    }

    public async downloadDocumentById(id: string | number): Promise<DownloadResponse> {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot download file from Firebase storage');
        }

        const fileRef = this.getFileRef(id);
        return fileRef.download();
    }

    public async loadDocumentDownloadURLByID(id: string | number): Promise<string> {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot prepare image download URL for Firebase storage');
        }

        const fileRef = this.getFileRef(id);
        const urlResponse = await fileRef.getSignedUrl({
            action: 'read',
            expires: createDatePlusMinutesFromNow(REMOTE_FILE_READ_LINK_TTL_MINUTES),
        });

        return urlResponse[0];
    }

    public async makeDocumentPublic(id: string | number): Promise<string> {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot make document public at Firebase storage');
        }

        const fileRef = this.getFileRef(id);
        await fileRef.makePublic();

        return this.getDocumentPublicURL(id);
    }

    public async makeDocumentPrivate(id: string | number): Promise<void> {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot make document private at Firebase storage');
        }

        const fileRef = this.getFileRef(id);
        await fileRef.makePrivate();
    }

    public getDocumentPublicURL(id: string | number): string {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot get public URL for document at Firebase storage');
        }

        const fileRef = this.getFileRef(id);
        return fileRef.publicUrl();
    }

    public async getDocumentMetaData(id: string | number) {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot get metadata for document at Firebase storage');
        }

        const fileRef = this.getFileRef(id);
        return fileRef.getMetadata();
    }

    public async getDocumentSize(id: string | number): Promise<string | number> {
        if (isNil(id)) {
            throw new RangeError('Id is not specified - cannot get size for document at Firebase storage');
        }

        const documentMetaData = await this.getDocumentMetaData(id);
        return documentMetaData[0].size;
    }
}

// exports
export default AbstractFirebaseStorageDatabaseModel;