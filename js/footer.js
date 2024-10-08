// footer.js

// Cargar el contenido del footer
document.addEventListener("DOMContentLoaded", function() {
    const footerHTML = `
        <footer class="footer">
            <img class="logo2" src="../img/png/logo2.png" alt="Logo Footer">
            <div class="menufooter">
              <ul>
              <li><a href="../index.html#inicio">INICIO</a></li>
              <li><a href="../index.html#portafolio">PORTAFOLIO</a></li>
                <li><a href="../html/blog.html">BLOG</a></li>
                <li><a href="../html/acerca-de-mi.html">ACERCA DE MÍ</a></li>
                <li><a href="../html/audiovisuales.html">AUDIOVISUALES</a></li>
              </ul>
            </div>
            <a href="https://www.instagram.com/borealis_crea/">
              <img class="logoinstagram2" src="../img/png/insta.png" width="30px" alt="Instagram">
            </a>
            <hr class="linea-fina" width="92.8%">
            <div class="copyright">
              <p class="footertext">©2024 DISEÑADO POR ÁNGEL J. GÓMEZ H.</p>
            </div>
        </footer>
    `;

    // Agregar el contenido del footer al div con id="footer"
    document.getElementById('footer').innerHTML = footerHTML;
});
