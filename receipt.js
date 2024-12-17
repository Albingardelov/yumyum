const receiptItems = document.querySelector(".receipt-items");
const receiptSum = document.querySelector("#receipt-sum");
const receiptId = document.querySelector("#receipt-id");

export function renderReceipt(receipt) {
    receiptItems.innerHTML = "";
    receipt.items.forEach((item) => {
        const itemContainer = document.createElement("div");
        const itemTitle = document.createElement("h3");
        const itemPrice = document.createElement("h3");
        const quantity = document.createElement("p");

        itemContainer.classList.add("item-container");
        itemTitle.innerText = item.name.toUpperCase();
        itemPrice.innerText = item.price + " SEK";
        quantity.innerText = `Antal: ${item.quantity}`;

        itemContainer.append(itemTitle, quantity, itemPrice);
        receiptItems.append(itemContainer);
    });

    receiptSum.innerText = `Totalt: ${receipt.orderValue} SEK`;
    receiptId.innerText = `#${receipt.id}`;
}
