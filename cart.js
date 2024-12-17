import { updateCartCounter } from "./menu.js";
import { cart } from "./menu.js";
import { sendOrder } from "./api.js";
import { renderReceipt } from "./receipt.js";

const cartSection = document.querySelector(".cart");
const etaSection = document.querySelector(".eta");
const receiptSection = document.querySelector(".receipt");
const menuSection = document.querySelector(".menu");
const goToMenuButton = document.querySelector(".goToMenu-button");
const cartItems = document.querySelector(".cart-items");
const cartSum = document.querySelector("#cart-sum");
const buyButton = document.querySelector("#buy-button");
const showReceiptButton = document.querySelector("#receipt-button");
const newOrderButton = document.querySelector("#neworder-button");

const cartToSend = [];

buyButton.addEventListener("click", async () => {
    if (cartToSend.length === 0) {
        console.log("Kundvagnen är tom!");
    } else {
        try {
            const response = await sendOrder(cartToSend);
            if (response && response.order) {
                console.log("Order mottagen:", response);

                sessionStorage.setItem("receiptData", JSON.stringify({
                    id: response.order.id,
                    orderValue: response.order.orderValue,
                    items: response.order.items
                }));

                cartSection.classList.add("hidden");
                etaSection.classList.add("active");
                etaSection.classList.remove("hidden");

                const etaTime = new Date(response.order.eta);
                const currentTime = new Date();
                const timeLeftInMinutes = Math.ceil((etaTime - currentTime) / (1000 * 60));

                const etaMessage = document.querySelector("#eta-message");
                const etaOrderId = document.querySelector("#eta-order-id");

                etaMessage.innerText = `ETA ${timeLeftInMinutes} MIN`;
                etaOrderId.innerText = `#${response.order.id.toUpperCase()}`;
            } else {
                console.error("Fel: Ogiltigt svar från API.");
            }
        } catch (error) {
            console.error("Fel vid skickning av order:", error);
        }
    }
});


showReceiptButton.addEventListener("click", () => {
    const receiptData = JSON.parse(sessionStorage.getItem("receiptData"));
    if (receiptData) {
        etaSection.classList.remove("active");
        etaSection.classList.add("hidden");

        receiptSection.classList.remove("hidden");
        renderReceipt(receiptData);
    } else {
        console.error("Ingen kvitto-data hittades!");
    }
});

newOrderButton.addEventListener("click", () => {
    receiptSection.classList.add("hidden");
	etaSection.classList.add("hidden");
	etaSection.classList.remove("active")

    menuSection.classList.remove("hidden");

    cart.length = 0;
    cartToSend.length = 0;
    updateCartCounter();
});

goToMenuButton.addEventListener("click", () => {
    receiptSection.classList.add("hidden");

    etaSection.classList.add("hidden");

    menuSection.classList.remove("hidden");

    cart.length = 0;
    cartToSend.length = 0;
    updateCartCounter();
});



export function renderCart(cart) {
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
            updateCart(cart);
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
            updateCart(cart);
        });
    });

    cartSum.innerText = total.reduce((a, b) => a + b, 0) + " SEK";
    updateCartToSend(cart);
}

function updateCartToSend(cart) {
    cartToSend.length = 0;
    cart.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
            cartToSend.push(item.id);
        }
    });
}

export function updateCart(cart) {
    renderCart(cart);
    updateCartCounter();
}
