// external imports

// internal imports
import { AbstractDatabaseDocument } from './general_model_declarations';

// implementation
interface FirebaseStorageDatabaseFileMetadata {
    name?: string;
    size?: string | number;
    contentType?: string;
}

interface FirebaseStorageDatabaseEntity extends AbstractDatabaseDocument {
    fileName: string;
    file?: Uint8Array;
    metadata: FirebaseStorageDatabaseFileMetadata;

    get id(): string
}

// exports
export type {
    FirebaseStorageDatabaseFileMetadata,
    FirebaseStorageDatabaseEntity,
}