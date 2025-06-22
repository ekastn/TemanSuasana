// darkmode.js  — toggle & persist preference
export function initDarkMode() {
  const toggle = document.getElementById("darkToggle");

  // 1.  apply saved preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  // 2.  update when user toggles
  toggle.addEventListener("change", () => {
    const active = toggle.checked;
    document.body.classList.toggle("dark", active);
    localStorage.setItem("darkMode", active);
  });
}
