const apiKey = 'yum-24wDDIiKn23xmDqw'
const url = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'


export async function getMenu() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-zocom": apiKey
        }
    }
    try {
        const response = await fetch(url + "/menu", options);
        const data = await response.json()
        return data.items;
    } catch (error) {
        console.log("Fel:", response.status, error);
    }
}