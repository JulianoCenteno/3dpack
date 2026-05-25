
(() => {

  const el = document.getElementById("dm-count");
  if (!el) return;

  const KEY = "pack3d_offer_timer";

  let endTime = sessionStorage.getItem(KEY);

  if (!endTime) {
    endTime = Date.now() + (15 * 60 + 5) * 1000;
    sessionStorage.setItem(KEY, endTime);
  }

  endTime = Number(endTime);

  const updateTimer = () => {

    const remaining =
      Math.max(0, endTime - Date.now());

    const minutes =
      Math.floor(remaining / 60000);

    const seconds =
      Math.floor((remaining % 60000) / 1000);

    el.textContent =
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");

    if (remaining <= 0) {
      clearInterval(timer);
    }
  };

  updateTimer();

  const timer =
    setInterval(updateTimer, 1000);

})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(!items.length)return;

  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){
      el.classList.add("dm-visible");
    });
    return;
  }

  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("dm-visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold:.14,
    rootMargin:"0px 0px -35px 0px"
  });

  items.forEach(function(el){
    observer.observe(el);
  });
})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(!items.length)return;

  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){
      el.classList.add("dm-visible");
    });
    return;
  }

  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("dm-visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold:.14,
    rootMargin:"0px 0px -35px 0px"
  });

  items.forEach(function(el){
    observer.observe(el);
  });
})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(!items.length)return;

  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){
      el.classList.add("dm-visible");
    });
    return;
  }

  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("dm-visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold:.14,
    rootMargin:"0px 0px -35px 0px"
  });

  items.forEach(function(el){
    observer.observe(el);
  });
})();



(function(){
  function revealInit(){
    var items=document.querySelectorAll(".dm-reveal");
    if(!items.length)return;

    if(!("IntersectionObserver" in window)){
      items.forEach(function(el){el.classList.add("dm-visible")});
      return;
    }

    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("dm-visible");
          observer.unobserve(entry.target);
        }
      });
    },{
      threshold:.14,
      rootMargin:"0px 0px -35px 0px"
    });

    items.forEach(function(el){observer.observe(el)});
  }

  function catCarouselInit(){
    var carousel=document.getElementById("dmCatCarousel");
    var track=document.getElementById("dmCatTrack");
    if(!carousel || !track)return;

    var prev=carousel.querySelector(".dm-cat-prev");
    var next=carousel.querySelector(".dm-cat-next");
    var slides=track.querySelectorAll(".dm-cat-slide");
    var index=0;
    var perView=2;
    var max=Math.max(0,slides.length-perView);
    var startX=0;

    function update(){
      max=Math.max(0,slides.length-perView);
      if(index<0)index=0;
      if(index>max)index=max;

      var move=index*(100/perView);
      track.style.transform="translateX(-"+move+"%)";

      if(prev)prev.disabled=index===0;
      if(next)next.disabled=index===max;
    }

    if(prev){
      prev.addEventListener("click",function(){
        index--;
        update();
      });
    }

    if(next){
      next.addEventListener("click",function(){
        index++;
        update();
      });
    }

    track.addEventListener("touchstart",function(e){
      startX=e.touches[0].clientX;
    },{passive:true});

    track.addEventListener("touchend",function(e){
      var diff=startX-e.changedTouches[0].clientX;
      if(Math.abs(diff)>35){
        index += diff>0 ? 1 : -1;
        update();
      }
    },{passive:true});

    update();
  }

  revealInit();

  if("requestIdleCallback" in window){
    requestIdleCallback(catCarouselInit,{timeout:900});
  }else{
    setTimeout(catCarouselInit,300);
  }
})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(!items.length)return;

  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){
      el.classList.add("dm-visible");
    });
    return;
  }

  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("dm-visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold:.14,
    rootMargin:"0px 0px -35px 0px"
  });

  items.forEach(function(el){
    observer.observe(el);
  });
})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(!items.length)return;
  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){el.classList.add("dm-visible")});
    return;
  }
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("dm-visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:"0px 0px -35px 0px"});
  items.forEach(function(el){observer.observe(el)});
})();



