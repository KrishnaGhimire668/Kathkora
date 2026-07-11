const menuButton = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuButton?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

const profileButton = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

profileButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown?.classList.toggle("hidden");
});

profileDropdown?.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", () => {
    profileDropdown?.classList.add("hidden");
});