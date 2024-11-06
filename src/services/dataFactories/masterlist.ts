import { getswaggerHubContracts } from "./swaggerHubContracts";
import { updateApigeeProxyStatus } from "./apigeeProxies";
import { updateSymphonyToApigeeTestStatus } from "./symphonyToApigeeTest";
import { updateApigeeToLocalTestStatus } from "./apigeeToLocalTest";
import { ExpandThenConverge, removeKeys } from "../util/listMethods";

export async function generateApiMasterList() {
    const initialPathList = await getswaggerHubContracts();
    const updates = [updateApigeeProxyStatus, updateSymphonyToApigeeTestStatus, updateApigeeToLocalTestStatus];
    const apiStatusMasterList = await updates.reduce(async (promiseList, update) => {
        const list = await promiseList;
        return update(list);
    }, Promise.resolve(initialPathList));

    const defaultStatus = { "ContractAvailable": true, "ProxyDefined": false, "SymphonyToProxyTestPassed": false, "ProxyToLocalTestPassed": false };
    const apiStatusMasterListByPath = ExpandThenConverge(apiStatusMasterList, "pathName", "entity", defaultStatus, { entity: 'Symphony' });
    const removeKeysMasterList = removeKeys(apiStatusMasterListByPath, ["status"]);

    console.log(apiStatusMasterListByPath.splice(0, 5));
    return removeKeysMasterList;
}