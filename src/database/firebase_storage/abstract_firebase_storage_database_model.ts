// external imports
import { File as StorageFile, Bucket, DownloadResponse } from '@google-cloud/storage';
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
import { isNil } from '../../utils/misc/logic_utils';

// implementation
abstract class AbstractFirebaseStorageDatabaseModel extends AbstractDatabaseModel<FirebaseStorageDatabaseEntity, FirebaseStorageDatabaseEntity> {
    protected getStorageBucket(): Bucket {
        const storage = FirebaseAdminRegistry.getInstance().storage;
        return storage.bucket();
    }

    protected getFilePath(ID: string | number): string {
        if (isNil(ID)) {
            throw new RangeError('ID is not specified - cannot prepare path to file in Firebase storage');
        }

        return posix.join(`${this.collectionName}`, ID.toString());
    }

    protected getFileRef(ID: string | number): StorageFile {
        if (isNil(ID)) {
            throw new RangeError('ID is not specified - cannot prepare file reference to Firebase storage');
        }

        const pathToFile = this.getFilePath(ID);
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
            fileName: pathToFile,
            metadata: {},
            id: pathToFile,
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

    public async loadDocumentById(id: string | number): Promise<FirebaseStorageDatabaseEntity | null> {
        if (isNil(id)) {
            throw new RangeError('ID is not specified - cannot load image metadata from Firebase storage');
        }

        const pathToFile = this.getFilePath(id);
        const fileRef = this.getFileRef(id);

        const fileMetadata = await fileRef.getMetadata();

        return Promise.resolve<FirebaseStorageDatabaseEntity>({
            id: id.toString(),
            collectionName: this.collectionName,

            fileName: pathToFile,
            metadata: {
                name: fileMetadata[0].name,
                size: fileMetadata[0].size,
                contentType: fileMetadata[0].contentType
            },
        })
    }

    public async downloadDocumentById(id: string | number): Promise<DownloadResponse> {
        if (isNil(id)) {
            throw new RangeError('id is not specified - cannot download file from Firebase storage');
        }

        const fileRef = this.getFileRef(id);
        return fileRef.download();
    }

    public async loadDocumentDownloadURLByID(ID: string | number): Promise<string> {
        if (isNil(ID)) {
            throw new RangeError('ID is not specified - cannot prepare image download URL for Firebase storage');
        }

        const fileRef = this.getFileRef(ID);
        const urlResponse = await fileRef.getSignedUrl({
            action: 'read',
            expires: createDatePlusMinutesFromNow(REMOTE_FILE_READ_LINK_TTL_MINUTES),
        });

        return urlResponse[0];
    }

    public async makeDocumentPublic(ID: string | number): Promise<string> {
        if (isNil(ID)) {
            throw new RangeError('ID is not specified - cannot make document public at Firebase storage');
        }

        const fileRef = this.getFileRef(ID);
        await fileRef.makePublic();

        return this.getDocumentPublicURL(ID);
    }

    public async makeDocumentPrivate(ID: string | number): Promise<void> {
        if (isNil(ID)) {
            throw new RangeError('ID is not specified - cannot make document private at Firebase storage');
        }

        const fileRef = this.getFileRef(ID);
        await fileRef.makePrivate();
    }

    public getDocumentPublicURL(ID: string | number): string {
        if (isNil(ID)) {
            throw new RangeError('ID is not specified - cannot get public URL for document at Firebase storage');
        }

        const fileRef = this.getFileRef(ID);
        return fileRef.publicUrl();
    }
}

// exports
export default AbstractFirebaseStorageDatabaseModel;