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

  /* ---------- Consent flow: banner → modal → accept ---------- */
  // Two-step pattern: a non-blocking banner appears at first visit. Clicking
  // "I Accept" on the banner opens a modal with the full BCI disclaimer +
  // privacy/cookies summary; the user must then click "I Agree" inside the
  // modal to finalise acceptance.
  const STORAGE_KEY = 'bil_consent_accepted';
  const banner = document.getElementById('consent-banner');
  const bannerAccept = document.getElementById('consent-accept');
  const modal = document.getElementById('disclaimer-overlay');
  const modalAgree = document.getElementById('disclaimer-agree');
  const modalDisagree = document.getElementById('disclaimer-disagree');

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  function hideBanner() {
    if (banner) banner.classList.remove('is-visible');
  }

  if (banner && !localStorage.getItem(STORAGE_KEY)) {
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });
  }

  if (bannerAccept) {
    bannerAccept.addEventListener('click', openModal);
  }

  if (modalAgree) {
    modalAgree.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, '1');
      closeModal();
      hideBanner();
    });
  }

  if (modalDisagree) {
    modalDisagree.addEventListener('click', function () {
      // BCI norms: a user who disagrees should not browse the site
      window.location.href = 'https://www.google.com/';
    });
  }

  /* ---------- Auto-update footer year ---------- */
  document.querySelectorAll('#current-year, .js-current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Interactive values: tap to expand ---------- */
  document.querySelectorAll('.value-tile').forEach(function (tile) {
    tile.addEventListener('click', function () {
      tile.classList.toggle('is-open');
    });
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tile.classList.toggle('is-open');
      }
    });
  });
})();
