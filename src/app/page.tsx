import { generateApiMasterList } from "../services/dataFactories/swaggerHubContracts";

export default async function Home() {
    const apiList = await generateApiMasterList();
    console.log(apiList);
    return (
        <div>
            <h1>API Services</h1>
        </div>
    );
}