document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.cinematic-video-section');
    const titulo = document.querySelector('.video-text');

    if (!section || !titulo) return;

    // 1. Crear el wrapper para el efecto Sticky (Pin)
    const wrapper = document.createElement('div');
    wrapper.className = 'cinematic-pin-wrapper';
    section.parentNode.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    wrapper.style.position = 'relative';
    section.style.position = 'sticky';

    // 2. Variables Clave de Sincronización
    const startOffset = 250; // Distancia de animación del botón
    let extraScroll = startOffset; // El scroll se detendrá exactamente esta cantidad de px
    let stickTop = 0;

    function updatePinParams() {
        // La altura del wrapper incluye el tamaño de la sección + el "freno" (extraScroll)
        wrapper.style.height = `${section.offsetHeight + extraScroll}px`;
        
        // Determina dónde se ancla. En este caso, queremos anclarlo en el centro de la ventana.
        // Restamos la mitad del alto de la sección de la mitad del alto de la ventana
        stickTop = (window.innerHeight / 2) - (section.offsetHeight / 2);
        
        // Nos aseguramos de que no se ancle más abajo de la parte superior si la sección es muy grande
        stickTop = Math.min(stickTop, 0); 
        
        section.style.top = `${stickTop}px`;
    }

    // Inicializamos y escuchamos cambios de tamaño
    updatePinParams();
    window.addEventListener('resize', updatePinParams);

    titulo.style = '';

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const windowHeight = window.innerHeight;

                // --- 1. Animación del Título Principal ---
                const titleRect = titulo.getBoundingClientRect();
                if (titleRect.top <= windowHeight && titleRect.bottom >= 0) {
                    let scrollDistanceRequired = windowHeight / 2;
                    let progressTitle = (windowHeight - titleRect.top) / scrollDistanceRequired;
                    progressTitle = Math.max(0, Math.min(1, progressTitle));
                    const bgPos = 100 - (progressTitle * 100);
                    titulo.style.backgroundPosition = `${bgPos}% 0%`;
                }

                const wrapRect = wrapper.getBoundingClientRect();

                // --- 2. Lógica del Contenedor Fijo (Pin) y Animación Central ---
                // Ahora verificamos si el contenedor está en el viewport
                if (wrapRect.top <= windowHeight && wrapRect.bottom >= 0) {
                    
                    // La animación de enfoque (fade) también la centramos un poco más
                    const fadeIn = (windowHeight - wrapRect.top) / (windowHeight * 0.5); // Más rápido al entrar
                    const fadeOut = wrapRect.bottom / (windowHeight * 0.5); // Más rápido al salir

                    let focusProgress = Math.min(1, fadeIn, fadeOut);
                    focusProgress = Math.max(0, focusProgress);

                    section.style.setProperty('--darken-progress', focusProgress);

                    const contentScale = 0.85 + (0.15 * focusProgress);
                    section.style.setProperty('--parallax-scale', contentScale);

                    const videoWrap = section.querySelector('.video-parallax-wrapper');
                    if (videoWrap) {
                        const vRect = videoWrap.getBoundingClientRect();
                        let rawFadeIn = (windowHeight - vRect.top) / (windowHeight * 0.5);
                        let rawFadeOut = vRect.bottom / (windowHeight * 0.5);
                        let vFadeIn = (rawFadeIn - 0.2) * 2; // Ajuste de inicio/fin del fade
                        let vFadeOut = (rawFadeOut - 0.2) * 2;
                        let vFade = Math.min(1, vFadeIn, vFadeOut);
                        videoWrap.style.setProperty('--video-fade', Math.max(0, vFade));
                    }

                    // --- 3. El Botón se sincroniza con el Freno del Scroll ---
                    const footerBtn = section.querySelector('.video-footer');
                    if (footerBtn) {
                        let pauseProgress = 0;

                        // Solo progresamos cuando hemos alcanzado el punto de anclaje (stickTop)
                        // que ahora está centrado en la pantalla
                        if (wrapRect.top <= stickTop) {
                            const scrolledPastStick = Math.abs(wrapRect.top - stickTop);
                            // Llegará a 1 exactamente cuando hayamos recorrido "extraScroll"
                            pauseProgress = Math.min(1, scrolledPastStick / extraScroll);
                        }

                        // Cálculo inverso para la traslación en Y
                        const diffMultiplier = 1 - pauseProgress;
                        const parallaxY = startOffset * diffMultiplier;

                        footerBtn.style.setProperty('--btn-parallax-y', `${parallaxY}px`);
                        footerBtn.style.setProperty('--btn-fade', pauseProgress);
                    }

                } else {
                    // Reset cuando el usuario sale de la sección
                    section.style.setProperty('--darken-progress', 0);
                    section.style.setProperty('--parallax-scale', 0.85);
                    const videoWrap = section.querySelector('.video-parallax-wrapper');
                    if (videoWrap) videoWrap.style.setProperty('--video-fade', 0);
                }

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});