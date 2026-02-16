function iniciarAnimacionScroll() {
    const elementos = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.style.opacity = '1';
                    entrada.target.style.transform = 'translateY(0)';
                    observer.unobserve(entrada.target);
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: '50px' 
        }
    );

    elementos.forEach((el) => {
        // No afectar al header
        if (el.tagName !== 'HEADER' && !el.closest('header')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', iniciarAnimacionScroll);
