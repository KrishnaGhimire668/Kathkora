const form = document.querySelector("#add-to-cart-form");
const buttons = document.querySelectorAll(".size-btn");
const input = document.querySelector("#selected-size");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((b) =>
            b.classList.remove("bg-white", "text-black")
        );

        button.classList.add("bg-white", "text-black");
        input.value = button.dataset.size;
    });
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!input.value) {
        alert("Please select a size.");
        return;
    }

    const formData = new FormData(form);

    const response = await fetch("/cart", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        alert("Failed to add to cart.");
        return;
    }

    const toast = document.createElement("div");

    toast.className =
        "fixed top-6 right-6 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg";

    toast.textContent = "✓ Added to cart";

    document.body.appendChild(toast);

    setTimeout(() => {
        location.reload();
    }, 1000);
});