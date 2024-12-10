const cartSection = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartSum = document.querySelector("#cart-sum");
const buyButton = document.querySelector("#buy-button");

export function renderCart(cart, cartToSend) {
    let total = [];
    cart.forEach((item) => {
        const itemContainer = document.createElement("div");
        const itemTilteContainer = document.createElement("div");
        const itemTitle = document.createElement("h3");
        const itemPrice = document.createElement("h3");
        const dotBox = document.createElement("div");

        dotBox.classList.add("dot-box");
        itemContainer.classList.add("item-container");

        itemTitle.innerText = item.name.toUpperCase();
        itemPrice.innerText = item.price * item.quantity + " SEK";
        total.push(item.price * item.quantity);

        cartItems.append(itemContainer);
        itemContainer.append(itemTilteContainer);
        itemTilteContainer.append(itemTitle, dotBox, itemPrice);
    });

    cartSum.innerText = total.reduce((a, b) => a + b, 0) + " SEK";
}