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

    // ---- image load-up: every image in a revealed block appears together, not one-by-one ----
    var imgWraps = document.querySelectorAll('.img-reveal');
    function loadImagesWithin(el) {
      each(imgWraps, function (wrap) {
        if (wrap === el || el.contains(wrap)) wrap.classList.add('loaded');
      });
    }
    // images with no scroll-reveal ancestor (e.g. the hero) appear immediately, in sync with the hero entrance
    each(imgWraps, function (wrap) {
      var gated = wrap.closest ? wrap.closest('.reveal, .reveal-left, .reveal-right') : null;
      if (!gated) wrap.classList.add('loaded');
    });

    // ---- reveal on scroll (with safety fallback so content is never stuck hidden) ----
    var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    var revealed = false;
    function revealAll() {
      if (revealed) return;
      revealed = true;
      each(revealEls, function (el) { el.classList.add('visible'); loadImagesWithin(el); });
    }
    if ('IntersectionObserver' in window) {
      try {
        var io = new IntersectionObserver(function (entries) {
          each(entries, function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              loadImagesWithin(e.target);
              io.unobserve(e.target);
            }
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

    // ---- registration form -> Telegram handoff ----
    var regForm = document.getElementById('regForm');
    if (regForm) {
      regForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (regForm.checkValidity && !regForm.checkValidity()) {
          regForm.reportValidity();
          return;
        }
        var submitBtn = regForm.querySelector('.form-submit');
        if (submitBtn) { submitBtn.textContent = 'Redirecting to Telegram...'; submitBtn.setAttribute('disabled', 'disabled'); }
        window.location.href = 'https://t.me/m/VGV7OU3LM2Zk';
      });
    }

    // ---- quick signup form -> success overlay -> Telegram handoff ----
    var quickSignup = document.getElementById('quickSignup');
    var successOverlay = document.getElementById('successOverlay');
    if (quickSignup) {
      quickSignup.addEventListener('submit', function (e) {
        e.preventDefault();
        if (quickSignup.checkValidity && !quickSignup.checkValidity()) {
          quickSignup.reportValidity();
          return;
        }
        var submitBtn = quickSignup.querySelector('.form-submit');
        if (submitBtn) { submitBtn.setAttribute('disabled', 'disabled'); }
        if (successOverlay) {
          successOverlay.classList.add('show');
          successOverlay.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
        setTimeout(function () {
          window.location.href = 'https://t.me/m/YpV0fIYFYzY8';
        }, 1900);
      });
    }

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
