document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    const path = window.location.pathname;
    let prefix = "";

    if (path.includes("/blog") || path.includes("/branding") || path.includes("/packaging")) {
        prefix = "../../";
    }

    const headerHTML = `
      <div class="menu-overlay"></div>

      <div class="col left">
        <button class="menu-toggle" aria-label="Abrir menú">
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
        </button>
        <a href="${prefix}contacto/" class="btn-accent header-cta-desktop">Agendar Cita</a>
      </div>

      <div class="col center">
        <a href="${prefix}" class="logo-link">
          <img src="${prefix}img/logo.webp" alt="Borealis" class="logo-normal">
          <img src="${prefix}img/logo2.webp" alt="Borealis" class="logo-scrolled">
        </a>
      </div>

      <div class="col right">
        <a href="https://www.facebook.com/borealis.com.ve">
          <img src="${prefix}img/fb.webp" alt="Facebook Borealis" class="social-media-icon">
        </a>
        <a href="https://www.instagram.com/borealis.oficial">
          <img src="${prefix}img/insta.webp" alt="Instagram Borealis" class="social-media-icon">
        </a>
        <a href="https://www.linkedin.com/company/borealis-creadores-de-ideas/">
          <img src="${prefix}img/in.webp" alt="LinkedIn Borealis" class="social-media-icon">
        </a>
        <a href="${prefix}contacto/" class="btn-accent header-cta-mobile">Agendar Cita</a>
      </div>

      <nav class="mega-menu">
        <div class="mega-menu-content">
            <div class="main-links-col">
                <span class="mega-col-title">Borealis</span>
                <a href="${prefix}inicio/" class="mega-nav-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Inicio
                </a>
                <a href="${prefix}nosotros/" class="mega-nav-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Nosotros
                </a>
                <a href="${prefix}blog/" class="mega-nav-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                    Blog
                </a>
                <a href="${prefix}contacto/" class="mega-nav-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"/><polyline points="3 7 12 13 21 7"/></svg>
                    Contacto
                </a>
                <a href="${prefix}gestion/" class="mega-nav-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    Gestión
                </a>
            </div>

            <div class="portfolio-dashboard-col">
                <span class="mega-col-title">Portafolio Creativo</span>
                <div class="portfolio-grid">
                    <a href="${prefix}inicio/#branding" class="portfolio-card">
                        <div class="portfolio-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
                        <div class="portfolio-text"><h4>Branding</h4><p>Creación y diseño de identidad de marca</p></div>
                    </a>
                    <a href="${prefix}soluciones-audiovisuales/" class="portfolio-card">
                        <div class="portfolio-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg></div>
                        <div class="portfolio-text"><h4>Videos</h4><p>Producción y edición audiovisual</p></div>
                    </a>
                    <a href="${prefix}flyers/" class="portfolio-card">
                        <div class="portfolio-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                        <div class="portfolio-text"><h4>Flyers</h4><p>Diseño de material publicitario visual</p></div>
                    </a>
                    <a href="${prefix}social-media/" class="portfolio-card">
                        <div class="portfolio-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
                        <div class="portfolio-text"><h4>Social Media</h4><p>Gestión y contenido para redes sociales</p></div>
                    </a>
                    <a href="${prefix}soluciones-creativas/" class="portfolio-card">
                        <div class="portfolio-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
                        <div class="portfolio-text"><h4>Soluciones Creativas</h4><p>Estrategias y conceptos fuera de la caja</p></div>
                    </a>
                    <a href="${prefix}portafolio-web/" class="portfolio-card">
                        <div class="portfolio-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>
                        <div class="portfolio-text"><h4>Diseño Web</h4><p>Desarrollo de sitios web y tiendas online</p></div>
                    </a>
                </div>
            </div>

            <div class="mobile-only-cta-wrapper">
                <a href="${prefix}contacto/" class="btn-accent mobile-only-cta">Agendar Cita</a>
            </div>
        </div>
      </nav>
    `;

  header.innerHTML = headerHTML;

  const menuToggle = header.querySelector('.menu-toggle');
  const overlay = header.querySelector('.menu-overlay');
  
  function toggleMenu() {
    header.classList.toggle('menu-open');
    document.body.style.overflow = header.classList.contains('menu-open') ? 'hidden' : '';
  }

  if(menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if(overlay) overlay.addEventListener('click', toggleMenu);

  const navLinks = header.querySelectorAll('.mega-nav-link, .portfolio-card, .btn-accent');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (header.classList.contains('menu-open')) toggleMenu();
      if (link.hash && document.querySelector(link.hash)) {
        e.preventDefault();
        document.querySelector(link.hash).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  addModernHeaderEffects();
});

function addModernHeaderEffects() {
  const header = document.querySelector("header");
  if (!header) return;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const windowH = window.innerHeight;
        if (currentScrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
        const maxScroll = document.documentElement.scrollHeight - windowH;
        if (currentScrollY >= (maxScroll - 50) && currentScrollY > 200) header.classList.add("header-hidden");
        else header.classList.remove("header-hidden");
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}