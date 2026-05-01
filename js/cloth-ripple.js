document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector('.portfolio-section.packaging');
  const wrappers = document.querySelectorAll('.blob-wrapper');

  if (!section || wrappers.length === 0) return;

  
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  section.addEventListener("mousemove", (e) => {
    const rect = section.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    
    
    targetX = x * 150; 
    targetY = y * 150;
  });

  section.addEventListener("mouseleave", () => {
    
    targetX = 0;
    targetY = 0;
  });

  function animateCloth() {
    
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    wrappers.forEach((wrapper, index) => {
      
      
      const multX = (index % 2 === 0 ? 1 : -0.8) * (1 + index * 0.3);
      const multY = (index === 1 ? -1 : 0.9) * (1 + index * 0.2);
      
      const perspectiveScale = 1 + (Math.abs(currentX) * 0.0005);
      
      wrapper.style.transform = `translate3d(${currentX * multX}px, ${currentY * multY}px, 0) scale(${perspectiveScale})`;
    });

    requestAnimationFrame(animateCloth);
  }

  animateCloth();
});
