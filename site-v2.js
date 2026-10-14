(() => {
  const button = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!button || !nav) return;
  const closeMenu = () => {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    button.textContent = "Menu ☰";
  };
  button.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    button.textContent = open ? "Close ×" : "Menu ☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
})();