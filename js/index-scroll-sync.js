document.addEventListener('DOMContentLoaded', function() {
  const home = document.querySelector('.home-section');
  const briefing = document.querySelector('.briefing-section');
  if (!home || !briefing) return;

  function syncHomeWithScroll() {
    const y = Math.min(window.scrollY, window.innerHeight);
    home.style.transform = `translateY(${-y}px)`;

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
  }

  syncHomeWithScroll();
  window.addEventListener('scroll', syncHomeWithScroll, { passive: true });
  window.addEventListener('resize', syncHomeWithScroll);
});
