const apiKey = "yum-24wDDIiKn23xmDqw"; // Din API-nyckel
const url = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com"; // Bas-URL för API:et

// Funktion för att registrera en Tenant
 async function registerTenant(userName) {
    const options = {
        method: "POST", // POST-metod för att registrera en tenant
        headers: {
            "Content-Type": "application/json", // Skickar JSON
            "x-zocom": apiKey                   // Din API-nyckel i headern
        },
        body: JSON.stringify({ name: userName }) // Namnet som skickas till servern
    };

    try {
        // Gör anrop till API:et
        const response = await fetch(url + "/tenants", options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Omvandla svaret till JSON
        const data = await response.json();
        console.log("Tenant ID fetched:", data.id);

        // Spara Tenant ID i localStorage
        localStorage.setItem("tenantID", data.id);
        console.log("Tenant ID saved to localStorage:", data.id);

        return data.id;
    } catch (error) {
        console.error("Failed to register Tenant:", error);
    }
}

// Anropa funktionen för att registrera Tenant
registerTenant("Albin gärdelöv1");