(function(){

  /* REVEAL */
  var revealItems=document.querySelectorAll(".dm-reveal");

  if("IntersectionObserver" in window){

    var revealObserver=
    new IntersectionObserver(function(entries){

      entries.forEach(function(entry){

        if(entry.isIntersecting){

          entry.target.classList.add("dm-visible");
          revealObserver.unobserve(entry.target);

        }

      });

    },{
      threshold:.14,
      rootMargin:"0px 0px -35px 0px"
    });

    revealItems.forEach(function(el){
      revealObserver.observe(el);
    });

  }else{
    revealItems.forEach(function(el){
      el.classList.add("dm-visible");
    });
  }

  /* CAROUSEL */
  var carousel=
  document.getElementById("dmProofCarousel");

  if(!carousel)return;

  var track=
  document.getElementById("dmProofTrack");

  var slides=
  track.querySelectorAll(".dm-proof-slide");

  var prev=
  carousel.querySelector(".dm-proof-prev");

  var next=
  carousel.querySelector(".dm-proof-next");

  var index=0;
  var startX=0;

  function update(){

    track.style.transform=
      "translateX(-"+(index*100)+"%)";

    prev.disabled=index===0;
    next.disabled=index===slides.length-1;
  }

  prev.addEventListener("click",function(){

    if(index>0){
      index--;
      update();
    }

  });

  next.addEventListener("click",function(){

    if(index<slides.length-1){
      index++;
      update();
    }

  });

  track.addEventListener("touchstart",function(e){

    startX=e.touches[0].clientX;

  },{passive:true});

  track.addEventListener("touchend",function(e){

    var diff=
      startX-e.changedTouches[0].clientX;

    if(Math.abs(diff)>35){

      index += diff>0 ? 1 : -1;

      if(index<0)index=0;
      if(index>slides.length-1)
      index=slides.length-1;

      update();
    }

  },{passive:true});

  update();

})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(items.length){
    if(!("IntersectionObserver" in window)){
      items.forEach(function(el){el.classList.add("dm-visible")});
    }else{
      var observer=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add("dm-visible");
            observer.unobserve(entry.target);
          }
        });
      },{threshold:.14,rootMargin:"0px 0px -35px 0px"});
      items.forEach(function(el){observer.observe(el)});
    }
  }

  var openBtn=document.getElementById("dmOpenBasicPopup");
  var popup=document.getElementById("dmBasicPopup");
  var closeBtn=document.getElementById("dmCloseBasicPopup");

  if(!openBtn || !popup)return;

  function openPopup(e){
    if(e)e.preventDefault();
    popup.classList.add("dm-open");
    popup.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  }

  function closePopup(){
    popup.classList.remove("dm-open");
    popup.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  }

  openBtn.addEventListener("click",openPopup);
  if(closeBtn)closeBtn.addEventListener("click",closePopup);

  popup.addEventListener("click",function(e){
    if(e.target===popup)closePopup();
  });

  document.addEventListener("keydown",function(e){
    if(e.key==="Escape" && popup.classList.contains("dm-open"))closePopup();
  });
})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(!items.length)return;

  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){
      el.classList.add("dm-visible");
    });
    return;
  }

  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("dm-visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold:.14,
    rootMargin:"0px 0px -35px 0px"
  });

  items.forEach(function(el){
    observer.observe(el);
  });
})();



(function(){

  var revealItems=document.querySelectorAll(".dm-reveal");

  if("IntersectionObserver" in window){

    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("dm-visible");
          observer.unobserve(entry.target);
        }
      });
    },{
      threshold:.14,
      rootMargin:"0px 0px -35px 0px"
    });

    revealItems.forEach(function(el){
      observer.observe(el);
    });

  }else{
    revealItems.forEach(function(el){
      el.classList.add("dm-visible");
    });
  }

  var items=document.querySelectorAll(".dm-faq-item");

  items.forEach(function(item){
    var btn=item.querySelector(".dm-faq-question");

    if(!btn)return;

    btn.addEventListener("click",function(){

      var isOpen=item.classList.contains("dm-open");

      items.forEach(function(i){
        i.classList.remove("dm-open");
      });

      if(!isOpen){
        item.classList.add("dm-open");
      }

    });
  });

})();



(function(){
  var items=document.querySelectorAll(".dm-reveal");
  if(!items.length)return;

  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){
      el.classList.add("dm-visible");
    });
    return;
  }

  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("dm-visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold:.14,
    rootMargin:"0px 0px -35px 0px"
  });

  items.forEach(function(el){
    observer.observe(el);
  });
})();



(function(){
  var toast=document.getElementById("dmSaleToast");
  if(!toast)return;

  var nameEl=document.getElementById("dmSaleName");
  var cityEl=document.getElementById("dmSaleCity");

  var sales=[
    ["Camila Pires","Manaus, AM"],
    ["Rafael Souza","Curitiba, PR"],
    ["Beatriz Nogueira","Goiânia, GO"],
    ["Carlos Mendes","São Paulo, SP"],
    ["Ana Paula Lima","Belo Horizonte, MG"],
    ["Marcos Ferreira","Porto Alegre, RS"],
    ["Fernanda Costa","Fortaleza, CE"],
    ["Lucas Oliveira","Recife, PE"],
    ["Juliana Santos","Salvador, BA"],
    ["Diego Alves","Brasília, DF"]
  ];

  var i=0;

  function showSale(){
    var sale=sales[i%sales.length];
    i++;

    nameEl.textContent=sale[0];
    cityEl.textContent=sale[1];

    toast.classList.add("dm-show");

    setTimeout(function(){
      toast.classList.remove("dm-show");
    },4500);
  }

  setTimeout(function(){
    showSale();
    setInterval(showSale,9000);
  },2500);
})();
