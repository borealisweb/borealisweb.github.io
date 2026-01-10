document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.btn-video');
    if (!btn) {
        console.error('No se encontró .btn-video');
        return;
    }

    console.log('🎯 Iniciando efecto scroll 1:1...');

    let btnTopAbsolute = btn.getBoundingClientRect().top + window.scrollY;
    let startAppearPoint = btnTopAbsolute - window.innerHeight + 0;
    let fullAppearPoint = btnTopAbsolute - window.innerHeight + 180;

    let isHovering = false;
    let baseTransform = '';

    btn.style.transform = 'translateX(-50%) translateY(100px)';
    btn.style.opacity = '0';
    btn.style.willChange = 'transform, opacity';
    btn.style.transition = 'transform 0.1s linear, opacity 0.1s linear';

    function updateButtonWithScroll() {
        const scrollY = window.scrollY;
        let progress = 0;

        if (scrollY >= startAppearPoint && scrollY <= fullAppearPoint) {
            progress = (scrollY - startAppearPoint) / (fullAppearPoint - startAppearPoint);
        } else if (scrollY > fullAppearPoint) {
            progress = 1;
        }

        const yTranslation = 100 * (1 - progress);
        const opacity = progress;

        baseTransform = `translateX(-50%) translateY(${yTranslation}px)`;

        if (isHovering) {
            btn.style.transform = `${baseTransform} scale(1.05)`;
        } else {
            btn.style.transform = baseTransform;
        }

        btn.style.opacity = opacity.toString();
        btn.style.pointerEvents = progress > 0.7 ? 'auto' : 'none';
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 0.5) {
            lastScrollY = currentScrollY;

            if (!ticking) {
                requestAnimationFrame(function() {
                    updateButtonWithScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }
    });

    window.addEventListener('resize', function() {
        const newRect = btn.getBoundingClientRect();
        btnTopAbsolute = newRect.top + window.scrollY;
        startAppearPoint = btnTopAbsolute - window.innerHeight + 0;
        fullAppearPoint = btnTopAbsolute - window.innerHeight + 200;
        updateButtonWithScroll();
    });

    btn.addEventListener('mouseenter', function() {
        if (btn.style.pointerEvents === 'auto') {
            isHovering = true;
            btn.style.transform = `${baseTransform} scale(1.05)`;
            btn.style.backgroundColor = '#d4007f';
            btn.style.borderColor = 'transparent';
            btn.style.transition = 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease';
        }
    });

    btn.addEventListener('mouseleave', function() {
        isHovering = false;
        btn.style.transform = baseTransform;
        btn.style.backgroundColor = '#0c0c0c';
        btn.style.borderColor = '#fff';
        btn.style.transition = 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease';
    });

    updateButtonWithScroll();

    console.log('Efecto scroll 1:1 configurado');
});
