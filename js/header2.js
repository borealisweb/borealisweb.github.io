  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    const path = window.location.pathname;
    let prefix = "";

    if (path.includes("/blog") || path.includes("/branding") || path.includes("/packaging")) {
        prefix = "../../";
      }

    const headerHTML = `
      <div class="col left">
      <button class="menu-toggle" aria-label="Abrir menú">☰</button>
      <nav class="menu-links">
        <a href="${prefix}inicio/">Inicio</a>
        <div class="portfolio-dropdown">
          <button class="portfolio-toggle" aria-label="Toggle portafolio menu">Portafolio</button>
          <div class="portfolio-submenu">
            <a href="${prefix}inicio/#branding">Branding</a>
            <a href="${prefix}soluciones-audiovisuales/">Videos</a>
            <a href="${prefix}flyers/">Flyers</a>
            <a href="${prefix}social-media/">Social Media</a>
            <a href="${prefix}soluciones-creativas/">Soluciones Creativas</a>
            <a href="${prefix}inicio/#packaging">Packaging</a>
            <a href="${prefix}portafolio-web/">Diseño Web</a>
          </div>
        </div>
        <a href="${prefix}nosotros/">Nosotros</a>
        <a href="${prefix}blog/">Blog</a>
        <span class="mobile-portfolio-title"><b>Portafolio ▼</b></span>

        <div class="mobile-portfolio-section">
          <a href="${prefix}inicio/#branding" class="mobile-portfolio-link">Branding</a>
          <a href="${prefix}soluciones-audiovisuales/" class="mobile-portfolio-link">Videos</a>
          <a href="${prefix}flyers/" class="mobile-portfolio-link">Flyers</a>
          <a href="${prefix}social-media/" class="mobile-portfolio-link">Social Media</a>
          <a href="${prefix}soluciones-creativas/" class="mobile-portfolio-link">Soluciones Creativas</a>
          <a href="${prefix}inicio/#packaging" class="mobile-portfolio-link">Packaging</a>
          <a href="${prefix}portafolio-web/" class="mobile-portfolio-link">Diseño Web</a>
        </div>
        <a href="${prefix}contacto/">
        <button class="btn-accent mobile-only">Agendar Cita</button>
        </a>
      </nav>
    </div>

      <div class="col center">
        <a href="${prefix}" class="logo-link">
          <img src="${prefix}img/logo.webp" alt="Borealis" class="logo-normal">
          <img src="${prefix}img/logo2.webp" alt="Borealis" class="logo-scrolled">
        </a>
      </div>

       <div class="col right">
      <a href="${prefix}contacto/" class="btn-accent">Agendar Cita</a>

      <a href="https://www.facebook.com/borealis.com.ve" target="_blank">
        <img src="${prefix}img/fb.webp" alt="Facebook Borealis" class="social-media-icon">
      </a>

      <a href="https://instagram.com/borealis.oficial" target="_blank">
        <img src="${prefix}img/insta.webp" alt="Instagram Borealis" class="social-media-icon">
      </a>
    </div>
    `;

  header.innerHTML = headerHTML;


  const menuToggle = header.querySelector('.menu-toggle');
  const menuLinks = header.querySelector('.menu-links');

  menuToggle.addEventListener('click', () => {
    header.classList.toggle('menu-open');
  });

  const portfolioToggle = header.querySelector('.portfolio-toggle');
  const portfolioSubmenu = header.querySelector('.portfolio-submenu');

  portfolioToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    header.classList.toggle('portfolio-open');
  });

  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      header.classList.remove('portfolio-open');
    }
  });

  menuLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      header.classList.remove('menu-open');

      if (link.hash && document.querySelector(link.hash)) {
        e.preventDefault();
        document.querySelector(link.hash).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  addHeaderHideEffect();

});

function addHeaderHideEffect() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (!footer) {
    console.log("No se encontró footer. El header no desaparecerá al final.");

    setupHeaderHideWithDocumentEnd(header);
    return;
  }

  console.log("Configurando efecto de desaparición del header...");

  header.style.transition = "transform 0.1s ease, opacity 0.1s ease, background 0.5s ease";
  header.style.willChange = "transform, opacity";

  let isHiding = false;

  function updateHeaderOnScroll() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    if (scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    const footerRect = footer.getBoundingClientRect();

    const footerStartHide = 200;

    let hideProgress = 0;

    if (footerRect.top < windowH + footerStartHide) {

      hideProgress = 1 - ((footerRect.top + footerStartHide) / (windowH + footerStartHide));
      hideProgress = Math.max(0, Math.min(1, hideProgress));
    }

    if (hideProgress > 0) {
      isHiding = true;

      const moveUp = 500 * hideProgress;
      const opacity = 1 - (hideProgress * 0.8);

      header.style.transform = `translateY(-${moveUp}px)`;
      header.style.opacity = opacity.toString();


      header.style.pointerEvents = hideProgress > 0.7 ? "none" : "auto";

    } else {

      if (isHiding) {
        isHiding = false;
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      }
    }
  }


  let ticking = false;
  let resizeTimeout;
  
  function throttledUpdateHeader() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeaderOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener("scroll", throttledUpdateHeader, { passive: true });
  
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(throttledUpdateHeader, 150);
  });
  
  updateHeaderOnScroll();
}

function setupHeaderHideWithDocumentEnd(header) {
  console.log("Usando final del documento como referencia...");

  header.style.transition = "transform 0.4s ease, opacity 0.4s ease, background 0.5s ease";

  let ticking = false;
  let resizeTimeout;
  
  function updateHeader() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const documentH = document.documentElement.scrollHeight;

    if (scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    const distanceFromBottom = documentH - (scrollY + windowH);
    const hideThreshold = 400; 

    if (distanceFromBottom < hideThreshold) {
      const hideProgress = 1 - (distanceFromBottom / hideThreshold);

      const moveUp = 50 * hideProgress;
      const opacity = 1 - (hideProgress * 0.7);

      header.style.transform = `translateY(-${moveUp}px)`;
      header.style.opacity = opacity.toString();
    } else {
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";
    }
  }
  
  function throttledUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener("scroll", throttledUpdate, { passive: true });
  
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(throttledUpdate, 150);
  });
  
  updateHeader();
}
