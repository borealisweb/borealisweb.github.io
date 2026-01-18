document.addEventListener('DOMContentLoaded', function() {
  const home = document.querySelector('.home-section');
  const indicator = document.querySelector('.scroll-indicator');
  
  if (!home) return;

  function handleScroll() {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    
    if (scrollY <= maxScroll) {
      home.style.transform = `translateY(${-scrollY}px)`;
    }
    
    if (indicator) {
      if (scrollY > 100) {
        indicator.classList.add('hidden');
      } else {
        indicator.classList.remove('hidden');
      }
    }
    
    if (scrollY >= maxScroll - 1) {
      home.style.pointerEvents = 'none';
    } else {
      home.style.pointerEvents = 'auto';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  handleScroll();
});
