const crops = [
  {
    name: "Vanilla",
    title: "Aromatic vanilla for cooking and flavor.",
    copy:
      "Slow-grown vanilla is selected for pod quality, fragrance depth, and careful curing so the finished crop carries stronger aroma.",
    climate: "Fragrant pods",
    signal: "Fragrance depth",
    advantage: "Deep aroma for cooking",
    harvest: "Slow-cured pods",
    grade: "Clean aroma",
    technique: "Trellis vines, hand-pollinate flowers, and cure pods slowly for deeper aroma.",
    image: "/images/crops/cartoon/vanilla.svg",
    plate: "#d8c8ae",
    imageScale: "1.14",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.34))",
    colors: ["#1b120f", "#9a7150", "#d8c8ae", "rgba(154, 113, 80, 0.24)"],
  },
  {
    name: "Ginger",
    title: "Fresh ginger with clean snap and aroma.",
    copy:
      "Ginger is selected for firm rhizomes, bright heat, clean texture, and a fresh aromatic snap.",
    climate: "Firm rhizomes",
    signal: "Fresh snap",
    advantage: "Fresh snap and usable size",
    harvest: "7-month crop",
    grade: "Clean, firm roots",
    technique: "Harvest at maturity, clean carefully, and sort for firm, usable rhizomes.",
    image: "/images/crops/cartoon/ginger.svg",
    plate: "#cdb98f",
    imageScale: "1.22",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.34))",
    colors: ["#121b15", "#b59d68", "#dcc99d", "rgba(181, 157, 104, 0.22)"],
  },
  {
    name: "Turmeric",
    title: "Color-rich turmeric with earthy strength.",
    copy:
      "Turmeric is selected for deep color, clean rhizome shape, and earthy aroma.",
    climate: "Color-rich rhizomes",
    signal: "Deep color",
    advantage: "Strong color and aroma",
    harvest: "8-month crop",
    grade: "High-color flesh",
    technique: "Harvest after full maturity, clean gently, and sort for color, firmness, and shape.",
    image: "/images/crops/cartoon/turmeric.svg",
    plate: "#c9903e",
    imageScale: "1.22",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.34))",
    colors: ["#211208", "#bd7e24", "#d7a24c", "rgba(189, 126, 36, 0.26)"],
  },
  {
    name: "Black Pepper",
    title: "Black pepper grown for dense clusters.",
    copy:
      "Pepper is selected for dense clusters, bold aroma, and clean spice character.",
    climate: "Dense clusters",
    signal: "Cluster density",
    advantage: "Consistent spice quality",
    harvest: "Mature spikes",
    grade: "Bold spice aroma",
    technique: "Pick spikes at the right maturity and sort for cluster density and clean appearance.",
    image: "/images/crops/cartoon/black-pepper.svg",
    plate: "#c5c7bc",
    imageScale: "1.14",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.34))",
    colors: ["#070a08", "#344839", "#b8c0b8", "rgba(52, 72, 57, 0.3)"],
  },
  {
    name: "Bell Pepper",
    title: "Bell peppers with gloss, color, and weight.",
    copy:
      "Bell peppers are selected for uniform shape, firm walls, color, gloss, and weight.",
    climate: "Firm glossy fruit",
    signal: "Gloss and weight",
    advantage: "Uniform fruit quality",
    harvest: "90-day crop",
    grade: "Firm, glossy fruit",
    technique: "Harvest by color stage and sort for gloss, firmness, shape, and usable size.",
    image: "/images/crops/cartoon/bell-pepper.svg",
    plate: "#d2c6b8",
    imageScale: "1.16",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.34))",
    colors: ["#15130d", "#bd4935", "#d7a88c", "rgba(189, 73, 53, 0.26)"],
  },
  {
    name: "Lettuce",
    title: "Tender lettuce with clean crunch.",
    copy:
      "Lettuce is selected for crisp heads or leaves, clean texture, and tender bite.",
    climate: "Crisp clean leaves",
    signal: "Clean crunch",
    advantage: "Clean crunch",
    harvest: "Early cut",
    grade: "Crisp usable leaves",
    technique: "Cut at the right size, cool quickly, and sort for clean leaves and texture.",
    image: "/images/crops/cartoon/lettuce.svg",
    plate: "#c8d0bd",
    imageScale: "1.18",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.32))",
    colors: ["#08150f", "#6fb878", "#cddfc0", "rgba(111, 184, 120, 0.22)"],
  },
  {
    name: "Kale",
    title: "Structured kale with reliable leaf quality.",
    copy:
      "Kale is selected for sturdy leaves, consistent texture, and clean bunches.",
    climate: "Structured leaves",
    signal: "Leaf structure",
    advantage: "Consistent texture",
    harvest: "Outer-leaf picking",
    grade: "Clean bunches",
    technique: "Harvest outer leaves first and bunch for size, texture, and clean presentation.",
    image: "/images/crops/cartoon/kale.svg",
    plate: "#bdc9b4",
    imageScale: "1.17",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.32))",
    colors: ["#07110d", "#3b6c48", "#b6d0a9", "rgba(59, 108, 72, 0.26)"],
  },
  {
    name: "Spinach",
    title: "Spinach grown for tenderness and clean finish.",
    copy:
      "Spinach is selected for tender leaves, even size, and clean handling.",
    climate: "Tender leaves",
    signal: "Tender finish",
    advantage: "Cleaner cycles",
    harvest: "Young leaf cut",
    grade: "Tender baby leaves",
    technique: "Harvest young leaves and sort for tenderness, clean finish, and even size.",
    image: "/images/crops/cartoon/spinach.svg",
    plate: "#becbb8",
    imageScale: "1.17",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.32))",
    colors: ["#07120f", "#448f5e", "#bdd8b4", "rgba(68, 143, 94, 0.24)"],
  },
  {
    name: "Cilantro",
    title: "Cilantro with bright aroma and freshness.",
    copy:
      "Cilantro is selected for bright aroma, tender stems, and clean bunches.",
    climate: "Bright bunches",
    signal: "Aromatic lift",
    advantage: "Freshness retention",
    harvest: "Pre-bolt cut",
    grade: "Aromatic bunches",
    technique: "Cut before bolting and bunch for aroma, tenderness, and clean presentation.",
    image: "/images/crops/cartoon/cilantro.svg",
    plate: "#c0cfb8",
    imageScale: "1.16",
    imageFilter: "drop-shadow(0 20px 18px rgba(0, 0, 0, 0.32))",
    colors: ["#071410", "#579d70", "#c4ddb9", "rgba(87, 157, 112, 0.24)"],
  },
];

