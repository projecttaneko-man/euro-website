document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-faq-toggle]").forEach(function (btn) {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("open")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

    btn.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
        openItem.querySelector(".faq-toggle-icon i").className = "fa-solid fa-plus";
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.querySelector(".faq-toggle-icon i").className = "fa-solid fa-minus";
      }
    });
  });
});