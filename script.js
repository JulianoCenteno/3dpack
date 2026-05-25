/* PACK 3D - script único otimizado GitHub/Vercel */
(function(){
  'use strict';

  function ready(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(function(){
    initCountdown();
    initReveal();
    initCategoryCarousel();
    initProofCarousel();
    initBasicPopup();
    initFAQ();
    initSaleToast();
  });

  function initCountdown(){
    var el = document.getElementById('dm-count');
    if(!el) return;
    var key = 'pack3d_offer_timer';
    var end = Number(sessionStorage.getItem(key));
    if(!end){
      end = Date.now() + (15 * 60 + 5) * 1000;
      sessionStorage.setItem(key, String(end));
    }
    var timer;
    function tick(){
      var remaining = Math.max(0, end - Date.now());
      var minutes = Math.floor(remaining / 60000);
      var seconds = Math.floor((remaining % 60000) / 1000);
      el.textContent = String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0');
      if(remaining <= 0 && timer) clearInterval(timer);
    }
    tick();
    timer = setInterval(tick, 1000);
  }

  function initReveal(){
    var items = document.querySelectorAll('.dm-reveal');
    if(!items.length) return;
    if(!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('dm-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('dm-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.14, rootMargin:'0px 0px -35px 0px'});
    items.forEach(function(el){ observer.observe(el); });
  }

  function initCategoryCarousel(){
    var carousel = document.getElementById('dmCatCarousel');
    var track = document.getElementById('dmCatTrack');
    if(!carousel || !track) return;
    var prev = carousel.querySelector('.dm-cat-prev');
    var next = carousel.querySelector('.dm-cat-next');
    var slides = track.querySelectorAll('.dm-cat-slide');
    var index = 0;
    var perView = 2;
    var startX = 0;

    function update(){
      var max = Math.max(0, slides.length - perView);
      index = Math.max(0, Math.min(index, max));
      track.style.transform = 'translateX(-' + (index * (100 / perView)) + '%)';
      if(prev) prev.disabled = index === 0;
      if(next) next.disabled = index === max;
    }
    if(prev) prev.addEventListener('click', function(){ index--; update(); });
    if(next) next.addEventListener('click', function(){ index++; update(); });
    track.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', function(e){
      var diff = startX - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 35){ index += diff > 0 ? 1 : -1; update(); }
    }, {passive:true});
    update();
  }

  function initProofCarousel(){
    var carousel = document.getElementById('dmProofCarousel');
    var track = document.getElementById('dmProofTrack');
    if(!carousel || !track) return;
    var slides = track.querySelectorAll('.dm-proof-slide');
    var prev = carousel.querySelector('.dm-proof-prev');
    var next = carousel.querySelector('.dm-proof-next');
    var index = 0;
    var startX = 0;

    function update(){
      var max = Math.max(0, slides.length - 1);
      index = Math.max(0, Math.min(index, max));
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      if(prev) prev.disabled = index === 0;
      if(next) next.disabled = index === max;
    }
    if(prev) prev.addEventListener('click', function(){ index--; update(); });
    if(next) next.addEventListener('click', function(){ index++; update(); });
    track.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', function(e){
      var diff = startX - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 35){ index += diff > 0 ? 1 : -1; update(); }
    }, {passive:true});
    update();
  }

  function initBasicPopup(){
    var openBtn = document.getElementById('dmOpenBasicPopup');
    var popup = document.getElementById('dmBasicPopup');
    var closeBtn = document.getElementById('dmCloseBasicPopup');
    if(!openBtn || !popup) return;

    function openPopup(e){
      if(e) e.preventDefault();
      popup.classList.add('dm-open');
      popup.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function closePopup(){
      popup.classList.remove('dm-open');
      popup.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', openPopup);
    if(closeBtn) closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function(e){ if(e.target === popup) closePopup(); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && popup.classList.contains('dm-open')) closePopup();
    });
  }

  function initFAQ(){
    var items = document.querySelectorAll('.dm-faq-item');
    if(!items.length) return;
    items.forEach(function(item){
      var btn = item.querySelector('.dm-faq-question');
      if(!btn) return;
      btn.addEventListener('click', function(){
        var isOpen = item.classList.contains('dm-open');
        items.forEach(function(i){ i.classList.remove('dm-open'); });
        if(!isOpen) item.classList.add('dm-open');
      });
    });
  }

  function initSaleToast(){
    var toast = document.getElementById('dmSaleToast');
    if(!toast) return;
    var nameEl = document.getElementById('dmSaleName');
    var cityEl = document.getElementById('dmSaleCity');
    if(!nameEl || !cityEl) return;
    var sales = [
      ['Camila Pires','Manaus, AM'],
      ['Rafael Souza','Curitiba, PR'],
      ['Beatriz Nogueira','Goiânia, GO'],
      ['Carlos Mendes','São Paulo, SP'],
      ['Ana Paula Lima','Belo Horizonte, MG'],
      ['Marcos Ferreira','Porto Alegre, RS'],
      ['Fernanda Costa','Fortaleza, CE'],
      ['Lucas Oliveira','Recife, PE'],
      ['Juliana Santos','Salvador, BA'],
      ['Diego Alves','Brasília, DF']
    ];
    var i = 0;
    function showSale(){
      var sale = sales[i % sales.length];
      i++;
      nameEl.textContent = sale[0];
      cityEl.textContent = sale[1];
      toast.classList.add('dm-show');
      setTimeout(function(){ toast.classList.remove('dm-show'); }, 4500);
    }
    setTimeout(function(){
      showSale();
      setInterval(showSale, 9000);
    }, 2500);
  }
})();
