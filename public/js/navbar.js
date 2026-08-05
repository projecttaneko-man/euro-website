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

// ================== GOOGLE TRANSLATE ==================
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'id', includedLanguages: 'en', autoDisplay: false },
    'google_translate_element'
  );
}

function setGoogleLang(lang) {
  const select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  } else {
    setTimeout(function () { setGoogleLang(lang); }, 300);
  }
}

function resetToOriginal() {
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  const langEn = document.getElementById("langEn");
  const langId = document.getElementById("langId");

  langEn?.addEventListener("click", function (e) {
    e.preventDefault();
    setGoogleLang("en");
  });

  langId?.addEventListener("click", function (e) {
    e.preventDefault();
    if (document.cookie.includes("googtrans=/id/en")) {
      resetToOriginal();
    }
  });

  if (document.cookie.includes("googtrans=/id/en")) {
    langEn?.classList.add("active");
    langId?.classList.remove("active");
  }
});