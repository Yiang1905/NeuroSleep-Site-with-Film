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

// Translate the complete page, not only navigation labels.
(() => {
  const selector = document.getElementById("ns-lang-select");
  if (!selector) return;
  const supported = new Set(["en","zh-CN","zh-TW","ja","ko","es","fr","de","it","pt","ru","ar","hi","id","vi","th","tr"]);
  const readLanguage = () => {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "en";
  };
  const current = readLanguage();
  selector.value = supported.has(current) ? current : "en";
  selector.addEventListener("change", () => {
    const lang = supported.has(selector.value) ? selector.value : "en";
    document.cookie = lang === "en" ? "googtrans=; Max-Age=0; path=/" : `googtrans=/en/${lang}; path=/; SameSite=Lax`;

    window.location.reload();
  });
  if (!document.getElementById("google_translate_element")) {
    const holder = document.createElement("div");
    holder.id = "google_translate_element";
    holder.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;overflow:hidden;";
    document.body.appendChild(holder);
  }
  window.googleTranslateElementInit = function () {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement({pageLanguage:"en", includedLanguages:Array.from(supported).filter(x=>x!=="en").join(","), autoDisplay:false}, "google_translate_element");
    }
  };
  if (!document.querySelector('script[data-ns-google-translate]')) {
    const script = document.createElement("script");
    script.dataset.nsGoogleTranslate = "true";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }
})();