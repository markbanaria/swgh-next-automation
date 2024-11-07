import { fetchAPIByName, fetchAPIList } from "../dataSources/swaggerHubAPI";
import { API, APIDetails } from "../../types/swaggerHub";

export async function getApiList(): Promise<API[]> {
    return fetchAPIList();
}

export async function getApiDetails(name: string, version: string): Promise<APIDetails> {
    return fetchAPIByName(`${name}`,`${version}`);
}

export function extractTag(api: API): string | null {
    const nameParts = api.name.replace('API', '').split(' ');
    const entityIndex = nameParts.indexOf("Symphony") + 1;
    return entityIndex < nameParts.length ? nameParts[entityIndex] : null;
}

export function getSlugAndVersion(api: API): { slug: string | undefined; version: string | undefined } {
    const swaggerProp = api.properties.find(prop => prop.type === "Swagger");
    const versionProp = api.properties.find(prop => prop.type === "X-Version");
    return {
        slug: swaggerProp?.url?.split('/').slice(-2, -1)[0],
        version: versionProp?.value
    };
}

export function findUid(lbu: string, pathname: string): string {
    
    return "asdf";
}