document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-to-cart-form");
    const sizeButtons = document.querySelectorAll(".size-btn");
    const selectedSize = document.getElementById("selected-size");

    if (!form) return;

    sizeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            sizeButtons.forEach((btn) => {
                btn.classList.remove("bg-white", "text-black");
            });

            button.classList.add("bg-white", "text-black");
            selectedSize.value = button.dataset.size;
        });
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!selectedSize.value) {
            alert("Please select a size.");
            return;
        }

        try {
            const response = await fetch("/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: form.productId.value,
                    size: form.size.value,
                    quantity: Number(form.quantity.value) || 1,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            showToast(data.message);

            setTimeout(() => {
                location.reload();
            }, 1200);

        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    });
});

function showToast(message) {
    const existing = document.getElementById("toast");

    if (existing) existing.remove();

    const toast = document.createElement("div");

    toast.id = "toast";
    toast.textContent = `✓ ${message}`;

    toast.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: #16a34a;
        color: white;
        padding: 14px 24px;
        border-radius: 12px;
        font-family: sans-serif;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,.35);
        z-index: 999999;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1000);
}