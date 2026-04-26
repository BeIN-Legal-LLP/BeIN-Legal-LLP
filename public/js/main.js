/* ============================================
   BeIN Legal LLP — main.js
   Small interactions only. No frameworks.
   ============================================ */

(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when a leaf link is clicked
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        // If this link sits inside a dropdown that's collapsed on mobile,
        // expand the parent instead of navigating-and-closing.
        const parentDropdownToggle = link.parentElement.parentElement.querySelector(':scope > .has-dropdown > a');
        if (link.getAttribute('href') !== '#' && window.innerWidth <= 960) {
          navList.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  /* ---------- Mobile dropdown expand on tap ---------- */
  document.querySelectorAll('.has-dropdown > a').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      if (window.innerWidth <= 960 && anchor.getAttribute('href') === '#') {
        e.preventDefault();
        anchor.parentElement.classList.toggle('is-expanded');
      }
    });
  });

  /* ---------- Disclaimer modal ---------- */
  // Bar Council of India guidelines require law firms to show a disclaimer
  // before users see promotional content. We show it once per browser session
  // and remember the choice in localStorage.
  const STORAGE_KEY = 'bil_disclaimer_accepted';
  const overlay = document.getElementById('disclaimer-overlay');
  const agreeBtn = document.getElementById('disclaimer-agree');
  const disagreeBtn = document.getElementById('disclaimer-disagree');

  if (overlay && !localStorage.getItem(STORAGE_KEY)) {
    // Show on load
    requestAnimationFrame(function () {
      overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    });
  }

  if (agreeBtn) {
    agreeBtn.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, '1');
      overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    });
  }

  if (disagreeBtn) {
    disagreeBtn.addEventListener('click', function () {
      // If the user disagrees, send them away from the site (per BCI norms).
      window.location.href = 'https://www.google.com/';
    });
  }

  /* ---------- Auto-update footer year ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
