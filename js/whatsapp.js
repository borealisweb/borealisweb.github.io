document.addEventListener("DOMContentLoaded", () => {
  const whatsappHTML = `
    <div class="whatsapp-float-container">
      <a href="https://wa.me/+584143571705" target="_blank" class="whatsapp-float">
        <span class="whatsapp-bubble">Contacto Directo</span>
        <div class="whatsapp-icon-wrapper">
          <img src="../img/whatsapp.webp" alt="WhatsApp" class="whatsapp-icon" onerror="this.onerror=null; this.src='img/whatsapp.webp';">
          <button class="whatsapp-close" aria-label="Cerrar">×</button>
        </div>
      </a>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', whatsappHTML);

  const closeBtn = document.querySelector('.whatsapp-close');
  const whatsappContainer = document.querySelector('.whatsapp-float-container');

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    whatsappContainer.classList.add('closing');

    setTimeout(() => {
      whatsappContainer.style.visibility = 'hidden';
      whatsappContainer.style.pointerEvents = 'none';
    }, 300);
  });
});
