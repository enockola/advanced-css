const root = document.documentElement;
const drawPaths = document.querySelectorAll(".draw-path");
const sunStage = document.querySelector(".sun-stage");

const slowMotionControl = document.querySelector("#slow-motion");
const reducedMotionControl = document.querySelector("#reduced-motion");
const transformFixControl = document.querySelector("#transform-fix");
const replayButton = document.querySelector("#replay");
const status = document.querySelector("#demo-status");

/*
 * Measure the heart line instead of guessing its length.
 */
drawPaths.forEach((path) => {
  const pathLength = path.getTotalLength();
  path.style.setProperty("--path-length", pathLength);
});

/*
 * Restart the heart animation.
 */
function replayHeart() {
  if (reducedMotionControl.checked) {
    status.textContent = "Animations are off. The heart stays visible.";
    return;
  }

  drawPaths.forEach((path) => {
    path.style.animation = "none";
    void path.getBoundingClientRect();
    path.style.animation = "";
  });

  status.textContent = "Heart is drawing. Sun is rotating.";

  const completionTime = slowMotionControl.checked ? 4200 : 1700;

  window.setTimeout(() => {
    if (!reducedMotionControl.checked) {
      status.textContent = "Heart finished. Sun keeps moving.";
    }
  }, completionTime);
}

/*
 * Slow both animations down.
 */
function updateSlowMotion() {
  root.classList.toggle(
    "slow-motion",
    slowMotionControl.checked
  );

  replayHeart();
}

/*
 * Turn both animations off for the demonstration.
 */
function updateReducedMotion() {
  root.classList.toggle(
    "reduced-motion",
    reducedMotionControl.checked
  );

  if (reducedMotionControl.checked) {
    status.textContent = "Animations are off. The heart stays visible.";
  } else {
    replayHeart();
  }
}

/*
 * Show the transform-box problem and fix.
 */
function updateTransformFix() {
  sunStage.classList.toggle(
    "use-fill-box",
    transformFixControl.checked
  );

  status.textContent = transformFixControl.checked
    ? "The rays are rotating around the green dot."
    : "The rays are rotating around the red dot.";
}

/*
 * Controls
 */
slowMotionControl.addEventListener("change", updateSlowMotion);
reducedMotionControl.addEventListener("change", updateReducedMotion);
transformFixControl.addEventListener("change", updateTransformFix);
replayButton.addEventListener("click", replayHeart);

/*
 * Start the demo.
 */
updateTransformFix();
replayHeart();
