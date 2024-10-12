// script.js

// Cargar el contenido del header
document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
    <header>
      <div class="header-content">
        <div class="menu">
          <ul id="menu">
            <li><a href="../index.html#inicio">Inicio</a></li>
            <li><a href="../index.html#portafolio">Portafolio Diseño</a></li>
            <li><a href="../html/videos.html">Edición de Video</a></li>
            <li><a href="../html/blog.html">Blog</a></li>
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

    <a href="https://www.instagram.com/borealis_crea/">
      <img class="logoinstagram" src="../img/png/insta.png" width="30px" alt="">
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
