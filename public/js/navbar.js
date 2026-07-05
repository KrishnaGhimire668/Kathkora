const button = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

button?.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});