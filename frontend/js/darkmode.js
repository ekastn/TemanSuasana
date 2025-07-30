// darkmode.js  — toggle & persist preference
export function initDarkMode() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // 1. apply saved preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  // 2. update when user toggles
  toggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", isDark);
    // Optional: update icon/text
    const icon = toggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    const text = toggle.querySelector('.theme-text');
    if (text) text.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  });
}

// Auto-init if not using module system
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initDarkMode);
}
