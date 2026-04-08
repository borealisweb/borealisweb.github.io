document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector('.jobs-horizontal-section');
  const track = document.querySelector('.jobs-horizontal-track');
  const stickyContainer = document.querySelector('.jobs-sticky-container');
  const cards = document.querySelectorAll('.jobs-card');

  if (!section || !track || cards.length === 0) return;

  let targetScrollY = window.scrollY;
  let currentScrollY = window.scrollY;
  const LERP_FACTOR = 0.05;

  
  
  const requiredHeight = ((cards.length) * 100 + 150) + 'vh';

  function resizeUpdate() {
    
    section.style.height = requiredHeight;
    const containerWidth = stickyContainer.offsetWidth;
    cards.forEach(card => card.style.width = `${containerWidth}px`);
  }

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', resizeUpdate);

  function animLoop() {
    
    currentScrollY += (targetScrollY - currentScrollY) * LERP_FACTOR;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const containerWidth = stickyContainer.offsetWidth;

    
    const scrollableDistance = sectionHeight - windowHeight;
    let relativeScroll = currentScrollY - sectionTop;

    if (relativeScroll < 0) relativeScroll = 0;
    if (relativeScroll > scrollableDistance) relativeScroll = scrollableDistance;

    
    const animScrollDistance = (cards.length) * windowHeight;
    let percentage = animScrollDistance > 0 ? relativeScroll / animScrollDistance : 0;

    
    if (percentage > 1.0) percentage = 1.0;
    
    if (percentage > 0.999) percentage = 1.0;

    const trackTranslateWidth = track.scrollWidth - containerWidth;
    const targetX = -(percentage * trackTranslateWidth);

    track.style.transform = `translateX(${targetX}px)`;

    cards.forEach((card, index) => {
      const cardLeftPos = index * containerWidth;
      const distanceToCenter = Math.abs(cardLeftPos + targetX);

      
      let progress = distanceToCenter / containerWidth;

      
      if (progress < 0.001) progress = 0;
      if (progress > 1.2) progress = 1.2;

      const visibility = 1 - Math.min(progress, 1);

      
      const opacity = visibility === 1 ? 1 : Math.pow(visibility, 1.2);
      
      const scale = 0.60 + (0.40 * visibility);

      card.style.opacity = opacity.toFixed(4);
      card.style.transform = `scale(${scale.toFixed(4)})`;
    });

    
    requestAnimationFrame(animLoop);
  }

  
  resizeUpdate();
  requestAnimationFrame(animLoop);
  setTimeout(resizeUpdate, 100);
});
