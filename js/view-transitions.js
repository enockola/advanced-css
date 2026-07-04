/**
 * Unit 6: View Transitions API demo.
 *
 * Clicking the Unit 6 card replaces the assignment grid with a detail panel.
 * Supported browsers animate between the old and new snapshots.
 * Other browsers still receive the same working interface without animation.
 */
(() => {
  const grid = document.querySelector("[data-assignment-grid]");
  const openButton = document.querySelector(
    "[data-view-transition-open]"
  );
  const detailPanel = document.querySelector(
    "[data-view-transition-panel]"
  );
  const closeButton = document.querySelector(
    "[data-view-transition-close]"
  );

  if (!grid || !openButton || !detailPanel || !closeButton) {
    return;
  }

  const transitionName = "assignment-preview";

  /**
   * Perform the normal DOM update.
   *
   * When isOpen is true:
   * - Hide the assignment grid.
   * - Show the detail panel.
   *
   * When isOpen is false:
   * - Show the assignment grid.
   * - Hide the detail panel.
   */
  function updateView(isOpen) {
    grid.hidden = isOpen;
    detailPanel.hidden = !isOpen;

    openButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  }

  /**
   * Use the View Transitions API when supported.
   * Otherwise, perform the update immediately.
   */
  function startTransition(update) {
    if (
      typeof document.startViewTransition !== "function"
    ) {
      update();
      return null;
    }

    return document.startViewTransition(update);
  }

  /**
   * Run something after the transition finishes.
   */
  function afterTransition(transition, callback) {
    if (!transition) {
      callback();
      return;
    }

    transition.finished
      .catch(() => {
        // Ignore a cancelled transition.
      })
      .finally(callback);
  }

  /**
   * Open the detail view.
   */
  function openDetails() {
    /*
     * The clicked card temporarily receives the same name as the
     * detail panel. This tells the browser that they represent the
     * same visual object.
     */
    openButton.style.viewTransitionName =
      transitionName;

    const transition = startTransition(() => {
      updateView(true);
    });

    afterTransition(transition, () => {
      /*
       * Remove the temporary name so another transition does not
       * accidentally reuse it.
       */
      openButton.style.removeProperty(
        "view-transition-name"
      );

      closeButton.focus({
        preventScroll: true
      });
    });
  }

  /**
   * Return to the assignment grid.
   */
  function closeDetails() {
    /*
     * The card will become visible again after the DOM update,
     * so it needs the matching name for the new snapshot.
     */
    openButton.style.viewTransitionName =
      transitionName;

    const transition = startTransition(() => {
      updateView(false);
    });

    afterTransition(transition, () => {
      openButton.style.removeProperty(
        "view-transition-name"
      );

      openButton.focus({
        preventScroll: true
      });
    });
  }

  openButton.addEventListener("click", openDetails);
  closeButton.addEventListener("click", closeDetails);

  /*
   * Allow the user to close the panel with the Escape key.
   */
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      !detailPanel.hidden
    ) {
      closeDetails();
    }
  });
})();