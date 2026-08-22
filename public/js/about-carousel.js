document.addEventListener("DOMContentLoaded", function () {
  const roots = document.querySelectorAll("[data-about-carousel]");
  roots.forEach(initCarousel);

  function initCarousel(root) {
    const viewport = root.querySelector(".about-carousel-viewport");
    const track = root.querySelector(".about-carousel-track");
    if (!viewport || !track) return;

    const originals = Array.from(track.children);
    if (originals.length === 0) return;

    const SPEED = 5000; // durasi animasi & interval autoplay (ms)
    const CLONES = 5; // jumlah slide yang tampil (slidesToShow)

    // Kloning slide pertama ke belakang agar loop tak terputus (infinite)
    for (let i = 0; i < CLONES; i++) {
      track.appendChild(originals[i % originals.length].cloneNode(true));
    }

    const slides = Array.from(track.children);
    const originalCount = originals.length;
    let index = 0;
    let slideWidth = 0;
    let timer = null;

    function slidesToShow() {
      const w = window.innerWidth;
      if (w >= 992) return 5;
      if (w >= 768) return 3;
      return 2;
    }

    function layout() {
      slideWidth = viewport.clientWidth / slidesToShow();
      slides.forEach(function (s) { s.style.width = slideWidth + "px"; });
      track.style.transition = "none";
      track.style.transform = "translateX(" + (-index * slideWidth) + "px)";
    }

    function next() {
      index++;
      track.style.transition = "transform " + SPEED + "ms linear";
      track.style.transform = "translateX(" + (-index * slideWidth) + "px)";
    }

    track.addEventListener("transitionend", function () {
      if (index >= originalCount) {
        index = 0;
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        void track.offsetWidth; // paksa reflow agar reset mulus
      }
    });

    function start() {
      stop();
      timer = setInterval(next, SPEED);
      next();
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    layout();
    start();

    window.addEventListener("resize", layout);
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
  }
});
