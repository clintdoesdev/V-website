// Vireon shared site script
(function () {
  var root = document.documentElement;

  function each(list, fn) {
    for (var i = 0; i < list.length; i++) fn(list[i], i);
  }

  // ---- theme toggle ----
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('vireon-theme', t); } catch (e) {}
    each(document.querySelectorAll('.toggle-opt'), function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === t);
    });
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem('vireon-theme'); } catch (e) {}
    if (saved) applyTheme(saved);

    each(document.querySelectorAll('.toggle-opt'), function (btn) {
      btn.addEventListener('click', function () { applyTheme(btn.getAttribute('data-theme')); });
    });

    // ---- reveal on scroll (with safety fallback so content is never stuck hidden) ----
    var revealEls = document.querySelectorAll('.reveal');
    var revealed = false;
    function revealAll() {
      if (revealed) return;
      revealed = true;
      each(revealEls, function (el) { el.classList.add('visible'); });
    }
    if ('IntersectionObserver' in window) {
      try {
        var io = new IntersectionObserver(function (entries) {
          each(entries, function (e) {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
          });
        }, { threshold: 0.12 });
        each(revealEls, function (el) { io.observe(el); });
      } catch (e) { revealAll(); }
    } else {
      revealAll();
    }
    // belt-and-suspenders: guarantee everything is visible shortly after load
    // even if the observer never fires (older/unusual browsers, JS quirks, etc.)
    setTimeout(revealAll, 1200);

    // ---- faq single-open accordion ----
    each(document.querySelectorAll('.faq-item'), function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) {
          each(document.querySelectorAll('.faq-item'), function (o) {
            if (o !== d) o.removeAttribute('open');
          });
        }
      });
    });

    // ---- mobile nav drawer ----
    var menuBtn = document.querySelector('.menu-btn');
    var mobileNav = document.querySelector('.mobile-nav');
    var mobileNavClose = document.querySelector('.mobile-nav-close');
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener('click', function () { mobileNav.classList.add('open'); });
      if (mobileNavClose) mobileNavClose.addEventListener('click', function () { mobileNav.classList.remove('open'); });
      mobileNav.addEventListener('click', function (e) { if (e.target === mobileNav) mobileNav.classList.remove('open'); });
      each(document.querySelectorAll('.mobile-nav-panel a'), function (a) {
        a.addEventListener('click', function () { mobileNav.classList.remove('open'); });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
