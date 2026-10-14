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
    // Remove legacy Google Translate cookies at both the site root and Pages subpath.
    document.cookie = "googtrans=; Max-Age=0; path=/; SameSite=Lax";
    document.cookie = "googtrans=; Max-Age=0; path=/NeuroSleep-Site-with-Film/; SameSite=Lax";
    if (lang !== "en") {
      document.cookie = "googtrans=/en/" + lang + "; path=/; SameSite=Lax";
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  let googleUnavailable = false;
  const fetchWithTimeout = async (url, options = {}, timeoutMs = 4500) => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      window.clearTimeout(timer);
    }
  };
  const applyTranslatedText = (node, original, translated) => {
    const leading = (original.match(/^\s*/) || [""])[0];
    const trailing = (original.match(/\s*$/) || [""])[0];
    node.nodeValue = leading + translated.trim() + trailing;
  };
  const decodeHtml = value => {
    const decoder = document.createElement("textarea");
    decoder.innerHTML = value;
    return decoder.value;
  };

  const translateWithMyMemory = async (nodes, originals, lang, runId) => {
    // Public fallback for networks where Google's translation endpoint is blocked.
    // Keep each request small and preserve text-node boundaries.
    const groups = [];
    let group = [], chars = 0;
    for (let i = 0; i < nodes.length; i++) {
      const value = originals[i].trim();
      if (group.length && (group.length >= 4 || chars + value.length > 420)) {
        groups.push(group);
        group = [];
        chars = 0;
      }
      group.push(i);
      chars += value.length + 20;
    }
    if (group.length) groups.push(group);

    for (const indices of groups) {
      if (runId !== translationRunId) return;
      const marker = i => "ZXQNSSEP" + String(i).padStart(3, "0") + "ZXQ";
      const source = indices.map((nodeIndex, i) => originals[nodeIndex].trim() + (i < indices.length - 1 ? " " + marker(i) + " " : "")).join("");
      const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(source) + "&langpair=" + encodeURIComponent("en|" + lang);
      const response = await fetchWithTimeout(url, { mode: "cors", credentials: "omit" }, 7000);
      if (!response.ok) throw new Error("Fallback translation request failed: " + response.status);
      const data = await response.json();
      if (data.responseStatus !== 200 || !data.responseData || !data.responseData.translatedText) {
        throw new Error("Both translation providers are unavailable for " + lang);
      }
      if (runId !== translationRunId) return;
      const translated = decodeHtml(data.responseData.translatedText);
      const pieces = translated.split(/ZXQNSSEP\d{3}ZXQ/);
      if (pieces.length === indices.length) {
        indices.forEach((nodeIndex, i) => applyTranslatedText(nodes[nodeIndex], originals[nodeIndex], pieces[i]));
      } else {
        // Rare marker changes: translate each short text node separately.
        for (const nodeIndex of indices) {
          const singleUrl = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(originals[nodeIndex].trim()) + "&langpair=" + encodeURIComponent("en|" + lang);
          const singleResponse = await fetchWithTimeout(singleUrl, { mode: "cors", credentials: "omit" }, 7000);
          if (!singleResponse.ok) throw new Error("Fallback translation request failed: " + singleResponse.status);
          const singleData = await singleResponse.json();
          if (runId !== translationRunId) return;
          if (singleData.responseStatus !== 200 || !singleData.responseData) throw new Error("Fallback translation unavailable");
          applyTranslatedText(nodes[nodeIndex], originals[nodeIndex], decodeHtml(singleData.responseData.translatedText || ""));
        }
      }
    }
  };

  const translateBatch = async (nodes, lang, runId) => {
    const marker = i => "ZXQNSSEP" + String(i).padStart(3, "0") + "ZXQ";
    const originals = nodes.map(node => {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      return originalText.get(node);
    });
    if (googleUnavailable) return translateWithMyMemory(nodes, originals, lang, runId);
    const source = originals.map((value, i) => value + (i < originals.length - 1 ? " " + marker(i) + " " : "")).join("");
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + encodeURIComponent(lang) + "&dt=t&q=" + encodeURIComponent(source);
    try {
      const response = await fetchWithTimeout(url, { mode: "cors", credentials: "omit" }, 4500);
      if (!response.ok) throw new Error("Google translation request failed: " + response.status);
      const data = await response.json();
      if (runId !== translationRunId) return;
      const translated = Array.isArray(data[0]) ? data[0].map(part => part[0] || "").join("") : "";
      const pieces = translated.split(/ZXQNSSEP\d{3}ZXQ/);
      if (pieces.length !== nodes.length) {
        return translateWithMyMemory(nodes, originals, lang, runId);
      }
      nodes.forEach((node, i) => applyTranslatedText(node, originals[i], pieces[i]));
    } catch (error) {
      if (runId !== translationRunId) return;
      googleUnavailable = true;
      return translateWithMyMemory(nodes, originals, lang, runId);
    }
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
      for (let i = 0; i < batches.length; i += 2) {
        await Promise.all(batches.slice(i, i + 2).map(group => translateBatch(group, lang, runId)));
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
