const modes = {
  boring: {
    eyebrow: "SKINCARE / PAID SOCIAL",
    headline: "Introducing our new daily moisturiser.",
    body: "Made with carefully selected ingredients for hydrated, healthy-looking skin.",
    note: "Technically fine. Commercially invisible."
  },
  better: {
    eyebrow: "SAME PRODUCT / BETTER PROMISE",
    headline: "Your 3PM face called. It wants its morning back.",
    body: "A daily moisturiser built for the point in the day when your skin usually gives up.",
    note: "Now there is a problem, a moment and a reason to care."
  },
  whcbb: {
    eyebrow: "SAME PRODUCT / STRONGER OPENING",
    headline: "If your moisturiser quits before you do, fire it.",
    body: "All-day hydration without the twelve-step bathroom ritual. Put it on. Go live your life.",
    note: "Clear enemy. Clear attitude. Product earns the next second."
  }
};

const tabs = document.querySelectorAll(".demo-tab");
const headline = document.getElementById("demoHeadline");
const body = document.getElementById("demoBody");
const eyebrow = document.getElementById("demoEyebrow");
const note = document.getElementById("demoNote");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const mode = modes[tab.dataset.mode];
    tabs.forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    [headline, body, eyebrow, note].forEach(el => {
      el.animate(
        [{opacity: 1, transform:"translateY(0)"},{opacity: 0, transform:"translateY(8px)"}],
        {duration:120, fill:"forwards"}
      );
    });

    window.setTimeout(() => {
      eyebrow.textContent = mode.eyebrow;
      headline.textContent = mode.headline;
      body.textContent = mode.body;
      note.textContent = mode.note;
      [headline, body, eyebrow, note].forEach(el => {
        el.animate(
          [{opacity:0, transform:"translateY(8px)"},{opacity:1, transform:"translateY(0)"}],
          {duration:320, easing:"cubic-bezier(.2,.7,.2,1)", fill:"forwards"}
        );
      });
    }, 125);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: .12});

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
  revealObserver.observe(el);
});

const progress = document.querySelector(".progress span");
const dolly = document.querySelector(".dolly-word");
let ticking = false;

function onScroll(){
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? window.scrollY / h : 0;
    progress.style.width = `${Math.min(100, p * 100)}%`;

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      const heroProgress = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      const scale = 1 + heroProgress * .55;
      dolly.style.setProperty("--dolly-scale", scale.toFixed(3));
    }
    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

document.getElementById("year").textContent = new Date().getFullYear();
