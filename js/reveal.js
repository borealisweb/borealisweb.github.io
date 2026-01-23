function iniciarAnimacionScroll() {
    const CONFIG = {
        startDistance: 100,
        endDistance: 480,
        moveDistance: 300,
        throttleDelay: 16, 
        mobileMultiplier: 0.7 
    };


    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const mobileConfig = isMobile ? {
        ...CONFIG,
        moveDistance: CONFIG.moveDistance * CONFIG.mobileMultiplier,
        endDistance: CONFIG.endDistance * CONFIG.mobileMultiplier
    } : CONFIG;

    const processedElements = new Set();
    let activeScrollHandlers = new Set();
    
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    function initializeElement(elemento) {
        if (processedElements.has(elemento)) return;
        processedElements.add(elemento);

        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(50px)';
        elemento.style.transition = `transform 0.1s linear, opacity 0.05s linear`;
        elemento.style.willChange = 'transform, opacity';

        const updateElementData = () => {
            const rect = elemento.getBoundingClientRect();
            const elementoTop = rect.top + window.scrollY;
            const windowH = window.innerHeight;
            const config = isMobile ? mobileConfig : CONFIG;

            elemento._revealData = {
                startY: elementoTop - windowH + config.startDistance,
                endY: elementoTop - windowH + config.endDistance,
                moveDistance: config.moveDistance,
                isActive: false,
                lastScrollY: 0
            };
        };

        updateElementData();
        elemento._updateData = updateElementData;
    }

    const observer = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const elemento = entrada.target;
                    initializeElement(elemento);
                    activarScrollTracking(elemento);
                    elemento.classList.add('visible');
                    observer.unobserve(elemento);
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: '50px' 
        }
    );

    function activarScrollTracking(elemento) {
        const data = elemento._revealData;
        if (!data || data.isActive) return;

        data.isActive = true;

        function updateWithScroll() {
            const scrollY = window.scrollY;
            
            if (Math.abs(scrollY - data.lastScrollY) < 2) {
                return;
            }
            data.lastScrollY = scrollY;

            let progress = 0;

            if (scrollY >= data.startY && scrollY <= data.endY) {
                progress = (scrollY - data.startY) / (data.endY - data.startY);
            } else if (scrollY > data.endY) {
                progress = 1;
            }

            requestAnimationFrame(() => {
                const yPos = data.moveDistance * (1 - progress);
                elemento.style.transform = `translateY(${yPos}px)`;
                elemento.style.opacity = progress;
            });
        }

        const throttledUpdate = throttle(updateWithScroll, CONFIG.throttleDelay);
        
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        activeScrollHandlers.add({ elemento, handler: throttledUpdate });
        
        throttledUpdate();
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (newIsMobile !== isMobile) {
                Object.assign(CONFIG, {
                    moveDistance: newIsMobile ? 300 * 0.7 : 300,
                    endDistance: newIsMobile ? 480 * 0.7 : 480
                });
            }

            processedElements.forEach(elemento => {
                if (elemento._revealData && elemento._revealData.isActive && elemento._updateData) {
                    elemento._updateData();
                    if (elemento._scrollHandler) {
                        elemento._scrollHandler();
                    }
                }
            });
        }, 150);
    }, { passive: true });


    const elementos = document.querySelectorAll('.reveal');
    elementos.forEach((el) => observer.observe(el));

    window.addEventListener('beforeunload', () => {
        activeScrollHandlers.forEach(({ elemento, handler }) => {
            window.removeEventListener('scroll', handler);
        });
    });
}

document.addEventListener('DOMContentLoaded', iniciarAnimacionScroll);
