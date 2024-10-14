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

    <a href="https://www.instagram.com/borealis_crea/">
      <img class="logoinstagram" src="../img/png/insta.png" alt="">
    </a>
    </header>
    `;

    // Agregar el contenido del header al div con id="header"
    document.getElementById('header').innerHTML = headerHTML;
});
