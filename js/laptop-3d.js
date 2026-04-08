
(function () {
  'use strict';

  const canvas = document.getElementById('laptop-canvas');
  if (!canvas || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const context = canvas.getContext('2d');

  
  const frameCount = 71; 
  const startFrame = 0;
  const currentFrame = index => (
    `../img/laptop/frame_${(index + startFrame).toString().padStart(6, '0')}.webp`
  );

  const images = [];
  const laptop = {
    frame: 0
  };

  
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  
  
  
  
  ScrollTrigger.create({
    trigger: ".webs-portafolio",
    start: "center center", 
    end: "+=100%",          
    pin: true
  });

  
  
  
  
  gsap.to(laptop, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: ".webs-portafolio",
      start: "top 65%", 
      end: "+=100%",    
      scrub: 1
    },
    onUpdate: render 
  });

  images[0].onload = render;

  function render() {
    const img = images[Math.round(laptop.frame)];
    if (img && img.complete) {
      
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;

      
      let scale = Math.min(canvas.width / img.width, canvas.height / img.height);

      
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        scale *= 0.95; 
      }

      const x = (canvas.width / 2) - (img.width / 2) * scale;
      let y = (canvas.height / 2) - (img.height / 2) * scale;

      if (isMobile) {
        
        y -= 25 * window.devicePixelRatio;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }

  
  window.addEventListener('resize', render);

})();