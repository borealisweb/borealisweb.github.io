document.addEventListener("DOMContentLoaded", () => {
  // Validación de campos numéricos (solo números)
  document.querySelectorAll('.input-group input[type="number"]').forEach(numInput => {
    numInput.addEventListener('input', () => {
      numInput.value = numInput.value.replace(/\D/g, '');
    });
  });

  // Manejo de labels flotantes
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

  // Prevenir envío con Enter en campos del formulario
  document.querySelectorAll('.contact-form input').forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });
  });

  // Envío del formulario
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('¡Gracias! Tu briefing ha sido enviado correctamente.');
          form.reset();

          // Resetear labels flotantes
          document.querySelectorAll('.input-group label').forEach(label => {
            label.style.opacity = '1';
            label.style.visibility = 'visible';
          });
        } else {
          alert('Hubo un error al enviar el formulario. Inténtalo nuevamente.');
        }
      } catch (error) {
        alert('Error de conexión. Por favor, inténtalo de nuevo.');
      }
    });
  }
});
