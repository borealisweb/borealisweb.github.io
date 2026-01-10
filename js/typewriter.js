document.addEventListener('DOMContentLoaded', function() {
    const elemento = document.querySelector('.title-web');
    if (!elemento) return;

    const textos = ["Somos...", "Creadores de Ideas"];

    let textoIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let estaEscribiendoIdeas = false;
    let cursorVisible = true;
    let cursorInterval;

    function iniciarCursorParpadeante() {
        if (cursorInterval) clearInterval(cursorInterval);

        cursorInterval = setInterval(() => {
            const textoActual = textos[textoIndex];
            const estaActivo = charIndex > 0 && charIndex < textoActual.length;

            if (!estaActivo) {
                elemento.style.borderRightColor = cursorVisible ? '#d4007f' : 'transparent';
                cursorVisible = !cursorVisible;
            } else {
                elemento.style.borderRightColor = '#d4007f';
            }
        }, 600);
    }

    function escribir() {
        const textoActual = textos[textoIndex];

        let textoAMostrar = '';

        if (textoIndex === 1) {
            const creadoresPart = "Creadores de ";
            const ideasPart = "Ideas";

            if (charIndex <= creadoresPart.length) {
                textoAMostrar = textoActual.substring(0, charIndex);
                estaEscribiendoIdeas = false;
                elemento.textContent = textoAMostrar;
            } else {
                const ideasChars = charIndex - creadoresPart.length;
                const ideasVisible = ideasPart.substring(0, ideasChars);
                textoAMostrar = creadoresPart + ideasVisible;
                estaEscribiendoIdeas = true;

                elemento.innerHTML = creadoresPart + '<strong>' + ideasVisible + '</strong>';
            }
        } else {
            textoAMostrar = textoActual.substring(0, charIndex);
            estaEscribiendoIdeas = false;
            elemento.textContent = textoAMostrar;
        }

        elemento.style.borderRight = '3px solid #d4007f';

        if (!isDeleting) {
            if (charIndex < textoActual.length) {
                charIndex++;
                setTimeout(escribir, textoIndex === 0 ? 80 : 80);
            } else {
                setTimeout(() => {
                    isDeleting = true;
                    escribir();
                }, 1500);
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
                setTimeout(escribir, 50);
            } else {
                isDeleting = false;
                textoIndex = (textoIndex + 1) % textos.length;
                setTimeout(escribir, 500);
            }
        }
    }

    escribir();
    iniciarCursorParpadeante();
});
