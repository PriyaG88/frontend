"use strict";

(() => {
    const button = document.querySelector("button");
    const inputField = document.querySelector("input");
    const todoList = document.querySelector("ul");
    const errorContainer = document.querySelector("#error-container");

    button.addEventListener("click", () => {
        let text = inputField.value;
        let li = document.createElement("li");
        let textNode = document.createTextNode(text);
        let closeBtn = document.createElement("span");

        if (text.length === 0) {
            showError(errorContainer);
        } else {
            hideError(errorContainer);
            
            closeBtn.appendChild(document.createTextNode("\u00D7"));
            closeBtn.classList.add("close-btn");
            li.appendChild(textNode);
            li.appendChild(closeBtn);
            todoList.appendChild(li);
            inputField.value = "";

            closeBtn.addEventListener("click", e => {
                e.target.parentElement.remove();
            });
        }
    });

    inputField.addEventListener("keyup", e => {
        if (e.key === "Enter") button.click();
    });
})();

const showError = error => {
    error.style.display = "block";
}

const hideError = error => {
    error.style.display = "none";
}