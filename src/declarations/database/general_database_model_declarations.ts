// external imports
import { DocumentData } from 'firebase-admin/firestore';

// internal imports

// implementation
type DefaultDatabaseModelOutput = string | number | null;

interface AbstractDatabaseDocument {
    [key: string]: unknown;
}

interface DatabaseDocument extends DocumentData {
    id: string;

    createdTimestamp: number;
    updatedTimestamp: number;
}

type WithDatabaseDocument<T> = T & DatabaseDocument;

// exports
export type {
    DefaultDatabaseModelOutput,
    AbstractDatabaseDocument,
    DatabaseDocument,
    WithDatabaseDocument,
}