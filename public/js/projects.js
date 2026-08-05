document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".projects-tab");
  const panels = document.querySelectorAll(".projects-panel");
  const autoplayTimers = {};

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });

      tab.classList.add("active");
      const panel = document.querySelector('.projects-panel[data-panel="' + tab.dataset.tab + '"]');
      panel.classList.add("active");

      initDots(panel);
      startAutoplay(panel);
    });
  });

  function initDots(panel) {
    const track = panel.querySelector(".projects-track");
    const dotsWrap = panel.querySelector("[data-slide-dots]");
    const cards = track.querySelectorAll(".project-card");

    dotsWrap.innerHTML = "";
    cards.forEach(function (card, i) {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () {
        goToCard(panel, i);
        restartAutoplay(panel);
      });
      dotsWrap.appendChild(dot);
    });

    track.addEventListener("scroll", function () {
      updateActiveDot(panel);
    });
  }

  function updateActiveDot(panel) {
    const track = panel.querySelector(".projects-track");
    const dotsWrap = panel.querySelector("[data-slide-dots]");
    const cards = track.querySelectorAll(".project-card");
    const dots = dotsWrap.querySelectorAll("span");

    let closestIndex = 0;
    let closestDist = Infinity;
    cards.forEach(function (card, i) {
      const dist = Math.abs(card.offsetLeft - track.scrollLeft);
      if (dist < closestDist) { closestDist = dist; closestIndex = i; }
    });

    dots.forEach(function (d, i) { d.classList.toggle("active", i === closestIndex); });
  }

  function goToCard(panel, index) {
    const track = panel.querySelector(".projects-track");
    const cards = track.querySelectorAll(".project-card");
    track.scrollTo({ left: cards[index].offsetLeft, behavior: "smooth" });
  }

  function currentIndex(panel) {
    const track = panel.querySelector(".projects-track");
    const cards = track.querySelectorAll(".project-card");
    let closestIndex = 0;
    let closestDist = Infinity;
    cards.forEach(function (card, i) {
      const dist = Math.abs(card.offsetLeft - track.scrollLeft);
      if (dist < closestDist) { closestDist = dist; closestIndex = i; }
    });
    return closestIndex;
  }

  function slideStep(panel, dir) {
    const track = panel.querySelector(".projects-track");
    const cards = track.querySelectorAll(".project-card");
    const total = cards.length;
    let next = currentIndex(panel) + dir;

    if (next >= total) next = 0;
    if (next < 0) next = total - 1;

    goToCard(panel, next);
  }

  document.querySelectorAll("[data-slide-prev]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const panel = btn.closest(".projects-panel");
      slideStep(panel, -1);
      restartAutoplay(panel);
    });
  });
  document.querySelectorAll("[data-slide-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const panel = btn.closest(".projects-panel");
      slideStep(panel, 1);
      restartAutoplay(panel);
    });
  });

  function startAutoplay(panel) {
    const key = panel.dataset.panel;
    stopAutoplay(key);
    autoplayTimers[key] = setInterval(function () {
      slideStep(panel, 1);
    }, 3500);
  }

  function stopAutoplay(key) {
    if (autoplayTimers[key]) {
      clearInterval(autoplayTimers[key]);
      autoplayTimers[key] = null;
    }
  }

  function restartAutoplay(panel) {
    startAutoplay(panel);
  }

  panels.forEach(function (panel) {
    const slider = panel.querySelector(".projects-slider");
    const key = panel.dataset.panel;

    slider.addEventListener("mouseenter", function () { stopAutoplay(key); });
    slider.addEventListener("mouseleave", function () { if (panel.classList.contains("active")) startAutoplay(panel); });
    slider.addEventListener("touchstart", function () { stopAutoplay(key); }, { passive: true });
    slider.addEventListener("touchend", function () {
      setTimeout(function () { if (panel.classList.contains("active")) startAutoplay(panel); }, 1000);
    });
  });

  panels.forEach(function (panel) {
    const track = panel.querySelector(".projects-track");
    let isDown = false;
    let startX, scrollLeftStart;

    track.addEventListener("mousedown", function (e) {
      isDown = true;
      track.classList.add("dragging");
      startX = e.pageX - track.offsetLeft;
      scrollLeftStart = track.scrollLeft;
    });
    track.addEventListener("mouseleave", function () { isDown = false; track.classList.remove("dragging"); });
    track.addEventListener("mouseup", function () { isDown = false; track.classList.remove("dragging"); });
    track.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.4;
      track.scrollLeft = scrollLeftStart - walk;
    });
  });

  const firstPanel = document.querySelector('.projects-panel.active');
  initDots(firstPanel);
  startAutoplay(firstPanel);
});