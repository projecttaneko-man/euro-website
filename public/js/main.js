document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navbarMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) return;

  var selectors = [
    '.service-card',
    '.project-card',
    '.office-card',
    '.picker-card',
    '.genset-logo',
    '.timeline li',
    '.genset-detail-image img',
    '.support-image img',
    '.contact-form-card',
    '.contact-info',
    '.faq-image-col img',
    '.faq-item',
    '.genset-highlight-box'
  ];

  var items = document.querySelectorAll(selectors.join(','));
  if (!items.length) return;

  items.forEach(function (el, i) {
    el.classList.add('reveal-auto');
    el.style.transitionDelay = (i % 4) * 0.15 + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function getHeaderHeight() {
    const header = document.querySelector("header");
    return header ? header.offsetHeight : 130;
  }

  function scrollToHash(hash) {
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;

    const headerHeight = getHeaderHeight();
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 15;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth"
    });
  }

  if (window.location.hash) {
    setTimeout(function () {
      scrollToHash(window.location.hash);
    }, 200);
  }

  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href*="#"]');
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const hash = link.hash;
    if (!hash) return;

    const targetUrl = new URL(link.href, window.location.origin);
    if (targetUrl.pathname === window.location.pathname) {
      e.preventDefault();
      history.pushState(null, null, hash);
      scrollToHash(hash);
    }
  });
});

window.addEventListener('scroll', function () {
  var header = document.getElementById('siteHeader');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});