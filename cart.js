const cartSection = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartSum = document.querySelector("#cart-sum");
const buyButton = document.querySelector("#buy-button");

export function renderCart(cart, cartToSend) {
    let total = [];
    cartItems.innerHTML = ""; // Töm innehållet i kundvagnen innan vi renderar om

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

        // Lägg till klasser för styling
        dotBox.classList.add("dot-box");
        itemContainer.classList.add("item-container");
        itemControls.classList.add("item-controls");
        increaseButton.classList.add("increase-button");
        decreaseButton.classList.add("decrease-button");

        // Text och innehåll
        itemTitle.innerText = item.name.toUpperCase();
        itemPrice.innerText = item.price * item.quantity + " SEK";
        increaseButton.innerText = "+";
        decreaseButton.innerText = "-";
        quantityDisplay.innerText = item.quantity;

        // Lägg till det totala priset
        total.push(item.price * item.quantity);

        // Lägg till element till DOM
        cartItems.append(itemContainer);
        itemContainer.append(itemTitleContainer, itemControls);
        itemTitleContainer.append(itemTitle, dotBox, itemPrice);
        itemControls.append(decreaseButton, quantityDisplay, increaseButton);

        // Event Listeners
        increaseButton.addEventListener("click", () => {
            item.quantity++;
            updateCart(cart, cartToSend);
        });

        decreaseButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                // Ta bort artikeln från kundvagnen om kvantiteten är 1
                const index = cart.indexOf(item);
                if (index > -1) {
                    cart.splice(index, 1);
                }
            }
            updateCart(cart, cartToSend);
        });
    });

    // Uppdatera totalsumma
    cartSum.innerText = total.reduce((a, b) => a + b, 0) + " SEK";
}

function updateCart(cart, cartToSend) {
    renderCart(cart, cartToSend); // Rendera om kundvagnen
    updateCartCounter(); // Uppdatera antalet artiklar i badge
}