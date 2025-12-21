document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  const path = window.location.pathname;
  let prefix = "";

  if (path.includes("/blog") || path.includes("/contacto")  || path.includes("/briefing")  || path.includes("/branding") || path.includes("/packaging") || path.includes("/soluciones-audiovisuales") || path.includes("/rrss") || path.includes("/flyers") || path.includes("/soluciones-creativas")  || path.includes("/aviso-legal")  || path.includes("/politica-de-privacidad")  || path.includes("/terminos-y-condiciones")) {
    prefix = "../";
  }

  const headerHTML = `
    <div class="col left">
      <button class="menu-toggle" aria-label="Abrir menú">☰</button>
      <nav class="menu-links">
        <a href="${prefix}">Inicio</a>
        <a href="${prefix}#portafolio" class="smooth-scroll">Portafolio</a>
        <a href="${prefix}soluciones-audiovisuales">Videos</a>
        <a href="${prefix}blog/">Blog</a>
        <a href="${prefix}contacto/" target="_blank">
          <button class="btn-accent mobile-only">Agendar Cita</button>
        </a>
      </nav>
    </div>

    <div class="col center">
      <a href="${prefix}index.html" class="logo-link">
        <img src="${prefix}img/logo.webp" alt="Borealis" class="logo-normal">
        <img src="${prefix}img/logo2.webp" alt="Borealis" class="logo-scrolled">
      </a>
    </div>

    <div class="col right">
      <a href="${prefix}contacto/" class="btn-accent">Agendar Cita</a>
      <a href="https://instagram.com/borealis.oficial" target="_blank">
        <img src="${prefix}img/insta.webp" alt="Instagram Borealis" class="ig-icon">
      </a>
    </div>
  `;

  header.innerHTML = headerHTML;

  const menuToggle = header.querySelector('.menu-toggle');
  const menuLinks = header.querySelector('.menu-links');

  menuToggle.addEventListener('click', () => {
    header.classList.toggle('menu-open');
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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
