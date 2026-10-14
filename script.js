// NeuroSleep Technology V8.2


document.addEventListener(
"DOMContentLoaded",
function(){


console.log(
"NeuroSleep Technology V8.2 Loaded"
);





// =========================
// Smooth Navigation
// =========================


const links =
document.querySelectorAll(
".navbar a"
);



links.forEach(
link=>{


link.addEventListener(
"click",
function(e){



const href = this.getAttribute("href") || "";
if (!href.startsWith("#")) return;
const target = document.querySelector(href);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth",

block:"start"

});



}



}

);


});









// =========================
// Button Interaction
// =========================



const buttons =
document.querySelectorAll(
".btn"
);



buttons.forEach(
button=>{


button.addEventListener(
"click",
function(){



console.log(

"NeuroSleep Partnership Interest"

);



}


);



});









// =========================
// Header Scroll Effect
// =========================



const navbar =
document.querySelector(
".navbar"
);



window.addEventListener(
"scroll",
function(){



if(window.scrollY>50){



navbar.style.background =
"rgba(5,7,13,.9)";



}

else{


navbar.style.background =
"rgba(5,7,13,.65)";



}



}

);









// =========================
// Image Error Detection
// =========================



const images =
document.querySelectorAll(
"img"
);



images.forEach(
img=>{


img.addEventListener(
"error",
function(){



console.warn(

"NeuroSleep Image Loading Failed:",

this.src

);



}

);



});



});

