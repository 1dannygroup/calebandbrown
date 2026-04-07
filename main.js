/**
 * Caleb & Brown - Vanilla JavaScript
 * Handles mobile navigation, dropdown menus, and other interactive features
 */

document.addEventListener('DOMContentLoaded', function () {
  /* ── Mobile Menu Toggle ─────────────────────────────────── */
  const menuOpen = document.querySelector('.navbar-burger');
  const menuPanel = document.querySelector('.navbar-menu');
  const menuClose = document.querySelector('.navbar-close');
  const menuBackdrop = document.querySelector('.navbar-backdrop');

  function openMobileMenu() {
    if (menuPanel) {
      menuPanel.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (menuPanel) {
      menuPanel.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (menuOpen) menuOpen.addEventListener('click', openMobileMenu);
  if (menuClose) menuClose.addEventListener('click', closeMobileMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMobileMenu);

  /* ── Mobile Submenu Accordion ───────────────────────────── */
  var mobileSubmenuBtns = document.querySelectorAll('.navbar-menu .submenu > button');
  mobileSubmenuBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var submenu = btn.closest('.submenu');
      if (!submenu) return;
      var sublist = submenu.querySelector('ul');
      if (!sublist) return;

      var isOpen = !sublist.classList.contains('hidden');
      // Close all
      document.querySelectorAll('.navbar-menu .submenu ul').forEach(function (ul) {
        ul.classList.add('hidden');
      });
      document.querySelectorAll('.navbar-menu .submenu > button svg').forEach(function (svg) {
        svg.style.transform = '';
      });

      if (!isOpen) {
        sublist.classList.remove('hidden');
        var svg = btn.querySelector('svg');
        if (svg) svg.style.transform = 'rotate(180deg)';
      }
    });
  });

  /* ── Sticky Header (scroll hide/show) ───────────────────── */
  var header = document.querySelector('header');
  if (header) {
    var lastScrollY = 0;
    var ticking = false;

    function updateHeader() {
      var currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down – hide header
          header.style.top = '-100px';
        } else {
          // Scrolling up – show header
          header.style.top = '0';
        }
      } else {
        header.style.top = '0';
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  /* ── Newsletter Form ────────────────────────────────────── */
  var newsletterForm = document.querySelector('form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        var btn = newsletterForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Thanks!';
          btn.disabled = true;
        }
      }
    });
  }

  /* ── Smooth Scroll for Anchor Links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ── Gatsby Image Wrapper Fix ───────────────────────────── */
  // Ensure all data-main-image images are visible (replacing Gatsby lazy loader)
  document.querySelectorAll('img[data-main-image]').forEach(function (img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
    }
    img.style.opacity = '1';
  });

  // Ensure gatsby-image-wrapper placeholder images show properly
  document.querySelectorAll('[data-gatsby-image-wrapper]').forEach(function (wrapper) {
    var mainImg = wrapper.querySelector('img[data-main-image]');
    if (mainImg) {
      mainImg.style.opacity = '1';
    }
  });
});
