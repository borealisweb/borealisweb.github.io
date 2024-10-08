document.addEventListener("DOMContentLoaded", function() {
    const recientesHTML = `
    <div class="contenedorrecientes">
      <div class="contenedor-seccionbc">
        <div class="seccionesbc">
          <hr class="linea-seccionesbc">
          <h2 class="seccionbc">RECIENTES</h2>
        </div>
      </div>
        <div class="contenedorrecientestexto">

      <div class="recientestexto">
        <a href="../html/blog-content-02.html">
          <p class="recientes">LA CULTURA DEL TODÓLOGO</p>
        </a>
        <hr class="linea-fina-recientes" width="100%;">
      </div>

        <div class="recientestexto">
          <a href="../html/blog-content-01.html">
            <p class="recientes">POR QUÉ DEBES CONTRATAR A UN DISEÑADOR CON ESTUDIOS ACADÉMICOS</p>
          </a>
          <hr class="linea-fina-recientes" width="100%;">
        </div>



      </div>
    </div>
    `;

    // Aquí corriges la variable que establece el contenido
    document.getElementById('recientes').innerHTML = recientesHTML;
});
