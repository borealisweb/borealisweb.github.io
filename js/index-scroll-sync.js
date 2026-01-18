document.addEventListener('DOMContentLoaded', function() {
  const home = document.querySelector('.home-section');
  const briefing = document.querySelector('.briefing-section');
  if (!home || !briefing) return;

  let ticking = false;
  let lastScrollY = 0;
  let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function syncHomeWithScroll() {
    const y = Math.min(window.scrollY, window.innerHeight);
    
 
    if (isTouchDevice) {
      home.style.transform = `translate3d(0, ${-y}px, 0)`;
      home.style.willChange = 'transform';
    } else {
      home.style.transform = `translateY(${-y}px)`;
    }

    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      if (y > 10) {
        indicator.classList.add('hidden');
      } else {
        indicator.classList.remove('hidden');
      }
    }

    if (y >= window.innerHeight - 1) {
      home.style.pointerEvents = 'none';
      if (indicator) {
        indicator.classList.add('hidden');
      }
    } else {
      home.style.pointerEvents = 'auto';
    }

    lastScrollY = window.scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(syncHomeWithScroll);
      ticking = true;
    }
  }

 
  function scrollHandler() {
   
    if (isTouchDevice && Math.abs(window.scrollY - lastScrollY) < 1) {
      return;
    }
    requestTick();
  }

  syncHomeWithScroll();
  
  
  window.addEventListener('scroll', scrollHandler, { passive: true });
  window.addEventListener('resize', syncHomeWithScroll);
  
 
  if (isTouchDevice) {

    document.body.style.touchAction = 'pan-y';
    
   
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        home.style.willChange = 'auto';
      }, 150);
    }, { passive: true });
  }
});