const journey = [
  ["Planting", "Clean starts are selected for vigor, even growth, and strong crop potential."],
  ["Growth", "Each crop is guided toward useful qualities: color, aroma, texture, and size."],
  ["Quality Checks", "Crop lots are watched for freshness, uniformity, appearance, and harvest readiness."],
  ["Crop Care", "Hands-on care keeps leaves, roots, pods, and fruits cleaner and more consistent."],
  ["Harvest", "Picking windows are chosen around texture, aroma, color, and intended use."],
  ["Sorting", "Produce is sorted for consistency, appearance, and everyday usability."],
  ["Delivery", "Produce leaves with freshness, appearance, and practical use kept front of mind."],
];

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const cropStage = document.querySelector("[data-crop-stage]");
const cropTabs = document.querySelector("[data-crop-tabs]");
const journeyTrack = document.querySelector("[data-journey-track]");

function setHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setNav(open) {
  navToggle?.setAttribute("aria-expanded", String(open));
  navMenu?.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
}

function setCrop(index) {
  const crop = crops[index];
  if (!cropStage || !crop) return;

  cropStage.style.setProperty("--crop-a", crop.colors[0]);
  cropStage.style.setProperty("--crop-b", crop.colors[1]);
  cropStage.style.setProperty("--crop-c", crop.colors[2]);
  cropStage.style.setProperty("--crop-glow", crop.colors[3]);
  cropStage.style.setProperty("--crop-plate", crop.plate);
  cropStage.style.setProperty("--crop-image-scale", crop.imageScale);
  cropStage.style.setProperty("--crop-image-filter", crop.imageFilter);
  cropStage.querySelector("[data-crop-kicker]").textContent = crop.name;
  cropStage.querySelector("[data-crop-title]").textContent = crop.title;
  cropStage.querySelector("[data-crop-copy]").textContent = crop.copy;
  cropStage.querySelector("[data-crop-climate]").textContent = crop.climate;
  cropStage.querySelector("[data-crop-signal]").textContent = crop.signal;
  cropStage.querySelector("[data-crop-advantage]").textContent = crop.advantage;
  cropStage.querySelector("[data-crop-harvest]").textContent = crop.harvest;
  cropStage.querySelector("[data-crop-grade]").textContent = crop.grade;
  cropStage.querySelector("[data-crop-technique]").textContent = crop.technique;
  const cropImage = cropStage.querySelector("[data-crop-image]");
  cropImage?.setAttribute("src", crop.image);

  cropTabs?.querySelectorAll(".crop-tab").forEach((tab, tabIndex) => {
    tab.setAttribute("aria-selected", String(tabIndex === index));
    tab.tabIndex = tabIndex === index ? 0 : -1;
  });
}

function buildCrops() {
  if (!cropTabs) return;

  crops.forEach((crop, index) => {
    const button = document.createElement("button");
    button.className = "crop-tab";
    button.type = "button";
    button.role = "tab";
    button.textContent = crop.name;
    button.setAttribute("aria-selected", String(index === 0));
    button.tabIndex = index === 0 ? 0 : -1;
    button.addEventListener("click", () => setCrop(index));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const current = crops.findIndex((item) => item.name === cropStage?.querySelector("[data-crop-kicker]")?.textContent);
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? crops.length - 1
            : event.key === "ArrowRight"
              ? (current + 1) % crops.length
              : (current - 1 + crops.length) % crops.length;
      setCrop(next);
      cropTabs.querySelectorAll(".crop-tab")[next]?.focus();
    });
    cropTabs.append(button);
  });

  setCrop(0);
}

function buildJourney() {
  if (!journeyTrack) return;

  journey.forEach(([title, copy], index) => {
    const card = document.createElement("article");
    card.className = "journey-card reveal";
    card.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${copy}</p>`;
    journeyTrack.append(card);
  });
}

function bindFooterForm() {
  document.querySelector(".footer__form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    if (button) {
      button.textContent = "Joined";
      window.setTimeout(() => {
        button.textContent = "Join";
      }, 2200);
    }
  });
}

buildCrops();
buildJourney();
bindFooterForm();
setHeaderState();

window.addEventListener("scroll", setHeaderState, { passive: true });
navToggle?.addEventListener("click", () => setNav(navToggle.getAttribute("aria-expanded") !== "true"));
navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) setNav(false);
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNav(false);
});
