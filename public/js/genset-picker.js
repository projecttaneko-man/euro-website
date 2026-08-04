document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll("[data-picker-card]");

  cards.forEach(function (card) {
    card.addEventListener("touchstart", function () {
      card.classList.add("active");
    }, { passive: true });

    card.addEventListener("click", function (e) {
      const isTouchDevice = window.matchMedia("(hover: none)").matches;
      if (isTouchDevice && !card.classList.contains("active")) {
        e.preventDefault();
        cards.forEach(function (c) { c.classList.remove("active"); });
        card.classList.add("active");
      }
    });
  });

  document.addEventListener("touchstart", function (e) {
    if (!e.target.closest("[data-picker-card]")) {
      cards.forEach(function (c) { c.classList.remove("active"); });
    }
  }, { passive: true });
});