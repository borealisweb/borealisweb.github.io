document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando efecto zoom parallax...');

    const section = document.querySelector('.portfolio-section.video');
    if (!section) {
        console.warn('No se encontró la sección .portfolio-section.video');
        return;
    }

    const elements = {
        video: section.querySelector('.portfolio-video'),
        title: section.querySelector('.title-video'),
        paragraph: section.querySelector('.paragraph-video'),
        textBtn: section.querySelector('.text-btn'),
        button: section.querySelector('.btn-video')
    };

    const validElements = Object.values(elements).filter(el => el !== null);
    console.log(`✅ Encontrados ${validElements.length} elementos para animar`);

    const config = {
        zoomIntensity: 0,
        fadeIntensity: 0,
        movementIntensity: 40,
        startOffset: 0,
        speedFactors: {
            video: 1.0,
            title: 0.8,
            paragraph: 0.6,
            textBtn: 0.7,
            button: 0.9
        }
    };

    validElements.forEach(element => {
        let speed = 0.7;
        if (element.classList.contains('portfolio-video')) speed = config.speedFactors.video;
        else if (element.classList.contains('title-video')) speed = config.speedFactors.title;
        else if (element.classList.contains('paragraph-video')) speed = config.speedFactors.paragraph;
        else if (element.classList.contains('text-btn')) speed = config.speedFactors.textBtn;
        else if (element.classList.contains('btn-video')) speed = config.speedFactors.button;

        element._parallaxData = {
            baseScale: 1,
            baseOpacity: 1 - config.fadeIntensity,
            speed: speed,
            originalTransform: element.style.transform || ''
        };

        element.style.transform = `translateY(${config.movementIntensity * 0.5}px)`;
        element.style.opacity = element._parallaxData.baseOpacity.toString();
        element.style.willChange = 'transform, opacity';
        element.style.transition = 'transform 0.08s ease-out, opacity 0.08s ease-out';

        console.log(`   • ${element.className}: escala ${element._parallaxData.baseScale.toFixed(2)}, opacidad ${element._parallaxData.baseOpacity.toFixed(2)}`);
    });

    function updateParallax() {
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top + scrollY;
        const sectionHeight = sectionRect.height;

        let sectionProgress = 0;

        const effectStart = sectionTop - windowH + config.startOffset;
        const effectEnd = sectionTop + sectionHeight - config.startOffset;

        if (scrollY >= effectStart && scrollY <= effectEnd) {
            sectionProgress = (scrollY - effectStart) / (effectEnd - effectStart);
        } else if (scrollY > effectEnd) {
            sectionProgress = 1;
        }

        validElements.forEach(element => {
            const data = element._parallaxData;
            if (!data) return;

            const elementProgress = Math.min(1, sectionProgress / data.speed);

            const currentOpacity = 1 - (config.fadeIntensity * (1 - elementProgress));
            const currentMovement = config.movementIntensity * (1 - elementProgress);

            element.style.transform = `translateY(${currentMovement}px)`;
            element.style.opacity = currentOpacity.toString();

            if (elementProgress > 0.2 && elementProgress < 0) {
                const blurAmount = Math.sin(elementProgress * Math.PI) * 1.2;
                element.style.filter = `blur(${blurAmount}px)`;
            } else {
                element.style.filter = 'blur(0)';
            }
        });
    }

    let animationId = null;
    let lastScrollY = window.scrollY;

    function smoothUpdate() {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) > 0.5) {
            updateParallax();
            lastScrollY = currentScrollY;
        }

        animationId = requestAnimationFrame(smoothUpdate);
    }

    smoothUpdate();

    window.addEventListener('resize', function() {
        setTimeout(updateParallax, 100);
    });

    updateParallax();

    console.log('✨ Efecto zoom parallax activado correctamente');
    console.log('⚙️  Configuración actual:');
    console.log('   - Zoom intensity:', config.zoomIntensity);
    console.log('   - Fade intensity:', config.fadeIntensity);
    console.log('   - Movement:', config.movementIntensity + 'px');
    console.log('   - Start offset:', config.startOffset + 'px');

    window.updateZoomConfig = function(newConfig) {
        Object.assign(config, newConfig);
        console.log('🔄 Configuración actualizada:', config);
        updateParallax();
    };

    section.classList.remove('bg-dark'); 
    var observer = new window.IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry){
                if (entry.isIntersecting) {
                    section.classList.add('bg-dark');
                } else {
                    section.classList.remove('bg-dark');
                }
            });
        },
        {
            threshold: 0.1 
        }
    );
    observer.observe(section);
});
