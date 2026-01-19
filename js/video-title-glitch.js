document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.querySelector('.video-text');
    if (!titulo) return;

    const textoOriginal = titulo.innerHTML;

    titulo.innerHTML = textoOriginal;
    titulo.style.opacity = '1';

    let yaAnimado = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !yaAnimado) {
                yaAnimado = true;

                function crearGlitch() {
                    titulo.style.position = 'relative';
                    titulo.style.transition = 'none';
                    
                    let iteracion = 0;
                    const maxIteraciones = 25;

                    const intervalo = setInterval(() => {
                        iteracion++;
                        
                        const intensidad = 1 - (iteracion / maxIteraciones) * 0.3;
                        
                        if (Math.random() > 0.1) {
                            const rojoOffset = (Math.random() * 20 - 10) * intensidad;
                            const verdeOffset = (Math.random() * 20 - 10) * intensidad;
                            const azulOffset = (Math.random() * 20 - 10) * intensidad;
                            
                            titulo.style.textShadow = `
                                ${rojoOffset}px 0 0 rgba(255, 0, 0, ${intensidad}),
                                ${verdeOffset}px 0 0 rgba(0, 255, 0, ${intensidad}),
                                ${azulOffset}px 0 0 rgba(0, 0, 255, ${intensidad}),
                                0 0 20px rgba(255, 0, 255, ${intensidad * 0.5})
                            `;
                        }
                        
                        if (Math.random() > 0.2) {
                            const translateX = (Math.random() * 30 - 15) * intensidad;
                            const translateY = (Math.random() * 20 - 10) * intensidad;
                            const skewX = (Math.random() * 15 - 7.5) * intensidad;
                            const scale = 1 + (Math.random() * 0.1 - 0.05) * intensidad;
                            
                            titulo.style.transform = `translate(${translateX}px, ${translateY}px) skewX(${skewX}deg) scale(${scale})`;
                        }
                        
                        if (Math.random() > 0.3) {
                            titulo.style.opacity = Math.random() * 0.5 + 0.5;
                        }
                        
                        if (Math.random() > 0.4) {
                            titulo.style.clipPath = `polygon(${Math.random() * 30}% 0%, ${100 - Math.random() * 30}% 0%, ${100 - Math.random() * 30}% 100%, ${Math.random() * 30}% 100%)`;
                        }
                        
                        if (Math.random() > 0.6) {
                            titulo.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(${1 + Math.random() * 0.5})`;
                        }
                        
                        setTimeout(() => {
                            titulo.style.textShadow = 'none';
                            titulo.style.transform = 'translate(0, 0) skewX(0deg) scale(1)';
                            titulo.style.opacity = '1';
                            titulo.style.clipPath = 'none';
                            titulo.style.filter = 'none';
                        }, 80);
                        
                        if (iteracion >= maxIteraciones) {
                            clearInterval(intervalo);
                            titulo.style.transition = 'transform 0.1s, opacity 0.1s, filter 0.1s';
                            
                            setInterval(() => {
                                if (Math.random() > 0.7) {
                                    titulo.style.textShadow = `
                                        ${Math.random() * 8 - 4}px 0 0 rgba(255, 0, 0, 0.9),
                                        ${Math.random() * 8 - 4}px 0 0 rgba(0, 255, 0, 0.9),
                                        ${Math.random() * 8 - 4}px 0 0 rgba(0, 0, 255, 0.9),
                                        0 0 15px rgba(255, 0, 255, 0.6)
                                    `;
                                    titulo.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 6 - 3}px) scale(${1 + Math.random() * 0.05 - 0.025})`;
                                    titulo.style.filter = `hue-rotate(${Math.random() * 180}deg)`;
                                    
                                    setTimeout(() => {
                                        titulo.style.textShadow = 'none';
                                        titulo.style.transform = 'translate(0, 0) scale(1)';
                                        titulo.style.filter = 'none';
                                    }, 120);
                                }
                            }, 100);
                        }
                    }, 10);
                }

                crearGlitch();

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(titulo);
});
