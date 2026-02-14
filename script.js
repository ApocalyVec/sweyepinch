(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const sel = btn.getAttribute('data-copy');
      const el = sel ? document.querySelector(sel) : null;
      if (!el) return;

      try {
        await navigator.clipboard.writeText(el.innerText);
        const prev = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = prev), 900);
      } catch (e) {
        // fallback
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  });
})();

// ============================================================
// Auto-rotating figure gallery (no deps)
// ============================================================
(function () {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

  const track = gallery.querySelector(".gallery-track");
  const slides = Array.from(gallery.querySelectorAll(".gslide"));
  const prevBtn = gallery.querySelector("[data-prev]");
  const nextBtn = gallery.querySelector("[data-next]");
  const dotsWrap = gallery.querySelector(".gallery-dots");
  const viewport = gallery.querySelector(".gallery-viewport");

  if (!track || slides.length === 0) return;

  // ---- Config ----
  const AUTOPLAY_MS = 3500; // change to taste (e.g., 2500–5000)
  let idx = 0;
  let timer = null;
  let isPaused = false;

  // build dots
  let dots = [];
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "gdot";
      b.setAttribute("aria-label", `Go to figure ${i + 1}`);
      b.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(b);
      return b;
    });
  }

  function render() {
    track.style.transform = `translateX(${-idx * 100}%)`;
    dots.forEach((d, i) => d.setAttribute("aria-current", i === idx ? "true" : "false"));
  }

  function goTo(i, userInitiated = false) {
    idx = (i + slides.length) % slides.length;
    render();
    if (userInitiated) restartAutoplay();
  }

  // buttons
  prevBtn && prevBtn.addEventListener("click", () => goTo(idx - 1, true));
  nextBtn && nextBtn.addEventListener("click", () => goTo(idx + 1, true));

  // keyboard (when viewport focused)
  viewport && viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(idx - 1, true);
    if (e.key === "ArrowRight") goTo(idx + 1, true);
  });

  // swipe
  let startX = null;
  viewport && viewport.addEventListener("touchstart", (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewport && viewport.addEventListener("touchend", (e) => {
    if (startX == null) return;
    const endX = (e.changedTouches && e.changedTouches[0])
        ? e.changedTouches[0].clientX
        : startX;
    const dx = endX - startX;
    startX = null;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) goTo(idx - 1, true);
    else goTo(idx + 1, true);
  });

  // autoplay
  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (slides.length <= 1) return;
    timer = setInterval(() => {
      if (!isPaused) goTo(idx + 1, false);
    }, AUTOPLAY_MS);
  }

  function restartAutoplay() {
    // after manual interaction, restart timer cleanly
    startAutoplay();
  }

  // pause on hover/focus
  const pause = () => { isPaused = true; };
  const resume = () => { isPaused = false; };

  gallery.addEventListener("mouseenter", pause);
  gallery.addEventListener("mouseleave", resume);
  gallery.addEventListener("focusin", pause);
  gallery.addEventListener("focusout", resume);

  // initialize
  render();
  startAutoplay();
})();
