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