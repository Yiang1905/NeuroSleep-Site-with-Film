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

// Defer the film poster until the visitor scrolls near the film section.
(() => {
  const videos = document.querySelectorAll("video[data-poster]");
  if (!videos.length) return;
  const loadPoster = video => {
    if (!video.poster && video.dataset.poster) video.poster = video.dataset.poster;
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadPoster(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "300px 0px" });
    videos.forEach(video => observer.observe(video));
  } else {
    window.addEventListener("load", () => videos.forEach(loadPoster), { once: true });
  }
})();

// Translate only after a visitor chooses a language. English stays lightweight.
(() => {
  const selector = document.getElementById("ns-lang-select");
  if (!selector) return;
  const supported = new Set(["en","zh-CN","zh-TW","ja","ko","es","fr","de","it","pt","ru","ar","hi","id","vi","th","tr"]);
  const readLanguage = () => {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "en";
  };
  const stored = readLanguage();
  let activeLanguage = supported.has(stored) ? stored : "en";
  const originalText = new Map();
  let translationRunId = 0;
  selector.value = activeLanguage;

  const status = document.createElement("span");
  status.className = "language-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.style.cssText = "font-size:10px;color:#9aabb8;min-width:1px;";
  selector.parentElement.appendChild(status);

  const collectTextNodes = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest("script,style,noscript,code,pre,textarea,select,option,svg,[data-no-translate]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  };

  const saveLanguage = lang => {
    document.cookie = lang === "en"
      ? "googtrans=; Max-Age=0; path=/; SameSite=Lax"
      : "googtrans=/en/" + lang + "; path=/; SameSite=Lax";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const translateBatch = async (nodes, lang, runId) => {
    const marker = i => "ZXQNSSEP" + String(i).padStart(3, "0") + "ZXQ";
    const originals = nodes.map(node => {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      return originalText.get(node);
    });
    const source = originals.map((value, i) => value + (i < originals.length - 1 ? " " + marker(i) + " " : "")).join("");
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + encodeURIComponent(lang) + "&dt=t&q=" + encodeURIComponent(source);
    const response = await fetch(url, { mode: "cors", credentials: "omit" });
    if (!response.ok) throw new Error("Translation request failed: " + response.status);
    const data = await response.json();
    if (runId !== translationRunId) return;
    const translated = Array.isArray(data[0]) ? data[0].map(part => part[0] || "").join("") : "";
    const pieces = translated.split(/ZXQNSSEP\d{3}ZXQ/);
    if (pieces.length !== nodes.length) {
      // Some phrases cause translation engines to alter separators; retry those
      // text nodes individually rather than abandoning the rest of the page.
      for (let i = 0; i < nodes.length; i++) {
        const fallbackUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + encodeURIComponent(lang) + "&dt=t&q=" + encodeURIComponent(originals[i].trim());
        const fallbackResponse = await fetch(fallbackUrl, { mode: "cors", credentials: "omit" });
        if (!fallbackResponse.ok) throw new Error("Translation request failed: " + fallbackResponse.status);
        const fallbackData = await fallbackResponse.json();
        if (runId !== translationRunId) return;
        const fallbackText = Array.isArray(fallbackData[0]) ? fallbackData[0].map(part => part[0] || "").join("").trim() : "";
        const original = originals[i];
        const leading = (original.match(/^\s*/) || [""])[0];
        const trailing = (original.match(/\s*$/) || [""])[0];
        nodes[i].nodeValue = leading + fallbackText + trailing;
      }
      return;
    }
    nodes.forEach((node, i) => {
      const original = originals[i];
      const leading = (original.match(/^\s*/) || [""])[0];
      const trailing = (original.match(/\s*$/) || [""])[0];
      node.nodeValue = leading + pieces[i].trim() + trailing;
    });
  };

  const runTranslation = async lang => {
    const runId = ++translationRunId;
    activeLanguage = lang;
    saveLanguage(lang);
    const nodes = collectTextNodes();
    if (lang === "en") {
      nodes.forEach(node => {
        if (originalText.has(node)) node.nodeValue = originalText.get(node);
      });
      status.textContent = "";
      selector.removeAttribute("aria-busy");
      return;
    }
    status.textContent = "Translating…";
    selector.setAttribute("aria-busy", "true");
    const batches = [];
    let batch = [], chars = 0;
    for (const node of nodes) {
      const value = originalText.has(node) ? originalText.get(node) : node.nodeValue;
      if (batch.length && (batch.length >= 8 || chars + value.length > 1500)) {
        batches.push(batch);
        batch = [];
        chars = 0;
      }
      batch.push(node);
      chars += value.length + 24;
    }
    if (batch.length) batches.push(batch);
    try {
      for (let i = 0; i < batches.length; i += 4) {
        await Promise.all(batches.slice(i, i + 4).map(group => translateBatch(group, lang, runId)));
        if (runId !== translationRunId) return;
      }
      status.textContent = "";
    } catch (error) {
      console.warn("NeuroSleep translation failed; source text remains available.", error);
      status.textContent = "Translation unavailable";
    } finally {
      if (runId === translationRunId) selector.removeAttribute("aria-busy");
    }
  };

  selector.addEventListener("change", () => {
    const lang = supported.has(selector.value) ? selector.value : "en";
    saveLanguage(lang);
    runTranslation(lang);
  });

  if (activeLanguage !== "en") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => runTranslation(activeLanguage), { once: true });
    } else {
      runTranslation(activeLanguage);
    }
  }
})();
