
// Función para animar los números
function animateNumbers(element, finalValue) {
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 50); // Dividimos el incremento para que se vea fluido
    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue; // Aseguramos que no se pase del valor final
            clearInterval(interval);
        }
        element.textContent = currentValue;
    }, 30); // Intervalo de 30ms para la animación
}

// Función para detectar si un elemento es visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

// Detectar cuando los números son visibles y animar
window.addEventListener('scroll', function() {
    const numbers = document.querySelectorAll('.bskilld'); // Seleccionamos todos los números
    numbers.forEach(function(number) {
        const finalValue = parseInt(number.textContent); // Obtenemos el valor final
        if (isElementInViewport(number) && !number.classList.contains('animated')) {
            number.classList.add('animated'); // Evitar que se vuelva a animar
            animateNumbers(number, finalValue);
        }
    });
});


window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer'); // Asegúrate de que tienes un pie de página
  const footerPosition = footer.getBoundingClientRect().top; // Posición del footer
  const threshold = window.innerHeight; // O usa un valor fijo en píxeles

  // Comprueba si el scroll ha llegado a la posición deseada
  if (footerPosition <= threshold) {
      header.classList.add('static-header'); // Cambiar a clase estática
  } else {
      header.classList.remove('static-header'); // Mantener como fijo
  }
});
