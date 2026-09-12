const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
reveals.forEach(el => observer.observe(el));

const titles = document.querySelectorAll(".glitch-title");
setInterval(() => {
  const title = titles[Math.floor(Math.random() * titles.length)];
  title.classList.add("glitching");
  setTimeout(() => title.classList.remove("glitching"), 150);
}, 2800);

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
}, {passive:true});

function soon(e) {
  e.preventDefault();
  alert("The game link will be added soon. Thanks for checking out Glitched AR!");
}

document.querySelectorAll(".guide-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".guide-tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".guide-panel").forEach(p=>p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});


/* === THE CHRONICLE: edit this object for future announcements === */
const CHRONICLE_LATEST = [
  {
    id: "001",
    protocol: "SCOREBOARD DESYNC",
    title: "STAR DATA — TEMPORARILY UNAVAILABLE",
    body: "Stars are currently unavailable in the web version of Coin Master. The scoreboard system is being worked on, so star data may not appear correctly in-game.",
    status: ["STATUS: INVESTIGATING", "SYSTEM: SCOREBOARD", "STARS: UNAVAILABLE"]
  },
  {
    id: "002",
    protocol: "GEARSHIFT",
    title: "SYSTEM STATUS — TEMPORARILY OFFLINE",
    body: "Development on BETA 0.3 is currently on hold while the development gear undergoes an upgrade. The signal isn't lost. The system is simply waiting for better hardware. Development will resume once the new setup is operational.",
    status: ["STATUS: STANDBY", "SIGNAL: INTERRUPTED", "RESUMPTION: PENDING GEAR UPGRADE"]
  }
];
(function initChronicle(){
  const navs = document.querySelectorAll(".nav nav");
  navs.forEach(nav => {
    if (!nav.querySelector('[href*="#chronicle"]')) {
      const link = document.createElement("a");
      link.href = location.pathname.endsWith("index.html") || location.pathname === "/" ? "#chronicle" : "index.html#chronicle";
      link.textContent = "THE CHRONICLE";
      nav.insertBefore(link, nav.firstChild);
    }
  });

  const isHome = location.pathname.endsWith("index.html") || location.pathname === "/" || location.pathname.endsWith("/");

  if (isHome && !document.querySelector(".chronicle-trigger")) {
    const trigger = document.createElement("a");
    trigger.className = "btn ghost chronicle-trigger";
    trigger.href = "#chronicle";
    trigger.textContent = "OPEN THE CHRONICLE →";
    const actions = document.querySelector(".hero .actions");
    if (actions) actions.appendChild(trigger);
  }

  const overlay = document.createElement("div");
  overlay.id = "chronicle-overlay";
  overlay.innerHTML = `
    <div id="chronicle-modal" role="dialog" aria-modal="true" aria-labelledby="chronicle-title">
      <div class="chronicle-modal-bar">
        <span class="chronicle-live">● LIVE TRANSMISSION</span>
        <span>GLITCHED AR // CHRONICLE</span>
        <button class="chronicle-close" aria-label="Close Chronicle">×</button>
      </div>
      <div class="chronicle-modal-body">
        <p class="eyebrow">LATEST TRANSMISSION</p>
        <div id="chronicle-latest"></div>
        <div class="chronicle-modal-actions">
          <button class="primary chronicle-all">VIEW ALL CHRONICLES →</button>
          <button class="chronicle-close-secondary">CLOSE</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const latest = CHRONICLE_LATEST[CHRONICLE_LATEST.length - 1];
  const latestEl = overlay.querySelector("#chronicle-latest");

  function renderEntry(item){
    return `
      <article class="chronicle-entry">
        <div class="chronicle-entry-inner">
          <div class="chronicle-meta">
            <span>TRANSMISSION // ${item.id}</span>
            <span>PROTOCOL: ${item.protocol}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
          <div class="chronicle-status">${item.status.map(s => `<span>${s}</span>`).join("")}</div>
        </div>
      </article>`;
  }

  latestEl.innerHTML = renderEntry(latest);

  function openChronicle(){
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeChronicle(){
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function showAll(){
    latestEl.innerHTML = `
      <div class="chronicle-all-heading">
        <span>ARCHIVE // ALL TRANSMISSIONS</span>
        <button class="chronicle-latest">← LATEST ONLY</button>
      </div>
      <div class="chronicle-all-list">
        ${[...CHRONICLE_LATEST].reverse().map(renderEntry).join("")}
      </div>`;
    overlay.querySelector(".chronicle-all").style.display = "none";
  }

  function showLatest(){
    latestEl.innerHTML = renderEntry(latest);
    overlay.querySelector(".chronicle-all").style.display = "";
  }

  document.addEventListener("click", e => {
    const trigger = e.target.closest('[href="#chronicle"], [href="index.html#chronicle"]');
    if (trigger) {
      e.preventDefault();
      openChronicle();
      return;
    }

    if (e.target.closest(".chronicle-all")) {
      showAll();
      return;
    }

    if (e.target.closest(".chronicle-latest")) {
      showLatest();
      return;
    }

    if (e.target.closest(".chronicle-close, .chronicle-close-secondary") || e.target === overlay) {
      closeChronicle();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeChronicle();
  });

  try {
    if (!sessionStorage.getItem("glitchedARChronicleSeen")) {
      setTimeout(openChronicle, 500);
      sessionStorage.setItem("glitchedARChronicleSeen", "1");
    }
  } catch (_) {
    setTimeout(openChronicle, 500);
  }
})();