/* ============================================================
   PACK 3D — script.js
   Otimizado sem quebrar interações | GitHub + Vercel ready
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var win = window;
  var raf = win.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
  var idle = win.requestIdleCallback || function (cb) { return setTimeout(function () { cb({ didTimeout: false, timeRemaining: function () { return 1; } }); }, 250); };

  function $(selector, root) { return (root || doc).querySelector(selector); }
  function $all(selector, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(selector)); }

  /* ---- COUNTDOWN TIMER ---- */
  function initTimer() {
    var el = doc.getElementById('timer-count');
    if (!el) return;

    var key = 'pack3d_timer_end';
    var end = parseInt(sessionStorage.getItem(key) || '0', 10);
    if (!end || end < Date.now()) {
      end = Date.now() + 16 * 60 * 1000;
      sessionStorage.setItem(key, String(end));
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

  /* ---- CTA BUTTONS ---- */
  function initCTAButtons() {
    doc.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-checkout]');
      if (!btn) return;
      var url = btn.getAttribute('data-checkout') || '#checkout';
      win.location.href = url;
    });
  }

  /* ---- POPUP MODAL (Plano Básico) ---- */
  function initModal() {
    var overlay = doc.getElementById('modal-overlay');
    var btnBasic = doc.getElementById('btn-basic');
    if (!overlay || !btnBasic) return;

    var btnClose = doc.getElementById('modal-close');
    var btnConfirm = doc.getElementById('modal-confirm');
    var btnUpgrade = doc.getElementById('modal-upgrade');
    var pricing = doc.getElementById('pricing');

    function openModal() {
      overlay.classList.add('open');
      doc.body.style.overflow = 'hidden';
    }
    function closeModal() {
      overlay.classList.remove('open');
      doc.body.style.overflow = '';
    }

    btnBasic.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    });
    if (btnClose) btnClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    if (btnConfirm) btnConfirm.addEventListener('click', function () { win.location.href = '#checkout-basic'; });
    if (btnUpgrade) btnUpgrade.addEventListener('click', function () {
      closeModal();
      if (pricing) pricing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });
  }

  /* ---- SCROLL REVEAL ---- */
  function initScrollReveal() {
    var els = $all('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    if (!('IntersectionObserver' in win)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---- FAQ ACCORDION ---- */
  function initFAQ() {
    var list = $('.faq-list');
    if (!list) return;

    list.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.faq-question');
      if (!btn) return;
      var item = btn.closest('.faq-item');
      if (!item) return;
      var isOpen = item.classList.contains('open');
      $all('.faq-item', list).forEach(function (i) {
        i.classList.remove('open');
        var b = $('.faq-question', i);
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ---- MOBILE STICKY BAR ---- */
  function initMobileBar() {
    var bar = doc.getElementById('mobile-bar');
    if (!bar) return;
    var shown = false;
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      raf(function () {
        if (!shown && win.scrollY > 300) {
          bar.classList.add('visible');
          shown = true;
        }
        ticking = false;
      });
    }
    win.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- CAROUSEL ---- */
  function initCarousel(wrapId, trackId, prevId, nextId) {
    var wrap = doc.getElementById(wrapId);
    var track = doc.getElementById(trackId);
    if (!wrap || !track) return;

    var prevBtn = doc.getElementById(prevId);
    var nextBtn = doc.getElementById(nextId);
    var slides = track.querySelectorAll('.carousel-slide, .testimonial-slide');
    var total = slides.length;
    var current = 0;
    var startX = 0;
    var isDragging = false;
    var resizeTimer = null;

    function getPerView() {
      var w = win.innerWidth;
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

    function maxIndex() { return Math.max(0, total - getPerView()); }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      var offset = -(current * (100 / getPerView()));
      track.style.transform = 'translate3d(' + offset + '%,0,0)';
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    wrap.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    wrap.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      isDragging = false;
    }, { passive: true });

    wrap.addEventListener('mousedown', function (e) {
      startX = e.clientX;
      isDragging = true;
    });

    doc.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      var diff = startX - e.clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      isDragging = false;
    });

    win.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { goTo(current); }, 120);
    }, { passive: true });

    goTo(0);
  }

  function initCarouselsLazy() {
    function start() {
      initCarousel('categories-carousel', 'categories-track', 'cat-prev', 'cat-next');
      initCarousel('testimonials-carousel', 'testimonials-track', 'test-prev', 'test-next');
    }

    if (!('IntersectionObserver' in win)) {
      start();
      return;
    }

    var targets = [doc.getElementById('categories-carousel'), doc.getElementById('testimonials-carousel')].filter(Boolean);
    if (!targets.length) return;

    var started = {};
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        if (started[id]) return;
        started[id] = true;
        if (id === 'categories-carousel') initCarousel('categories-carousel', 'categories-track', 'cat-prev', 'cat-next');
        if (id === 'testimonials-carousel') initCarousel('testimonials-carousel', 'testimonials-track', 'test-prev', 'test-next');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '350px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---- NOTIFICATION BALLOON ---- */
  var notifications = [
    ['Beatriz Nogueira', 'Goiânia, GO', 'MEGA PACK PREMIUM'],
    ['Carlos Mendes', 'São Paulo, SP', 'MEGA PACK PREMIUM'],
    ['Ana Paula Lima', 'Belo Horizonte, MG', 'MEGA PACK PREMIUM'],
    ['Rafael Souza', 'Curitiba, PR', 'MEGA PACK PREMIUM'],
    ['Fernanda Costa', 'Fortaleza, CE', 'MEGA PACK PREMIUM'],
    ['Lucas Oliveira', 'Recife, PE', 'MEGA PACK PREMIUM'],
    ['Juliana Santos', 'Salvador, BA', 'MEGA PACK PREMIUM'],
    ['Marcos Ferreira', 'Porto Alegre, RS', 'MEGA PACK PREMIUM'],
    ['Camila Rocha', 'Brasília, DF', 'MEGA PACK PREMIUM'],
    ['Diego Alves', 'Manaus, AM', 'MEGA PACK PREMIUM']
  ];
  var notifIndex = 0;

  function showNotification() {
    var balloon = doc.getElementById('notif-balloon');
    if (!balloon) return;
    var n = notifications[notifIndex % notifications.length];
    notifIndex += 1;

    var nameEl = $('.notif-name', balloon);
    var cityEl = $('.notif-city', balloon);
    var productEl = $('.notif-product', balloon);
    if (nameEl) nameEl.textContent = n[0];
    if (cityEl) cityEl.textContent = n[1] + ' adquiriu o';
    if (productEl) productEl.textContent = ' ' + n[2];

    balloon.classList.add('show');
    setTimeout(function () { balloon.classList.remove('show'); }, 4500);
  }

  function initNotifications() {
    if (!doc.getElementById('notif-balloon')) return;
    win.addEventListener('load', function () {
      setTimeout(function cycle() {
        showNotification();
        setTimeout(cycle, 9000 + Math.floor(Math.random() * 3000));
      }, 4500);
    }, { once: true });
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
  function initSmoothScroll() {
    doc.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var target = doc.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---- INIT COM ATRASO EQUILIBRADO ---- */
  function initCritical() {
    // Este arquivo já entra 3s depois do DOM para priorizar a VSL.
    // Mantém primeiro as interações essenciais, sem cálculos pesados.
    initTimer();
    initCTAButtons();
    initModal();
    initScrollReveal();
  }

  function initDeferredStageOne() {
    initFAQ();
    initSmoothScroll();
    initMobileBar();
  }

  function initDeferredStageTwo() {
    initCarouselsLazy();
  }

  function initDeferredStageThree() {
    initNotifications();
  }

  function boot() {
    initCritical();

    // Como o arquivo já foi atrasado no index, aqui a liberação é mais rápida.
    // Isso mantém o site responsivo sem competir com o carregamento inicial da VTurb.
    setTimeout(function () { idle(initDeferredStageOne); }, 150);
    setTimeout(function () { idle(initDeferredStageTwo); }, 650);
    setTimeout(function () { idle(initDeferredStageThree); }, 1600);
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
