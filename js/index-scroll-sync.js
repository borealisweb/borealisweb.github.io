document.addEventListener('DOMContentLoaded', function() {
  const home = document.querySelector('.home-section');
  const indicator = document.querySelector('.scroll-indicator');
  
  if (!home) return;

  let ticking = false;
  let currentScrollY = 0;

  function updateScroll() {
    if (currentScrollY <= window.innerHeight) {
      home.style.transform = `translateY(${-currentScrollY}px)`;
    }
    
    if (indicator) {
      if (currentScrollY > 100) {
        indicator.classList.add('hidden');
      } else {
        indicator.classList.remove('hidden');
      }
    }
    
    if (currentScrollY >= window.innerHeight - 1) {
      home.style.pointerEvents = 'none';
    } else {
      home.style.pointerEvents = 'auto';
    }
    
    ticking = false;
  }

  function handleScroll() {
    currentScrollY = window.scrollY;
    
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  handleScroll();
});
