document.addEventListener("DOMContentLoaded", () => {
  const whatsappHTML = `
    <div class="whatsapp-float-container">
      <a href="https://wa.me/+584143571705" target="_blank" rel="noopener noreferrer" class="whatsapp-float">
        <span class="whatsapp-bubble">Contacto Directo</span>
        <div class="whatsapp-icon-wrapper">
          <img src="../img/whatsapp.webp" alt="WhatsApp" class="whatsapp-icon"
               onerror="this.onerror=null; this.src='../../img/whatsapp.webp';">
          <button class="whatsapp-close" aria-label="Cerrar">×</button>
        </div>
      </a>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', whatsappHTML);

  const img = document.querySelector('.whatsapp-icon');

  if (img) {
    img.onerror = function() {
      const fallbackPaths = [
        '../../img/whatsapp.webp',
        '../img/whatsapp.webp',
        '/img/whatsapp.webp',
        'img/whatsapp.webp',
        './img/whatsapp.webp'
      ];

      let currentIndex = 0;

      function tryNextFallback() {
        if (currentIndex < fallbackPaths.length) {
          this.src = fallbackPaths[currentIndex];
          currentIndex++;

          if (currentIndex < fallbackPaths.length) {
            this.onerror = tryNextFallback;
          } else {
            this.onerror = null;
          }
        }
      }

      tryNextFallback.call(this);
    };
  }

  const closeBtn = document.querySelector('.whatsapp-close');
  const whatsappContainer = document.querySelector('.whatsapp-float-container');


  if (closeBtn && whatsappContainer) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      sessionStorage.setItem('whatsappClosed', 'true');

      whatsappContainer.classList.add('closing');
      setTimeout(() => {
        whatsappContainer.style.display = 'none';
      }, 300);
    });
  }

  if (sessionStorage.getItem('whatsappClosed') === 'true') {
    const container = document.querySelector('.whatsapp-float-container');
    if (container) {
      container.style.display = 'none';
    }
  }
});
