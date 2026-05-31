const liveCard = document.querySelector("#live-card");
const colorName = document.querySelector("#color-name");
const buttons = document.querySelectorAll("[data-color]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    liveCard.style.setProperty("--card-bg", button.dataset.color);

    /*
      This fallback is only used if the browser does not support contrast-color().
      The real demo is still happening in css/components/contrast-card.css.
    */
    liveCard.style.setProperty("--safe-text-color", button.dataset.text);

    colorName.textContent = `${button.textContent.trim()} background`;
  });
});
