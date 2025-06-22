export function initRouter() {
  const pages = document.querySelectorAll(".page");
  document.querySelectorAll(".sidebar li").forEach(li => {
    li.addEventListener("click", () => {
      document.querySelector(".sidebar li.active").classList.remove("active");
      li.classList.add("active");
      const page = li.getAttribute("data-page");
      pages.forEach(p => p.classList.add("hidden"));
      document.getElementById(`page-${page}`).classList.remove("hidden");
    });
  });
}