document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const footer = document.createElement("footer");
  const path = window.location.pathname;
  let prefix = "";

  if (path.includes("/blog") || path.includes("/branding") || path.includes("/packaging")) {
    prefix = "../../";
  }

  footer.id = "site-footer";

  footer.innerHTML = `
    <div class="footer-top">
      <div class="footer-left">
        <a href="${prefix}index.html">
          <img src="${prefix}img/logo3.webp" alt="Borealis" class="footer-logo">
        </a>
        <div class="footer-icons-2">
          <a href="https://instagram.com/borealis.oficial" target="_blank">
            <img src="${prefix}img/insta.webp" alt="Instagram" class="ig-icon">
          </a>
          <button class="scroll-top">↑</button>
        </div>
      </div>

      <div class="footer-right">
        <nav class="footer-menu">
          <a href="${prefix}">Inicio</a>
          <a href="${prefix}#portafolio">Portafolio</a>
          <a href="${prefix}soluciones-audiovisuales/">Videos</a>
          <a href="${prefix}blog/">Blog</a>
          <a href="${prefix}acerca-de-mi/">Acerca de Mí</a>
          <a href="${prefix}contacto/">Contacto</a>
          <a href="${prefix}terminos-y-condiciones/">Términos y Condiciones</a>
          <a href="${prefix}politica-de-privacidad/">Política de Privacidad</a>
          <a href="${prefix}aviso-legal/">Aviso Legal</a>
        </nav>
        <div class="footer-icons">
          <a href="https://instagram.com/borealis.oficial" target="_blank">
            <img src="${prefix}img/insta.webp" alt="Instagram" class="ig-icon">
          </a>
          <button class="scroll-top">↑</button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-line"></div>
      <p class="footer-copy"><b>©${new Date().getFullYear()}</b> Diseñado por Ángel J. Gómez H.</p>
    </div>
  `;

  body.appendChild(footer);

  footer.querySelectorAll(".scroll-top").forEach(btn => {
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  const header = document.querySelector("header");

  function smoothScroll(targetEl) {
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }

  document.querySelectorAll('footer a[href], header a[href]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const urlParts = href.split("#");
      const targetHash = urlParts[1];

      if (targetHash) {
        if (!urlParts[0] || urlParts[0] === window.location.pathname.split("/").pop()) {
          e.preventDefault();
          const targetEl = document.getElementById(targetHash);
          if (targetEl) smoothScroll(targetEl);
        } else {
          localStorage.setItem("scrollToHash", targetHash);
        }
      }

      if (header) header.classList.remove('menu-open');
    });
  });

  const scrollToHash = localStorage.getItem("scrollToHash");
  if (scrollToHash) {
    const targetEl = document.getElementById(scrollToHash);
    if (targetEl) smoothScroll(targetEl);
    localStorage.removeItem("scrollToHash");
  }
});
