document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll('.input-group input[type="number"]').forEach(numInput => {
    numInput.addEventListener('input', () => {
      numInput.value = numInput.value.replace(/\D/g, '');
    });
  });

  document.querySelectorAll('.input-group input, .input-group textarea, .input-group select').forEach(input => {
    input.addEventListener('input', () => {
      const label = input.nextElementSibling;
      if (!input.value) {
        label.style.opacity = '1';
        label.style.visibility = 'visible';
      } else {
        label.style.opacity = '0';
        label.style.visibility = 'hidden';
      }
    });
  });

  document.querySelectorAll('.contact-form input').forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });
  });

  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.disabled = true;
      btn.innerText = 'Enviando...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
       
        const WORKER_URL = 'https://briefing-borealis.borealiscreadoresdeideas.workers.dev';

        const response = await fetch(WORKER_URL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
          }
        });

        if (response.ok) {
          alert('¡Gracias! Tu briefing ha sido enviado correctamente.');
          form.reset();

          document.querySelectorAll('.input-group label').forEach(label => {
            label.style.opacity = '1';
            label.style.visibility = 'visible';
          });
        } else {
          alert('Hubo un error al enviar el formulario. Inténtalo nuevamente.');
        }
      } catch (error) {
        alert('Error de conexión. Por favor, inténtalo de nuevo.');
      } finally {
        btn.disabled = false;
        btn.innerText = originalText;
      }
    });
  }
});