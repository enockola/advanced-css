const demo = document.querySelector(".scale-demo");
const ratioInput = document.querySelector("#ratio");
const ratioOutput = document.querySelector("#ratio-output");
const computedValues = document.querySelectorAll(".computed-value");

function updateComputedValues() {
  computedValues.forEach((cell) => {
    const target = document.querySelector(cell.dataset.target);

    if (!target) {
      cell.textContent = "Unavailable";
      return;
    }

    cell.textContent = getComputedStyle(target).fontSize;
  });
}

function updateRatio() {
  const ratio = Number(ratioInput.value);

  demo.style.setProperty("--ratio", ratio);
  ratioOutput.value = ratio.toFixed(3);

  requestAnimationFrame(updateComputedValues);
}

ratioInput.addEventListener("input", updateRatio);
window.addEventListener("resize", updateComputedValues);

updateRatio();