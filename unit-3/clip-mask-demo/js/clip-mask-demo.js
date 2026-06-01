const clipDemo = document.querySelector(".clip-mask-page");
const clipImage = clipDemo?.querySelector("#clip-sample");
const clipCode = clipDemo?.querySelector("#clip-code");
const shapeButtons = clipDemo?.querySelectorAll("[data-shape]");

if (clipDemo && clipImage && clipCode && shapeButtons.length > 0) {
  shapeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const shape = button.dataset.shape;

      clipImage.style.setProperty("--clip-demo-shape", shape);
      clipCode.textContent = `clip-path: ${shape};`;

      shapeButtons.forEach((item) => {
        item.setAttribute("aria-pressed", "false");
      });

      button.setAttribute("aria-pressed", "true");
    });
  });
}