const API_URL = process.env.NEXT_PUBLIC_SWAGGERHUB_ENDPOINT;
const API_KEY = process.env.NEXT_PUBLIC_SWAGGERHUB_API_KEY;

export async function fetchAPIList() {
    const response = await fetch(`${API_URL}?limit=100`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseObject = await response.json();
    const apiList = responseObject.apis;

    return apiList;
}

export async function fetchAPIByName(name, version) {
    console.log(`${API_URL}/${name}/${version}`);
    const response = await fetch(`${API_URL}/${name}/${version}`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseObject = await response.json();
    const apiDetails = responseObject;

    return apiDetails
}
