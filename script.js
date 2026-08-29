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
