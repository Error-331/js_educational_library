// external imports

// internal imports

// implementation
type GCPGenerativeLanguageRESTAPIInfoResponse = {
    id: string;
    kind: string;
    version: string;

    name: string;
    title: string;
    description: string;

    baseUrl: string
    documentationLink: string;

    icons: {
        x16: string;
        x32: string;
    }
};

// exports
export type {
    GCPGenerativeLanguageRESTAPIInfoResponse,
}