const apiKey = 'yum-24wDDIiKn23xmDqw'
const tenantId = 'zqfz'
const url = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'


async function getMenu() {
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

async function sendOrder(cart) {
    const bodyToSend = { items: cart };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-zocom": apiKey,
        },
        body: JSON.stringify(bodyToSend),
    };
    try {
        const response = await fetch(url + tenantId + "/orders", options);

        if (!response.ok) {
            console.error(
                `Fel vid anrop: ${response.status} ${response.statusText}`
            );
            return;
        }

        const data = await response.json();
        console.log(data);
        console.log(response.status);
        return data;
    } catch (error) {
        console.log("Fel:", error.message);
    }
}

export { sendOrder, getMenu};