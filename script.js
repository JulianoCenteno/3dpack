/* ============================================================
   PACK 3D — script.js
   Projeto estático puro | GitHub + Vercel ready
   ============================================================ */

(function () {
  'use strict';

  /* ---- COUNTDOWN TIMER ---- */
  function initTimer() {
    var el = document.getElementById('timer-count');
    if (!el) return;
    var key = 'pack3d_timer_end';
    var stored = sessionStorage.getItem(key);
    var end;
    if (stored) {
      end = parseInt(stored, 10);
    } else {
      end = Date.now() + 16 * 60 * 1000; // 16 minutos
      sessionStorage.setItem(key, end);
    }
    function tick() {
      var diff = Math.max(0, end - Date.now());
      var m = Math.floor(diff / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      if (diff > 0) setTimeout(tick, 1000);
    }
    tick();
  }

  /* ---- CAROUSEL ---- */
  function initCarousel(wrapId, trackId, prevId, nextId, slidesPerView) {
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    var track = document.getElementById(trackId);
    if (!track) return;
    var prevBtn = document.getElementById(prevId);
    var nextBtn = document.getElementById(nextId);
    var slides = track.querySelectorAll('.carousel-slide, .testimonial-slide');
    var total = slides.length;
    var current = 0;
    var perView = slidesPerView || 1;
    var startX = 0;
    var isDragging = false;

    function getPerView() {
      var w = window.innerWidth;
      if (wrapId === 'categories-carousel') {
        if (w >= 768) return 3;
        if (w >= 640) return 2;
        return 1;
      }
      if (wrapId === 'testimonials-carousel') {
        if (w >= 1024) return 3;
        if (w >= 640) return 2;
        return 1;
      }
      return 1;
    }

    function maxIndex() {
      return Math.max(0, total - getPerView());
    }

    function goTo(idx) {
      perView = getPerView();
      current = Math.max(0, Math.min(idx, maxIndex()));
      var slideWidth = 100 / perView;
      var offset = -(current * slideWidth);
      track.style.transform = 'translateX(' + offset + '%)';
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    // Touch/swipe
    var trackEl = wrap;
    trackEl.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    trackEl.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
      isDragging = false;
    }, { passive: true });

    // Mouse drag
    trackEl.addEventListener('mousedown', function (e) {
      startX = e.clientX;
      isDragging = true;
    });
    document.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      var diff = startX - e.clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
      isDragging = false;
    });

    window.addEventListener('resize', function () { goTo(current); });
    goTo(0);
  }

  /* ---- FAQ ACCORDION ---- */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // Close all
        items.forEach(function (i) { i.classList.remove('open'); });
        // Toggle current
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ---- MOBILE STICKY BAR ---- */
  function initMobileBar() {
    var bar = document.getElementById('mobile-bar');
    if (!bar) return;
    var shown = false;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300 && !shown) {
        bar.classList.add('visible');
        shown = true;
      }
    }, { passive: true });
  }

  /* ---- NOTIFICATION BALLOON ---- */
  var notifications = [
    { name: 'Beatriz Nogueira', city: 'Goiânia, GO', product: 'MEGA PACK PREMIUM' },
    { name: 'Carlos Mendes', city: 'São Paulo, SP', product: 'MEGA PACK PREMIUM' },
    { name: 'Ana Paula Lima', city: 'Belo Horizonte, MG', product: 'MEGA PACK PREMIUM' },
    { name: 'Rafael Souza', city: 'Curitiba, PR', product: 'MEGA PACK PREMIUM' },
    { name: 'Fernanda Costa', city: 'Fortaleza, CE', product: 'MEGA PACK PREMIUM' },
    { name: 'Lucas Oliveira', city: 'Recife, PE', product: 'MEGA PACK PREMIUM' },
    { name: 'Juliana Santos', city: 'Salvador, BA', product: 'MEGA PACK PREMIUM' },
    { name: 'Marcos Ferreira', city: 'Porto Alegre, RS', product: 'MEGA PACK PREMIUM' },
    { name: 'Camila Rocha', city: 'Brasília, DF', product: 'MEGA PACK PREMIUM' },
    { name: 'Diego Alves', city: 'Manaus, AM', product: 'MEGA PACK PREMIUM' },
  ];
  var notifIndex = 0;

  function showNotification() {
    var balloon = document.getElementById('notif-balloon');
    if (!balloon) return;
    var n = notifications[notifIndex % notifications.length];
    notifIndex++;

    balloon.querySelector('.notif-name').textContent = n.name;
    balloon.querySelector('.notif-city').textContent = n.city + ' adquiriu o';
    balloon.querySelector('.notif-product').textContent = n.product;

    balloon.classList.add('show');
    setTimeout(function () {
      balloon.classList.remove('show');
    }, 4500);
  }

  function initNotifications() {
    var balloon = document.getElementById('notif-balloon');
    if (!balloon) return;
    // First show after 3s
    setTimeout(function () {
      showNotification();
      // Then every 8-12s
      setInterval(function () {
        showNotification();
      }, 9000 + Math.random() * 3000);
    }, 3000);
  }

  /* ---- POPUP MODAL (Plano Básico) ---- */
  function initModal() {
    var overlay = document.getElementById('modal-overlay');
    var btnBasic = document.getElementById('btn-basic');
    var btnClose = document.getElementById('modal-close');
    var btnConfirm = document.getElementById('modal-confirm');
    var btnUpgrade = document.getElementById('modal-upgrade');

    if (!overlay || !btnBasic) return;

    function openModal() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    btnBasic.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    if (btnConfirm) {
      btnConfirm.addEventListener('click', function () {
        // Replace with actual basic plan URL
        window.location.href = '#checkout-basic';
      });
    }
    if (btnUpgrade) {
      btnUpgrade.addEventListener('click', function () {
        closeModal();
        document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ---- SCROLL REVEAL ---- */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---- CTA BUTTONS ---- */
  function initCTAButtons() {
    // All CTA buttons point to the same checkout URL
    // Replace '#checkout' with the actual Hotmart/Kiwify URL
    var checkoutUrl = '#checkout';
    var ctaBtns = document.querySelectorAll('[data-checkout]');
    ctaBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = btn.getAttribute('data-checkout') || checkoutUrl;
        window.location.href = url;
      });
    });
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---- INIT ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initTimer();
    initCarousel('categories-carousel', 'categories-track', 'cat-prev', 'cat-next');
    initCarousel('testimonials-carousel', 'testimonials-track', 'test-prev', 'test-next');
    initFAQ();
    initMobileBar();
    initNotifications();
    initModal();
    initScrollReveal();
    initCTAButtons();
    initSmoothScroll();
  });

})();
