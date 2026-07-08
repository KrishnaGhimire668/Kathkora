const form = document.querySelector("#add-to-cart-form");
const buttons = document.querySelectorAll(".size-btn");
const input = document.querySelector("#selected-size");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        buttons.forEach((b) => {
            b.classList.remove("bg-white", "text-black");
        });

        button.classList.add("bg-white", "text-black");

        input.value = button.dataset.size;

    });

});

form.addEventListener("submit", (e) => {

    if (!input.value) {

        e.preventDefault();

        alert("Please select a size.");

    }

});