// =========================
// Shared 17-language interface selector (preference key matches Yiang Health)
// Core navigation and hero controls are localized; extended page copy remains in English.
// =========================
const NS_LANGS = ["en","zh-CN","zh-TW","ja","ko","es","fr","de","it","pt","ru","ar","hi","id","vi","th","tr"];
const NS_LABELS = {
  "en": {
    "languageLabel": "Language",
    "navFilm": "Film",
    "navConcept": "Concept",
    "navDigital": "Digital Experience",
    "navUseCases": "Use Cases",
    "navAssets": "Project Assets",
    "navDemo": "Adaptive Engine",
    "navMarket": "Market",
    "navContact": "Contact",
    "heroBadge": "Concept-Stage Project \u00b7 Acquisition Discussion",
    "heroAssets": "View Project Assets",
    "heroContact": "Let's Talk",
    "heroTitle": "Adaptive Sleep<br><span>System Concept</span>"
  },
  "zh-CN": {
    "languageLabel": "\u8bed\u8a00",
    "navFilm": "\u9879\u76ee\u5f71\u7247",
    "navConcept": "\u4ea7\u54c1\u6784\u60f3",
    "navDigital": "\u6570\u5b57\u4f53\u9a8c",
    "navUseCases": "\u5e94\u7528\u573a\u666f",
    "navAssets": "\u9879\u76ee\u8d44\u6599",
    "navDemo": "\u81ea\u9002\u5e94\u5f15\u64ce\u6f14\u793a",
    "navMarket": "\u5e02\u573a",
    "navContact": "\u8054\u7cfb",
    "heroBadge": "\u6982\u5ff5\u9636\u6bb5\u9879\u76ee \u00b7 \u6536\u8d2d\u6d3d\u8c08",
    "heroAssets": "\u67e5\u770b\u9879\u76ee\u8d44\u6599",
    "heroContact": "\u8054\u7cfb\u6d3d\u8c08",
    "heroTitle": "\u81ea\u9002\u5e94\u7761\u7720<br><span>\u7cfb\u7edf\u6784\u60f3</span>"
  },
  "zh-TW": {
    "languageLabel": "\u8a9e\u8a00",
    "navFilm": "\u5c08\u6848\u5f71\u7247",
    "navConcept": "\u7522\u54c1\u69cb\u60f3",
    "navDigital": "\u6578\u4f4d\u9ad4\u9a57",
    "navUseCases": "\u61c9\u7528\u5834\u666f",
    "navAssets": "\u5c08\u6848\u8cc7\u6599",
    "navDemo": "\u81ea\u9069\u61c9\u5f15\u64ce\u6f14\u793a",
    "navMarket": "\u5e02\u5834",
    "navContact": "\u806f\u7d61",
    "heroBadge": "\u6982\u5ff5\u968e\u6bb5\u5c08\u6848 \u00b7 \u6536\u8cfc\u6d3d\u8ac7",
    "heroAssets": "\u67e5\u770b\u5c08\u6848\u8cc7\u6599",
    "heroContact": "\u806f\u7d61\u6d3d\u8ac7",
    "heroTitle": "\u81ea\u9069\u61c9\u7761\u7720<br><span>\u7cfb\u7d71\u69cb\u60f3</span>"
  },
  "ja": {
    "languageLabel": "\u8a00\u8a9e",
    "navFilm": "\u7d39\u4ecb\u6620\u50cf",
    "navConcept": "\u30b3\u30f3\u30bb\u30d7\u30c8",
    "navDigital": "\u30c7\u30b8\u30bf\u30eb\u4f53\u9a13",
    "navUseCases": "\u6d3b\u7528\u30b7\u30fc\u30f3",
    "navAssets": "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u8cc7\u6599",
    "navDemo": "\u9069\u5fdc\u30a8\u30f3\u30b8\u30f3",
    "navMarket": "\u5e02\u5834",
    "navContact": "\u304a\u554f\u3044\u5408\u308f\u305b",
    "heroBadge": "\u69cb\u60f3\u6bb5\u968e\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8 \u00b7 \u8cb7\u53ce\u5354\u8b70",
    "heroAssets": "\u8cc7\u6599\u3092\u898b\u308b",
    "heroContact": "\u304a\u554f\u3044\u5408\u308f\u305b",
    "heroTitle": "\u9069\u5fdc\u578b\u7761\u7720<br><span>\u30b7\u30b9\u30c6\u30e0\u69cb\u60f3</span>"
  },
  "ko": {
    "languageLabel": "\uc5b8\uc5b4",
    "navFilm": "\uc18c\uac1c \uc601\uc0c1",
    "navConcept": "\ucf58\uc149\ud2b8",
    "navDigital": "\ub514\uc9c0\ud138 \uacbd\ud5d8",
    "navUseCases": "\ud65c\uc6a9 \uc0ac\ub840",
    "navAssets": "\ud504\ub85c\uc81d\ud2b8 \uc790\ub8cc",
    "navDemo": "\uc801\uc751\ud615 \uc5d4\uc9c4",
    "navMarket": "\uc2dc\uc7a5",
    "navContact": "\ubb38\uc758",
    "heroBadge": "\ucf58\uc149\ud2b8 \ub2e8\uacc4 \ud504\ub85c\uc81d\ud2b8 \u00b7 \uc778\uc218 \ub17c\uc758",
    "heroAssets": "\uc790\ub8cc \ubcf4\uae30",
    "heroContact": "\ubb38\uc758\ud558\uae30",
    "heroTitle": "\uc801\uc751\ud615 \uc218\uba74<br><span>\uc2dc\uc2a4\ud15c \ucf58\uc149\ud2b8</span>"
  },
  "es": {
    "languageLabel": "Idioma",
    "navFilm": "V\u00eddeo",
    "navConcept": "Concepto",
    "navDigital": "Experiencia digital",
    "navUseCases": "Usos",
    "navAssets": "Materiales",
    "navDemo": "Motor adaptativo",
    "navMarket": "Mercado",
    "navContact": "Contacto",
    "heroBadge": "Proyecto conceptual \u00b7 Conversaciones de adquisici\u00f3n",
    "heroAssets": "Ver materiales",
    "heroContact": "Contactar",
    "heroTitle": "Sue\u00f1o adaptable<br><span>Concepto de sistema</span>"
  },
  "fr": {
    "languageLabel": "Langue",
    "navFilm": "Film",
    "navConcept": "Concept",
    "navDigital": "Exp\u00e9rience num\u00e9rique",
    "navUseCases": "Applications",
    "navAssets": "Documents",
    "navDemo": "Moteur adaptatif",
    "navMarket": "March\u00e9",
    "navContact": "Contact",
    "heroBadge": "Projet au stade conceptuel \u00b7 Discussion de cession",
    "heroAssets": "Voir les documents",
    "heroContact": "Nous contacter",
    "heroTitle": "Sommeil adaptatif<br><span>Concept de syst\u00e8me</span>"
  },
  "de": {
    "languageLabel": "Sprache",
    "navFilm": "Film",
    "navConcept": "Konzept",
    "navDigital": "Digitales Erlebnis",
    "navUseCases": "Anwendungen",
    "navAssets": "Projektunterlagen",
    "navDemo": "Adaptiver Motor",
    "navMarket": "Markt",
    "navContact": "Kontakt",
    "heroBadge": "Konzeptphase \u00b7 Gespr\u00e4che \u00fcber Projekt\u00fcbernahme",
    "heroAssets": "Unterlagen ansehen",
    "heroContact": "Kontakt aufnehmen",
    "heroTitle": "Adaptiver Schlaf<br><span>Systemkonzept</span>"
  },
  "it": {
    "languageLabel": "Lingua",
    "navFilm": "Filmato",
    "navConcept": "Concetto",
    "navDigital": "Esperienza digitale",
    "navUseCases": "Applicazioni",
    "navAssets": "Materiali",
    "navDemo": "Motore adattivo",
    "navMarket": "Mercato",
    "navContact": "Contatti",
    "heroBadge": "Progetto concettuale \u00b7 Discussione per acquisizione",
    "heroAssets": "Vedi materiali",
    "heroContact": "Contattaci",
    "heroTitle": "Sonno adattivo<br><span>Concetto di sistema</span>"
  },
  "pt": {
    "languageLabel": "Idioma",
    "navFilm": "Filme",
    "navConcept": "Conceito",
    "navDigital": "Experi\u00eancia digital",
    "navUseCases": "Aplica\u00e7\u00f5es",
    "navAssets": "Materiais",
    "navDemo": "Motor adaptativo",
    "navMarket": "Mercado",
    "navContact": "Contato",
    "heroBadge": "Projeto conceitual \u00b7 Conversas sobre aquisi\u00e7\u00e3o",
    "heroAssets": "Ver materiais",
    "heroContact": "Fale conosco",
    "heroTitle": "Sono adaptativo<br><span>Conceito de sistema</span>"
  },
  "ru": {
    "languageLabel": "\u042f\u0437\u044b\u043a",
    "navFilm": "\u0412\u0438\u0434\u0435\u043e",
    "navConcept": "\u041a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u044f",
    "navDigital": "\u0426\u0438\u0444\u0440\u043e\u0432\u043e\u0439 \u043e\u043f\u044b\u0442",
    "navUseCases": "\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0438",
    "navAssets": "\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b \u043f\u0440\u043e\u0435\u043a\u0442\u0430",
    "navDemo": "\u0410\u0434\u0430\u043f\u0442\u0438\u0432\u043d\u044b\u0439 \u0434\u0432\u0438\u0436\u043e\u043a",
    "navMarket": "\u0420\u044b\u043d\u043e\u043a",
    "navContact": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
    "heroBadge": "\u041f\u0440\u043e\u0435\u043a\u0442 \u043d\u0430 \u0441\u0442\u0430\u0434\u0438\u0438 \u043a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u0438 \u00b7 \u041e\u0431\u0441\u0443\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u0440\u0438\u043e\u0431\u0440\u0435\u0442\u0435\u043d\u0438\u044f",
    "heroAssets": "\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b \u043f\u0440\u043e\u0435\u043a\u0442\u0430",
    "heroContact": "\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f",
    "heroTitle": "\u0410\u0434\u0430\u043f\u0442\u0438\u0432\u043d\u044b\u0439 \u0441\u043e\u043d<br><span>\u041a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u044f \u0441\u0438\u0441\u0442\u0435\u043c\u044b</span>"
  },
  "ar": {
    "languageLabel": "\u0627\u0644\u0644\u063a\u0629",
    "navFilm": "\u0627\u0644\u0641\u064a\u0644\u0645",
    "navConcept": "\u0627\u0644\u0641\u0643\u0631\u0629",
    "navDigital": "\u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629",
    "navUseCases": "\u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0627\u062a",
    "navAssets": "\u0645\u0648\u0627\u062f \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    "navDemo": "\u0627\u0644\u0645\u062d\u0631\u0643 \u0627\u0644\u062a\u0643\u064a\u0641\u064a",
    "navMarket": "\u0627\u0644\u0633\u0648\u0642",
    "navContact": "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
    "heroBadge": "\u0645\u0634\u0631\u0648\u0639 \u0641\u064a \u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u062a\u0635\u0648\u0631 \u00b7 \u0645\u0646\u0627\u0642\u0634\u0629 \u0627\u0644\u0627\u0633\u062a\u062d\u0648\u0627\u0630",
    "heroAssets": "\u0639\u0631\u0636 \u0645\u0648\u0627\u062f \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    "heroContact": "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
    "heroTitle": "\u0646\u0648\u0645 \u0645\u062a\u0643\u064a\u0641<br><span>\u062a\u0635\u0648\u0631 \u0627\u0644\u0646\u0638\u0627\u0645</span>"
  },
  "hi": {
    "languageLabel": "\u092d\u093e\u0937\u093e",
    "navFilm": "\u092a\u0930\u093f\u091a\u092f \u092b\u093c\u093f\u0932\u094d\u092e",
    "navConcept": "\u0905\u0935\u0927\u093e\u0930\u0923\u093e",
    "navDigital": "\u0921\u093f\u091c\u093f\u091f\u0932 \u0905\u0928\u0941\u092d\u0935",
    "navUseCases": "\u0909\u092a\u092f\u094b\u0917",
    "navAssets": "\u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e \u0938\u093e\u092e\u0917\u094d\u0930\u0940",
    "navDemo": "\u0905\u0928\u0941\u0915\u0942\u0932\u0940 \u0907\u0902\u091c\u0928",
    "navMarket": "\u092c\u093e\u091c\u093c\u093e\u0930",
    "navContact": "\u0938\u0902\u092a\u0930\u094d\u0915",
    "heroBadge": "\u0905\u0935\u0927\u093e\u0930\u0923\u093e-\u091a\u0930\u0923 \u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e \u00b7 \u0905\u0927\u093f\u0917\u094d\u0930\u0939\u0923 \u091a\u0930\u094d\u091a\u093e",
    "heroAssets": "\u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e \u0938\u093e\u092e\u0917\u094d\u0930\u0940 \u0926\u0947\u0916\u0947\u0902",
    "heroContact": "\u0938\u0902\u092a\u0930\u094d\u0915 \u0915\u0930\u0947\u0902",
    "heroTitle": "\u0905\u0928\u0941\u0915\u0942\u0932\u0940 \u0928\u0940\u0902\u0926<br><span>\u092a\u094d\u0930\u0923\u093e\u0932\u0940 \u0915\u0940 \u0905\u0935\u0927\u093e\u0930\u0923\u093e</span>"
  },
  "id": {
    "languageLabel": "Bahasa",
    "navFilm": "Film",
    "navConcept": "Konsep",
    "navDigital": "Pengalaman digital",
    "navUseCases": "Penggunaan",
    "navAssets": "Materi proyek",
    "navDemo": "Mesin adaptif",
    "navMarket": "Pasar",
    "navContact": "Kontak",
    "heroBadge": "Proyek tahap konsep \u00b7 Diskusi akuisisi",
    "heroAssets": "Lihat materi",
    "heroContact": "Hubungi kami",
    "heroTitle": "Tidur adaptif<br><span>Konsep sistem</span>"
  },
  "vi": {
    "languageLabel": "Ng\u00f4n ng\u1eef",
    "navFilm": "Phim gi\u1edbi thi\u1ec7u",
    "navConcept": "\u00dd t\u01b0\u1edfng",
    "navDigital": "Tr\u1ea3i nghi\u1ec7m s\u1ed1",
    "navUseCases": "\u1ee8ng d\u1ee5ng",
    "navAssets": "T\u00e0i li\u1ec7u d\u1ef1 \u00e1n",
    "navDemo": "B\u1ed9 m\u00e1y th\u00edch \u1ee9ng",
    "navMarket": "Th\u1ecb tr\u01b0\u1eddng",
    "navContact": "Li\u00ean h\u1ec7",
    "heroBadge": "D\u1ef1 \u00e1n giai \u0111o\u1ea1n \u00fd t\u01b0\u1edfng \u00b7 Trao \u0111\u1ed5i chuy\u1ec3n nh\u01b0\u1ee3ng",
    "heroAssets": "Xem t\u00e0i li\u1ec7u",
    "heroContact": "Li\u00ean h\u1ec7",
    "heroTitle": "Gi\u1ea5c ng\u1ee7 th\u00edch \u1ee9ng<br><span>\u00dd t\u01b0\u1edfng h\u1ec7 th\u1ed1ng</span>"
  },
  "th": {
    "languageLabel": "\u0e20\u0e32\u0e29\u0e32",
    "navFilm": "\u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d\u0e41\u0e19\u0e30\u0e19\u0e33",
    "navConcept": "\u0e41\u0e19\u0e27\u0e04\u0e34\u0e14",
    "navDigital": "\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c\u0e14\u0e34\u0e08\u0e34\u0e17\u0e31\u0e25",
    "navUseCases": "\u0e01\u0e32\u0e23\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19",
    "navAssets": "\u0e40\u0e2d\u0e01\u0e2a\u0e32\u0e23\u0e42\u0e04\u0e23\u0e07\u0e01\u0e32\u0e23",
    "navDemo": "\u0e23\u0e30\u0e1a\u0e1a\u0e1b\u0e23\u0e31\u0e1a\u0e15\u0e31\u0e27",
    "navMarket": "\u0e15\u0e25\u0e32\u0e14",
    "navContact": "\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d",
    "heroBadge": "\u0e42\u0e04\u0e23\u0e07\u0e01\u0e32\u0e23\u0e23\u0e30\u0e22\u0e30\u0e40\u0e23\u0e34\u0e48\u0e21\u0e41\u0e19\u0e27\u0e04\u0e34\u0e14 \u00b7 \u0e2b\u0e32\u0e23\u0e37\u0e2d\u0e01\u0e32\u0e23\u0e0b\u0e37\u0e49\u0e2d\u0e01\u0e34\u0e08\u0e01\u0e32\u0e23",
    "heroAssets": "\u0e14\u0e39\u0e40\u0e2d\u0e01\u0e2a\u0e32\u0e23\u0e42\u0e04\u0e23\u0e07\u0e01\u0e32\u0e23",
    "heroContact": "\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d\u0e40\u0e23\u0e32",
    "heroTitle": "\u0e01\u0e32\u0e23\u0e19\u0e2d\u0e19\u0e2b\u0e25\u0e31\u0e1a\u0e41\u0e1a\u0e1a\u0e1b\u0e23\u0e31\u0e1a\u0e15\u0e31\u0e27<br><span>\u0e41\u0e19\u0e27\u0e04\u0e34\u0e14\u0e23\u0e30\u0e1a\u0e1a</span>"
  },
  "tr": {
    "languageLabel": "Dil",
    "navFilm": "Tan\u0131t\u0131m filmi",
    "navConcept": "Konsept",
    "navDigital": "Dijital deneyim",
    "navUseCases": "Kullan\u0131m alanlar\u0131",
    "navAssets": "Proje materyalleri",
    "navDemo": "Uyarlanabilir motor",
    "navMarket": "Pazar",
    "navContact": "\u0130leti\u015fim",
    "heroBadge": "Konsept a\u015famas\u0131ndaki proje \u00b7 Devir g\u00f6r\u00fc\u015fmeleri",
    "heroAssets": "Materyalleri g\u00f6r\u00fcnt\u00fcle",
    "heroContact": "\u0130leti\u015fime ge\u00e7",
    "heroTitle": "Uyarlanabilir Uyku<br><span>Sistem Konsepti</span>"
  }
};
function nsInitLanguage(){
  const sel=document.getElementById("ns-lang-select"); if(!sel)return;
  const stored=localStorage.getItem("yiang_health_lang");
  const browser=(navigator.language||"en").toLowerCase();
  let detected=stored&&NS_LANGS.includes(stored)?stored:(browser.startsWith("zh")?(browser.includes("tw")||browser.includes("hk")?"zh-TW":"zh-CN"):browser.split("-")[0]);
  if(!NS_LANGS.includes(detected))detected="en";
  function apply(lang){
    const d=NS_LABELS[lang]||NS_LABELS.en;
    document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
    document.querySelectorAll("[data-ns-key]").forEach(el=>{const k=el.getAttribute("data-ns-key");if(d[k])el.textContent=d[k];});
    const title=document.getElementById("ns-hero-title"); if(title&&d.heroTitle)title.innerHTML=d.heroTitle;
    sel.value=lang; localStorage.setItem("yiang_health_lang",lang);
  }
  sel.addEventListener("change",()=>apply(sel.value));
  apply(detected);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",nsInitLanguage);else nsInitLanguage();
