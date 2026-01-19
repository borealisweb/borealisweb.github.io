document.addEventListener("DOMContentLoaded", () => {
 
  const empleadosInput = document.getElementById("empleados");
  if (empleadosInput) {
    empleadosInput.addEventListener("input", function() {
      this.value = this.value.replace(/\D/g, '');
    });
  }

  const telefonoInput = document.querySelector('input[type="tel"]');
  const form = document.querySelector('.contact-form');

  if (telefonoInput) {
    telefonoInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, ''); 
    });
  }

  if (form) {
 
    form.addEventListener('submit', (e) => {
      if (telefonoInput && !telefonoInput.checkValidity()) {
        e.preventDefault(); 
        alert('Por favor, ingresa un número de teléfono válido (solo números).');
        telefonoInput.focus();
        return;
      }

      handleFormSubmit(e);
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault(); 

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
