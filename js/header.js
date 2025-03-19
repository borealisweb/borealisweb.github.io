// script.js

// Cargar el contenido del header
document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
    <header>
      <div class="header-content">
        <div class="menu">
          <ul id="menu">
            <li class="li2"><a href="../index.html#inicio">Inicio</a></li>
            <li class="li1"><a href="../index.html#portafolio">Portafolio Diseño</a></li>
            <li class="li1"><a href="../html/videos.html">Edición de Video</a></li>
            <li class="li2"><a href="../html/blog.html">Blog</a></li>
          </ul>
        </div>
        <a class="logo"><img src="../img/png/logo.png"></a>
        <button class="open-modal-btn" onclick="openModalcontact()">Agendar Cita</button>
        <div id="contactModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModalcontact()">&times;</span>
                <h2 class="modaltittle">Envíanos un Mensaje</h2>
                <form action="https://formsubmit.co/borealiscreadoresdeideas@gmail.com" method="POST">
                  <div class="form-group">
                      <input type="text" id="name" name="name" class="form-control" placeholder="Tu Nombre" required>
                  </div>
                  <div class="form-group">
                      <input type="email" id="email" name="email" class="form-control" placeholder="Tu Correo" required>
                  </div>
                  <div class="form-group">
                      <input type="phone" id="phone" name="phone" class="form-control" placeholder="Teléfono" required>
                  </div>
                  <div class="form-group">
                      <textarea id="message" name="message" class="form-control" placeholder="Escribe tu mensaje aquí..." rows="4" required></textarea>
                      </div>
                      <input type="hidden" name="_captcha" value="false">
                      <input type="hidden" name="_template" value="table">
                      <input type="hidden" name="_next" value="https://borealisweb.github.io/html/gracias.html">
                      <button type="submit" class="modalbtn">Enviar</button>
                  </form>
            </div>
        </div>

    <a href="https://www.instagram.com/borealis.oficial/">
      <img class="logoinstagram" src="../img/png/insta.png" alt="">
    </a>
    </header>
    `;

    // Agregar el contenido del header al div con id="header"
    document.getElementById('header').innerHTML = headerHTML;
});


// Función para cambiar el estilo del header al hacer scroll
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var scrollTop = window.scrollY;

    if (scrollTop > 50) { // Cambiar el número según cuánto quieres que se haga scroll antes de cambiar
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Aseguramos que la alerta esté oculta al cargar la página
    const alerta = document.querySelector('p.alerta');
    alerta.style.opacity = "0";
});

document.addEventListener("DOMContentLoaded", () => {
    // Aseguramos que la alerta esté oculta al cargar la página
    const alerta = document.querySelector('p.alerta');
    alerta.style.opacity = "0";  // Al cargar la página, la alerta está oculta.
});

document.addEventListener("DOMContentLoaded", () => {
    // Aseguramos que la alerta esté oculta al cargar la página
    const alerta = document.querySelector('p.alerta');
    alerta.style.opacity = "0";  // Al cargar la página, la alerta está oculta.
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const alerta = document.querySelector('p.alerta');
  const footer = document.querySelector('footer');

  const scrollTop = window.scrollY;
  const footerPosition = footer.getBoundingClientRect().top;
  const threshold = window.innerHeight; // Altura de la ventana (puedes ajustar el umbral)

  // Cambiar el estilo del header al hacer scroll
  if (scrollTop > 50) { // Cuando el scroll haya bajado más de 50px
    if (!header.classList.contains('header-scrolled')) {
      header.classList.add('header-scrolled');
    }
    alerta.style.opacity = "1"; // Hacer visible la alerta
  } else {
    if (header.classList.contains('header-scrolled')) {
      header.classList.remove('header-scrolled');
    }
    alerta.style.opacity = "0"; // Hacer desaparecer la alerta
  }

  // Desaparecer el header cuando se llegue al footer
  if (footerPosition <= threshold) {
    header.classList.add('static-header'); // Cambia a la clase estática para desaparecer
    alerta.style.opacity = "0"; // Desaparece la alerta cuando el pie de página se muestra
  } else {
    header.classList.remove('static-header'); // El header vuelve a su posición fija
  }
});
