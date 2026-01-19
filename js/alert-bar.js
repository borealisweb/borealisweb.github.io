document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("alerta-bar");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  
  if (!bar || !footer) {
    console.log("⚠️ No se encontró la barra de alerta o el footer");
    return;
  }
  
  console.log("Configurando efecto de desaparición de la barra de alerta...");
  

  bar.style.transition = "transform 0.1s ease, opacity 0.1s ease, top 0.4s ease";
  bar.style.willChange = "transform, opacity, top";
  
  function updateBarOnScroll() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const footerRect = footer.getBoundingClientRect();
    const footerStartHide = 200;
    
    let hideProgress = 0;
    
    if (footerRect.top < windowH + footerStartHide) {
      hideProgress = 1 - ((footerRect.top + footerStartHide) / (windowH + footerStartHide));
      hideProgress = Math.max(0, Math.min(1, hideProgress));
    }
    
    if (hideProgress > 0) {
    
      const moveUp = 500 * hideProgress;
      bar.style.transform = `translateY(-${moveUp}px)`;
      bar.style.opacity = 1 - (hideProgress * 0.8);
    } else if (scrollY > 20) {
     
      bar.style.transform = "translateY(0)";
      bar.style.opacity = "1";
      bar.style.top = "var(--header-height)";
    } else {
   
      bar.style.transform = "translateY(0)";
      bar.style.opacity = "1";
      bar.style.top = "calc(var(--header-height) * -1)";
    }
  }
  

  window.addEventListener("scroll", updateBarOnScroll);
  

  updateBarOnScroll();
});
