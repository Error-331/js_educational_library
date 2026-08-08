// external imports

// internal imports

// implementation
type GCPAPIDiscoveryAPItem = {
    id: string;
    kind: string;

    name: string;
    title: string;
    description: string;

    discoveryRestUrl: string;
    documentationLink: string;

    preferred: boolean;

    icons: {
        x16: string;
        x32: string;
    }
}

type GCPAPIDiscoveryAPItemsResponse = {
    kind: string;
    discoveryVersion: string;
    items: GCPAPIDiscoveryAPItem[];
};

// exports
export type {
    GCPAPIDiscoveryAPItem,
    GCPAPIDiscoveryAPItemsResponse,
}