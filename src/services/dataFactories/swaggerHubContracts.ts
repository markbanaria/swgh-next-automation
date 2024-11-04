import {  } from "../../types/swaggerHub";
import { getApiList, extractTag, getApiDetails, getSlugAndVersion } from "../util/masterPathList";
import Domains from "../../config/domain/config.json";
import Entities from "../../config/entity/config.json";

export async function generateApiMasterList() {
    const apiMasterList: any[] = [];
    const apiList = await getApiList();
    const tags = Domains
    const entities = Entities;

    const AllApiDetails = await Promise.all(apiList.map(async api => {
        // if api name contains any of the entities
        // const { slug, version } = getSlugAndVersion(api.name)
        // const apiDetails = getApiDetails(slug, version)
        // for each item in apiDetails.paths 
        // add an entry to the apiMasterList like this
        // apiMasterList.push({entity: entity, path: api.name, path: item key, stages: item.stages})
    }

    const returnVal = apiList;
    return returnVal;
}
