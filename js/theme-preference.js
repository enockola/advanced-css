/**
 * Theme preference: restore on load and persist on change.
 * Load in <head> WITHOUT defer or async.
 */
(() => {
  const STORAGE_KEY = "theme-preference";
  const ALLOWED = new Set(["light", "system", "dark"]);

  function getStoredPreference() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return ALLOWED.has(stored) ? stored : "system";
    } catch {
      return "system";
    }
  }

  function savePreference(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage may be disabled */
    }
  }

  function applyPreference(value) {
    document.documentElement.dataset.theme = value;
  }

  const currentPreference = getStoredPreference();
  applyPreference(currentPreference);

  document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll('input[name="theme-preference"]');

    inputs.forEach((input) => {
      input.checked = input.value === currentPreference;
    });
  });

  document.addEventListener("change", (event) => {
    const target = event.target;

    if (
      target.matches &&
      target.matches('input[name="theme-preference"]')
    ) {
      const value = target.value;

      if (!ALLOWED.has(value)) return;

      savePreference(value);
      applyPreference(value);
    }
  });
})();