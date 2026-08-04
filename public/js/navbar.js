document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("navToggle");
  const collapse = document.getElementById("navCollapse");
  const navMenu = document.querySelector(".navbar-left .nav-menu");
  const navbarLeft = document.querySelector(".navbar-left");
  if (!toggle || !collapse || !navMenu) return;

  function placeMenu() {
    if (window.innerWidth <= 992) {
      if (navMenu.parentElement !== collapse) {
        collapse.insertBefore(navMenu, collapse.firstChild);
      }
    } else {
      if (navMenu.parentElement !== navbarLeft) {
        navbarLeft.appendChild(navMenu);
      }
    }
  }
  placeMenu();
  window.addEventListener("resize", placeMenu);

  toggle.addEventListener("click", function () {
    const isOpen = collapse.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  collapse.addEventListener("click", function (e) {
    if (e.target.closest(".nav-menu a")) {
      collapse.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

function setGoogleLang(lang) {
  const select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  } else {
    setTimeout(() => setGoogleLang(lang), 300);
  }
}

document.getElementById("langEn")?.addEventListener("click", (e) => {
  e.preventDefault();
  setGoogleLang("en");
});
document.getElementById("langId")?.addEventListener("click", (e) => {
  e.preventDefault();
  setGoogleLang("id");
});