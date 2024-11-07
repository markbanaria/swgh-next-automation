import { getApiList, getApiDetails, getSlugAndVersion } from "../util/masterPathList";
import { scrubList } from "../util/listMethods";
import { extractMatch } from "../util/stringMethods";
import Entities from "../../config/entity/config.json";
import StatusTypes from "../../config/status_type/config.json";
import { APIDetails } from "@/src/types/swaggerHub";

export async function getswaggerHubContracts() {

    function _addAPIDetailsToListObject(apiDetails: APIDetails, key: string) {
        const title = apiDetails["info"]["title"];
        const entity = extractMatch(title, Entities);
        const method = Object.keys(apiDetails.paths[key]).find(method => ["get", "post", "put", "delete"].includes(method)
        );
        const domain = method && apiDetails.paths[key][method].tags
            ? apiDetails.paths[key][method].tags[0]
            : null;

        return {
            "uid": key,
            "entity": entity || "",
            "domain": domain,
            "pathName": key,
            "description": apiDetails.paths[key].description,
            "status": {
                "ContractAvailable": true,
                "ProxyDefined": false,
                "SymphonyToProxyTestPassed": false,
                "ProxyToLocalTestPassed": false
            }
        };
    }
    
    const apiList = await getApiList();
    const apiPathDump = (await Promise.all(apiList.map(async api => {
        const { slug, version } = getSlugAndVersion(api);
        if (!slug || !version) return [];
    
        const apiDetails = await getApiDetails(slug, version);
        return Object.keys(apiDetails.paths).map(key => _addAPIDetailsToListObject(apiDetails, key));
    }))).flat();
    

    const swaggerHubContracts = scrubList(apiPathDump, "entity", "");
    console.log(swaggerHubContracts.splice(0, 5));
    return swaggerHubContracts;
}