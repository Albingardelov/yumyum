import { updateCartCounter } from "./menu.js";
import { cart } from "./menu.js";
import { sendOrder } from "./api.js";
import { renderReceipt } from "./receipt.js";

const cartSection = document.querySelector(".cart");
const receiptSection = document.querySelector(".receipt");
const cartItems = document.querySelector(".cart-items");
const cartSum = document.querySelector("#cart-sum");
const buyButton = document.querySelector("#buy-button");

const cartToSend = [];

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

buyButton.addEventListener("click", async () => {
    if (cartToSend.length === 0) {
        console.log("Kundvagnen är tom!");
    } else {
        try {
            const response = await sendOrder(cartToSend);
            if (response && response.order) {
                console.log("Order mottagen:", response);

                const itemsWithQuantity = response.order.items.map((itemFromAPI) => {
                    const matchingItem = cart.find(
                        (cartItem) => cartItem.id === itemFromAPI.id
                    );
                    return {
                        ...itemFromAPI,
                        quantity: matchingItem ? matchingItem.quantity : 1,
                    };
                });

                const receiptData = {
                    id: response.order.id,
                    orderValue: response.order.orderValue,
                    items: itemsWithQuantity,
                };

                cartSection.classList.add("hidden");
                receiptSection.classList.remove("hidden");
                renderReceipt(receiptData);
            } else {
                console.error("Fel: Ogiltigt svar från API.");
            }
        } catch (error) {
            console.error("Fel vid skickning av order:", error);
        }
    }
});



export function updateCart(cart) {
    renderCart(cart);
    updateCartCounter();
}
