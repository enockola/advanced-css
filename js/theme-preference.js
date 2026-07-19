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

    const logo = document.querySelector(".site-logo");

    if (logo) {
      logo.setAttribute("aria-label", "Enoch Olayemi — home");
      logo.innerHTML = `
        <svg class="site-logo__mark" viewBox="0 0 92 48" aria-hidden="true">
          <path class="site-logo__stroke site-logo__stroke--e" pathLength="1" d="M39 8H10v32h29M10 24h24" />
          <path class="site-logo__stroke site-logo__stroke--o" pathLength="1" d="M57 8c-9 0-15 6-15 16s6 16 15 16 15-6 15-16S66 8 57 8Z" />
          <path class="site-logo__dot" d="M82 35a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
        </svg>`;
    }

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
