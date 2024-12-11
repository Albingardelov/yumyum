import { updateCartCounter } from "./menu.js";
const cartSection = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartSum = document.querySelector("#cart-sum");
const buyButton = document.querySelector("#buy-button");
const etaSection = document.querySelector(".eta");

// Lägg till event listener för buyButton
buyButton.addEventListener("click", () => {
    openEtaSection();
});

// Funktion för att öppna ETA-sektionen
function openEtaSection() {
    // Dölj kundvagnen
    cartSection.classList.add("hidden");

    // Visa ETA-sektionen
	etaSection.classList.add("active")
    etaSection.classList.remove("hidden");

    // Sätt ett meddelande eller ETA-logik
    const etaMessage = document.querySelector("#eta-message");
    etaMessage.textContent = "ETA 5 MIN";
}

export function renderCart(cart, cartToSend) {
    let total = [];
    cartItems.innerHTML = "";

    cart.forEach((item) => {
        const itemContainer = document.createElement("div");
        const itemTitleContainer = document.createElement("div");
        const itemTitle = document.createElement("h3");
        const itemPrice = document.createElement("h3");
        const dotBox = document.createElement("div");

        const itemControls = document.createElement("div");
        const increaseButton = document.createElement("button");
        const decreaseButton = document.createElement("button");
        const quantityDisplay = document.createElement("span");

        dotBox.classList.add("dot-box");
        itemContainer.classList.add("item-container");
        itemControls.classList.add("item-controls");
        increaseButton.classList.add("increase-button");
        decreaseButton.classList.add("decrease-button");

        itemTitle.innerText = item.name.toUpperCase();
        itemPrice.innerText = item.price * item.quantity + " SEK";
        increaseButton.innerText = "+";
        decreaseButton.innerText = "-";
        quantityDisplay.innerText = item.quantity;

        total.push(item.price * item.quantity);

        cartItems.append(itemContainer);
        itemContainer.append(itemTitleContainer, itemControls);
        itemTitleContainer.append(itemTitle, dotBox, itemPrice);
        itemControls.append(decreaseButton, quantityDisplay, increaseButton);

        increaseButton.addEventListener("click", () => {
            item.quantity++;
            updateCart(cart, cartToSend);
			updateCartCounter()
        });

        decreaseButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                const index = cart.indexOf(item);
                if (index > -1) {
                    cart.splice(index, 1);
                }
            }
            updateCart(cart, cartToSend);
			updateCartCounter()
        });
    });

    cartSum.innerText = total.reduce((a, b) => a + b, 0) + " SEK";
}

export function updateCart(cart, cartToSend) {
    renderCart(cart, cartToSend);
    updateCartCounter();
}