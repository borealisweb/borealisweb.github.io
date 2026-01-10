function iniciarAnimacionScroll() {
    const elementos = document.querySelectorAll('.reveal');


    const CONFIG = {
        startDistance: 100,
        endDistance: 480,
        moveDistance: 300
    };


    elementos.forEach(elemento => {

        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(50px)';
        elemento.style.transition = 'transform 0.1s linear, opacity 0.05s linear';
        elemento.style.willChange = 'transform, opacity';


        const rect = elemento.getBoundingClientRect();
        const elementoTop = rect.top + window.scrollY;
        const windowH = window.innerHeight;

        elemento._revealData = {
            startY: elementoTop - windowH + CONFIG.startDistance,
            endY: elementoTop - windowH + CONFIG.endDistance,
            moveDistance: CONFIG.moveDistance,
            isActive: false
        };
    });


    const observer = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const elemento = entrada.target;


                    activarScrollTracking(elemento);


                    elemento.classList.add('visible');


                    observer.unobserve(elemento);
                }
            });
        },
        { threshold: 0.1 }
    );


    elementos.forEach((el) => observer.observe(el));


    function activarScrollTracking(elemento) {
        const data = elemento._revealData;
        if (!data || data.isActive) return;

        data.isActive = true;

        function updateWithScroll() {
            const scrollY = window.scrollY;
            let progress = 0;

            if (scrollY >= data.startY && scrollY <= data.endY) {
                progress = (scrollY - data.startY) / (data.endY - data.startY);
            } else if (scrollY > data.endY) {
                progress = 1;
            }


            const yPos = data.moveDistance * (1 - progress);
            elemento.style.transform = `translateY(${yPos}px)`;
            elemento.style.opacity = progress;
        }


        window.addEventListener('scroll', updateWithScroll);
        updateWithScroll();


        elemento._scrollHandler = updateWithScroll;
    }


    window.addEventListener('resize', function() {
        setTimeout(() => {
            elementos.forEach(elemento => {
                if (elemento._revealData && elemento._revealData.isActive) {

                    const rect = elemento.getBoundingClientRect();
                    const elementoTop = rect.top + window.scrollY;
                    const windowH = window.innerHeight;

                    elemento._revealData.startY = elementoTop - windowH + CONFIG.startDistance;
                    elemento._revealData.endY = elementoTop - windowH + CONFIG.endDistance;


                    if (elemento._scrollHandler) {
                        elemento._scrollHandler();
                    }
                }
            });
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', iniciarAnimacionScroll);


document.addEventListener("DOMContentLoaded", () => {
    // Este bloque está vacío ya que no hay imágenes extra que procesar
    // Se mantiene la estructura por si se necesita en el futuro
});
