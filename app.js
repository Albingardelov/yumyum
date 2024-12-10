import { getMenu } from "./api.js";
import { renderMenu, cart, cartToSend } from "./menu.js";
import { renderCart } from "./cart.js";

const cartButtons = document.querySelectorAll(".cart-button");
const menuSection = document.querySelector(".menu");
const cartSection = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");

renderMenu(await getMenu());

cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        cartItems.innerHTML = "";
        renderCart(cart, cartToSend);
        toggleCart();
    });
});

function toggleCart() {
    menuSection.classList.toggle("hidden");
    cartSection.classList.toggle("hidden");
}