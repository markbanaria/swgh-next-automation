// Types for SwaggerHub API Contracts

export interface APIContract {
    name: string;
    domain: string;
    path: string;
    properties?: APIProperty[];
    tags?: { name: string }[];
    entities: Record<string, Record<string, PathStages>>;
}

export type APIProperty = {
    type: string;
    url?: string;
    value?: string;
};

export interface API {
    name: string;
    properties: APIProperty[];
    tags: { name: string }[];
}

export interface APIDetails {
    paths: Record<string, Record<string, any>>;
    tags?: { name: string }[];
}

// Consolidated Entity and Path structure to match the target JSON format
export interface Entity {
    entity: string;              // Name of the entity (e.g., "Symphony")
    paths: Path[];               // Array of paths associated with the entity
}

export interface Path {
    name: string;                // Path name (e.g., "/v1/agents/{id}")
    domain: string;              // Domain for the path (extracted from tags)
    stages: PathStages;          // Stages for this path
}

// Define path stages with default flags for each stage
export interface PathStages {
    ContractAvailable: boolean;
    ProxyDefined: boolean;
    SymphonyToProxyTestPassed: boolean;
    ProxyToLocalTestPassed: boolean;
}

// Updated EntityData structure to match new JSON format if needed
export interface EntityData {
    entityName: string;
    paths: PathInfo[];
}

export interface PathInfo {
    name: string;        // The tag or path name
    path: string;        // The actual path in the API
    stages: PathStages;
}

// Optional: Helper function interface for extracting slugs and versions
export interface SlugAndVersion {
    slug: string | undefined;
    version: string | undefined;
}
