import { generateApiMasterList } from "../services/dataFactories/masterlist";
import { filterList } from "../services/util/listMethods";
import Entity from "../config/entity/config.json";

export default async function Home() {
    const apiList = await generateApiMasterList();

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Path</th>
                        {Entity.map(entity => (
                            <th key={entity}>{entity}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {apiList.map(api => (
                        <tr key={api.uid}>
                            <td>{api.domain}</td>
                            <td>{api.pathName}</td>
                            {Entity.map(entity => (
                                <td key={entity}>
                                    {Object.keys(api[entity] || {}).map(key => (
                                        <div key={key}>
                                            {key}: {api[entity][key].toString()}
                                        </div>
                                    ))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
