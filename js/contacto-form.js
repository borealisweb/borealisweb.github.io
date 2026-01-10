document.addEventListener("DOMContentLoaded", () => {
  // Validación de campo de empleados (solo números)
  const empleadosInput = document.getElementById("empleados");
  if (empleadosInput) {
    empleadosInput.addEventListener("input", function() {
      this.value = this.value.replace(/\D/g, '');
    });
  }

  // Validación y envío del formulario
  const telefonoInput = document.querySelector('input[type="tel"]');
  const form = document.querySelector('.contact-form');

  if (telefonoInput) {
    telefonoInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, ''); // Solo números
    });
  }

  if (form) {
    // Validación simple antes de enviar
    form.addEventListener('submit', (e) => {
      if (telefonoInput && !telefonoInput.checkValidity()) {
        e.preventDefault(); // Detener envío
        alert('Por favor, ingresa un número de teléfono válido (solo números).');
        telefonoInput.focus();
        return;
      }

      // Si la validación pasa, continuar con el envío asíncrono
      handleFormSubmit(e);
    });
  }

  // Función para manejar el envío del formulario
  async function handleFormSubmit(e) {
    e.preventDefault(); // Evitar redirección

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
        form.reset();
      } else {
        alert('Hubo un error al enviar el mensaje. Por favor, inténtalo nuevamente.');
      }
    } catch (error) {
      alert('Hubo un error de conexión. Por favor, inténtalo nuevamente.');
    }
  }
});
