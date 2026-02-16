document.addEventListener('DOMContentLoaded', function() {
  const home = document.querySelector('.home-section');
  const indicator = document.querySelector('.scroll-indicator');
  
  if (!home) return;

  let ticking = false;
  let lastScrollY = 0;
  let indicatorHidden = false;
  let pointerEventsDisabled = false;

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;
        
        // Solo actualizar si el scroll cambió significativamente
        if (Math.abs(scrollY - lastScrollY) > 2) {
          lastScrollY = scrollY;
          
          // Parallax effect
          if (scrollY <= maxScroll) {
            home.style.transform = `translate3d(0, ${-scrollY}px, 0)`;
          }
          
          // Indicator visibility (solo cuando cambia de estado)
          if (indicator) {
            const shouldHide = scrollY > 100;
            if (shouldHide !== indicatorHidden) {
              indicatorHidden = shouldHide;
              indicator.classList.toggle('hidden', shouldHide);
            }
          }
          
          // Pointer events (solo cuando cambia de estado)
          const shouldDisable = scrollY >= maxScroll - 1;
          if (shouldDisable !== pointerEventsDisabled) {
            pointerEventsDisabled = shouldDisable;
            home.style.pointerEvents = shouldDisable ? 'none' : 'auto';
          }
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  handleScroll();
});
