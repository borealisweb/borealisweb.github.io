
    // Función para abrir el modal
    function openModalcontact() {
        document.getElementById("contactModal").style.display = "block";
    }

    // Función para cerrar el modal
    function closeModalcontact() {
        document.getElementById("contactModal").style.display = "none";
    }

    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.onclick = function(event) {
        var modal = document.getElementById("contactModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }



          function openModal(modalId) {
              var modal = document.getElementById(modalId);
              modal.style.display = "block";
          }

          function closeModal(modalId) {
              var modal = document.getElementById(modalId);
              modal.style.display = "none";
          }

          // Cerrar el modal si se hace clic fuera de él
          window.onclick = function(event) {
              var modals = document.getElementsByClassName("modal2");
              for (var i = 0; i < modals.length; i++) {
                  if (event.target == modals[i]) {
                      modals[i].style.display = "none";
                  }
              }
          }





// Slider
var slideIndex = 0;
var slides = document.getElementsByClassName("slide");
var dots = document.getElementsByClassName("dot");
var slideInterval;

// Variables necesarias
var slides = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');
var slideIndex = 0;
var slideInterval;

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el elemento del texto "¡Hola!"
  var holaText = document.getElementById("holaText");

  // Agregar la clase "fade-in" después de un retraso de 2 segundos
  setTimeout(function () {
    holaText.classList.add("fade-in");
  }, 500); // 2100 ms para un retraso de 2 segundos más el tiempo inicial
});


// Función para mostrar las diapositivas
function showSlides() {
    // Ocultar todas las slides y desactivar todos los puntos
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0"; // Ocultar la slide
        slides[i].style.zIndex = "0"; // Asegurar que la slide inactiva esté detrás
        dots[i].classList.remove("active-dot"); // Desactivar el punto
    }

    // Mostrar la slide actual con transición de entrada
    slides[slideIndex].style.opacity = "1"; // Mostrar la slide
    slides[slideIndex].style.zIndex = "1"; // Asegurar que la slide activa esté adelante
    dots[slideIndex].classList.add("active-dot"); // Activar el punto correspondiente

    // Incrementar el índice para la próxima slide
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Reiniciar el índice al principio
    }
}

// Función para iniciar el slider
function startSlider() {
    // Mostrar la primera slide con una duración de 10 segundos
    showSlides();
    slideInterval = setInterval(showSlides, 6000); // Cambiar slide cada 10 segundos inicialmente

    // Restablecer el intervalo para cambiar a cada 4 segundos después de la primera slide
    setTimeout(function() {
        clearInterval(slideInterval); // Detener el intervalo actual
        slideInterval = setInterval(showSlides, 6000); // Cambiar slide cada 4 segundos después de 10 segundos
    }, 4000);
}

// Iniciar el slider automáticamente al cargar la página
startSlider();

// Función para navegar a una slide específica usando los puntos de navegación
function currentSlide(n) {
    clearInterval(slideInterval); // Detener el intervalo actual
    slideIndex = n; // Establecer la diapositiva actual al índice dado
    showSlides(); // Mostrar la diapositiva actual

    // Restablecer el intervalo para cambiar slides cada 4 segundos
    slideInterval = setInterval(showSlides, 4000);
}

// Agregar event listeners a los puntos de navegación
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide(index);
    });
});

// Función para cambiar manualmente la slide mediante los puntos
function currentSlide(n) {
    slideIndex = n; // Establecer el índice según el punto seleccionado
    clearInterval(slideInterval); // Detener el intervalo actual
    showSlides(); // Mostrar la slide seleccionada
    slideInterval = setInterval(showSlides, 7000); // Iniciar nuevo intervalo
}



document.addEventListener('DOMContentLoaded', function() {
    // Función para verificar el scroll y mostrar el contenido
    function checkScroll() {
        var scrollPosition = window.scrollY;
        var triggerOffset = document.querySelector('.scroll-trigger').offsetTop;
        var triggerPoint = triggerOffset - window.innerHeight + 500; // Ajuste según necesidades

        // Mostrar contenido cuando se hace scroll
        if (scrollPosition > triggerPoint) {
            document.querySelector('.scroll-trigger').classList.add('visible');
        }
    }

    // Detectar el scroll y llamar a la función
    window.addEventListener('scroll', function() {
        checkScroll();
    });

    // También verificar al cargar la página por si ya está visible
    checkScroll();
});


    // Espera a que el documento esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        // Selecciona todos los enlaces dentro del menú
        const links = document.querySelectorAll('#menu a');

        // Añade un evento de clic a cada enlace
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Previene el comportamiento predeterminado del enlace
                const sectionId = this.getAttribute('href').substring(1); // Obtiene el id de la sección (sin #)
                const element = document.getElementById(sectionId); // Selecciona el elemento correspondiente

                // Desplazamiento suave a la sección
                element.scrollIntoView({ behavior: 'smooth' });
            });
        });
    });
