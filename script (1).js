/* =========================================================
   MUKTKESHI — edit your numbers here
   ========================================================= */
const IMPACT = {
  raised: 4250,         // total amount raised, in US dollars
  goal: 7500,           // fundraising goal, in US dollars
  padKits: 312,         // pad kits funded
  animals: 27,          // animals treated
  updated: "September 2026"
};

const COSTS = {
  padKit: 5,            // cost of one pad kit, in US dollars
  vetCase: 40           // average cost of treating one animal, in US dollars
};

/* Guitars for a Cause — one entry per guitar.
   price: our reuse (resale) price in US dollars
   newPrice: typical price of a comparable new guitar, shown struck through (use 0 to hide)
   photo: image URL or a local file such as "images/guitar-1.jpg" (leave "" to show a drawn placeholder)
   credit: link to the photo's source page (leave "" for your own photos)
   condition: "Like new", "Good" or "Fair"
   url: the marketplace listing page
   The photos below are example photos from Wikimedia Commons. Swap in pictures of your own donated guitars. */
const GUITARS = [
  { name: "Dreadnought acoustic, spruce top", condition: "Good", price: 150, newPrice: 320, photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Morris_W-25_acoustic_guitar.jpg?width=640", credit: "https://commons.wikimedia.org/wiki/File:Morris_W-25_acoustic_guitar.jpg", url: "REPLACE_ME", note: "Full, warm sound. New strings fitted." },
  { name: "Classical nylon-string", condition: "Like new", price: 85, newPrice: 180, photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Classical_Guitar.jpg?width=640", credit: "https://commons.wikimedia.org/wiki/File:Classical_Guitar.jpg", url: "REPLACE_ME", note: "Soft strings, easy on beginners' fingers." },
  { name: "Electric, Strat-style", condition: "Good", price: 240, newPrice: 500, photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Fender_Highway_1_Stratocaster.jpg?width=640", credit: "https://commons.wikimedia.org/wiki/File:Fender_Highway_1_Stratocaster.jpg", url: "REPLACE_ME", note: "Three single-coil pickups. Gig bag included." },
  { name: "Parlor-size acoustic (kids / travel)", condition: "Fair", price: 55, newPrice: 120, photo: "https://commons.wikimedia.org/wiki/Special:FilePath/First_Act_Parlor-Sized_Acoustic_Guitar.jpg?width=640", credit: "https://commons.wikimedia.org/wiki/File:First_Act_Parlor-Sized_Acoustic_Guitar.jpg", url: "REPLACE_ME", note: "Small body, light to carry. Minor scratches." },
  { name: "Acoustic-electric cutaway, sunburst", condition: "Like new", price: 190, newPrice: 399, photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Epiphone_PR-5E_VS_Cutaway_Acoustic_Electric_Guitar_(Vintage_Sunburst).jpg?width=640", credit: "https://commons.wikimedia.org/wiki/File:Epiphone_PR-5E_VS_Cutaway_Acoustic_Electric_Guitar_(Vintage_Sunburst).jpg", url: "REPLACE_ME", note: "Built-in pickup and tuner. Plug straight in." },
  { name: "Vintage-style parlor", condition: "Fair", price: 260, newPrice: 450, photo: "https://commons.wikimedia.org/wiki/Special:FilePath/1930s_Stella_Parlor_Guitar.jpg?width=640", credit: "https://commons.wikimedia.org/wiki/File:1930s_Stella_Parlor_Guitar.jpg", url: "REPLACE_ME", note: "Old-school tone and character. Freshly set up." }
];

/* Concerts for a Cause */
const CONCERT_STATS = {
  held: 4,              // concerts held so far
  raised: 1850,         // total raised at concerts, in US dollars
  sold: 11              // guitars sold so far
};

const CONCERTS = [
  { title: "Acoustic Evening",       date: "2026-10-24", time: "6:00 PM", venue: "School auditorium",      ticketUrl: "REPLACE_ME" },
  { title: "Winter Unplugged",       date: "2026-12-19", time: "5:30 PM", venue: "Community hall",         ticketUrl: "REPLACE_ME" },
  { title: "Spring Strings",         date: "2027-03-13", time: "6:00 PM", venue: "Open-air amphitheatre",  ticketUrl: "REPLACE_ME" }
];

/* ========================================================= */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rupees = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const plain = new Intl.NumberFormat("en-US");

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  // Impact tracker
  const set = (key, text) => document.querySelectorAll(`[data-impact="${key}"]`).forEach((el) => { el.textContent = text; });
  const percent = Math.min(100, Math.round((IMPACT.raised / IMPACT.goal) * 100));

  set("goal", rupees.format(IMPACT.goal));
  set("percent", percent + "%");
  set("updated", IMPACT.updated);
  document.querySelectorAll('[data-cost="padKit"]').forEach((el) => { el.textContent = rupees.format(COSTS.padKit); });
  document.querySelectorAll('[data-cost="vetCase"]').forEach((el) => { el.textContent = rupees.format(COSTS.vetCase); });

  const bar = document.querySelector(".goal-bar");
  const fill = document.querySelector(".goal-fill");
  if (bar && fill) {
    bar.setAttribute("aria-valuenow", String(percent));
    fill.style.width = percent + "%";
  }

  const counters = [
    { key: "raised", value: IMPACT.raised, format: (n) => rupees.format(n) },
    { key: "padKits", value: IMPACT.padKits, format: (n) => plain.format(n) },
    { key: "animals", value: IMPACT.animals, format: (n) => plain.format(n) }
  ];

  // Show final values immediately; count up only as a light flourish.
  counters.forEach((c) => set(c.key, c.format(c.value)));

  const countUp = () => {
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      counters.forEach((c) => set(c.key, c.format(Math.round(c.value * eased))));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const impactSection = document.querySelector(".impact");
  if (!reduceMotion && impactSection && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { countUp(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(impactSection);
  }

  // Guitars for a Cause: gallery
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tints = ["var(--sun-soft)", "var(--berry-soft)", "var(--leaf-soft)"];
  const guitarSVG = (i) =>
    '<svg class="guitar-art" viewBox="0 0 120 160" aria-hidden="true">' +
    '<rect x="55" y="6" width="10" height="72" rx="2" fill="var(--ink)"/>' +
    '<rect x="51" y="2" width="18" height="14" rx="3" fill="var(--ink)"/>' +
    '<path d="M60 64c-16 0-24 10-22 22 1 6-10 10-10 26 0 22 16 42 32 42s32-20 32-42c0-16-11-20-10-26 2-12-6-22-22-22Z" fill="' +
    ["var(--sun)", "var(--berry)", "var(--leaf)"][i % 3] + '"/>' +
    '<circle cx="60" cy="100" r="10" fill="var(--ink)"/>' +
    '<rect x="48" y="128" width="24" height="5" rx="2" fill="var(--ink)"/></svg>';

  const grid = document.getElementById("guitar-grid");
  if (grid && Array.isArray(GUITARS) && GUITARS.length) {
    grid.innerHTML = GUITARS.map((g, i) => {
      const cond = String(g.condition || "Good");
      const condClass = "cond-" + cond.toLowerCase().replace(/[^a-z]+/g, "-");
      const media = g.photo
        ? `<img src="${esc(g.photo)}" alt="${esc(g.name)}" loading="lazy" referrerpolicy="no-referrer" data-fallback="${i}">`
        : guitarSVG(i);
      return `<li class="guitar-card">
        <div class="guitar-photo" style="background:${tints[i % 3]}">${media}</div>
        <div class="guitar-body">
          <div class="guitar-meta">
            <span class="cond ${condClass}">${esc(cond)}</span>
            <span class="guitar-price">${g.newPrice ? `<s class="price-new" aria-label="New price ${rupees.format(g.newPrice)}">${rupees.format(g.newPrice)}</s>` : ""}<span class="price-reuse">${rupees.format(g.price)}</span></span>
          </div>
          <h3 class="guitar-name">${esc(g.name)}</h3>
          ${g.note ? `<p class="guitar-note">${esc(g.note)}</p>` : ""}
          ${g.newPrice ? `<p class="guitar-save">Reuse price. You save ${rupees.format(g.newPrice - g.price)} vs new.</p>` : ""}
          ${g.credit ? `<a class="guitar-credit" href="${esc(g.credit)}" target="_blank" rel="noopener noreferrer">Photo: Wikimedia Commons</a>` : ""}
          <a class="btn btn-buy" href="${esc(g.url || "REPLACE_ME")}" target="_blank" rel="noopener noreferrer">View listing / Buy<span class="visually-hidden">: ${esc(g.name)} (opens in a new tab)</span></a>
        </div>
      </li>`;
    }).join("");
    grid.querySelectorAll("img[data-fallback]").forEach((img) => {
      const swap = () => { const i = Number(img.dataset.fallback); img.parentElement.innerHTML = guitarSVG(i); };
      if (img.complete && img.naturalWidth === 0) swap(); else img.addEventListener("error", swap, { once: true });
    });
  }

  // Concerts
  const setC = (key, text) => document.querySelectorAll(`[data-concert="${key}"]`).forEach((el) => { el.textContent = text; });
  setC("held", plain.format(CONCERT_STATS.held));
  setC("raised", rupees.format(CONCERT_STATS.raised));
  setC("sold", plain.format(CONCERT_STATS.sold));

  const list = document.getElementById("concert-list");
  if (list) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const upcoming = CONCERTS
      .map((c) => ({ ...c, d: new Date(c.date + "T00:00:00") }))
      .filter((c) => !isNaN(c.d) && c.d >= today)
      .sort((a, b) => a.d - b.d);
    list.innerHTML = upcoming.length
      ? upcoming.map((c) => `<li class="concert">
          <time class="concert-date" datetime="${esc(c.date)}">
            <span class="cd-day">${c.d.getDate()}</span>
            <span class="cd-mon">${c.d.toLocaleDateString("en-US", { month: "short" })} ${c.d.getFullYear()}</span>
          </time>
          <div class="concert-info">
            <strong>${esc(c.title)}</strong>
            <span>${esc(c.time)} · ${esc(c.venue)}</span>
          </div>
          <a class="btn btn-small" href="${esc(c.ticketUrl || "REPLACE_ME")}" target="_blank" rel="noopener noreferrer">Get tickets<span class="visually-hidden">: ${esc(c.title)} (opens in a new tab)</span></a>
        </li>`).join("")
      : '<li class="concert-none">New dates coming soon. Follow our stories for updates.</li>';
  }

  // YouTube stories: set data-youtube-id on each <figure class="story"> in index.html
  document.querySelectorAll(".story").forEach((story) => {
    const id = (story.dataset.youtubeId || "").trim();
    const title = story.dataset.title || "Muktkeshi story";
    const frame = story.querySelector(".video-frame");
    if (!frame) return;

    if (id && id !== "REPLACE_ME") {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
      iframe.title = title;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      frame.appendChild(iframe);
    } else {
      frame.innerHTML =
        '<div class="video-placeholder" role="img" aria-label="Video coming soon: ' + title.replace(/"/g, "&quot;") + '">' +
        '<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="27" fill="var(--berry)"/>' +
        '<path d="M23 18v20l16-10z" fill="var(--on-accent)"/></svg>' +
        "<strong>Video coming soon</strong><small>Add a YouTube ID in index.html</small></div>";
    }
  });

  // Copy email
  const copyBtn = document.getElementById("copy-email");
  const emailEl = document.getElementById("contact-email");
  const status = document.querySelector(".copy-status");
  if (copyBtn && emailEl) {
    copyBtn.addEventListener("click", () => {
      const text = emailEl.textContent.trim();
      const done = (msg) => { if (status) { status.textContent = msg; setTimeout(() => { status.textContent = ""; }, 2500); } };
      const fallback = () => {
        const range = document.createRange();
        range.selectNodeContents(emailEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done("Selected. Press Ctrl+C or Cmd+C to copy.");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => done("Copied"), fallback);
      } else {
        fallback();
      }
    });
  }
})();
