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
