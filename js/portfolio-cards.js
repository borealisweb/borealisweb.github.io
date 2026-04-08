document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    
    cards.forEach(card => {
        const btn = card.querySelector('.btn-vermas');
        if (btn) {
            card.addEventListener('click', () => {
                window.location.href = btn.href;
            });
        }

        
        card.addEventListener('mousemove', e => {
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const maxRotation = 5; 
            
            const xRot = -(y / (rect.height / 2)) * maxRotation;
            const yRot = (x / (rect.width / 2)) * maxRotation;

            card.style.setProperty('--rot-x', `${xRot}deg`);
            card.style.setProperty('--rot-y', `${yRot}deg`);
        });

        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rot-x', '0deg');
            card.style.setProperty('--rot-y', '0deg');
        });
    });

    
    function updateScrollEffects() {
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            
            
            const img = card.querySelector('img');
            if (img) {
                const centerPos = (rect.top + (rect.height / 2) - (windowHeight / 2)) / (windowHeight / 2);
                const clampedCenter = Math.max(-1, Math.min(1, centerPos));
                
                
                const parallaxY = clampedCenter * 75; 
                card.style.setProperty('--parallax-y', `${parallaxY}px`);
            }

            
            let progress = 1 - ((rect.top - (windowHeight * 0.3)) / (windowHeight * 0.5));
            progress = Math.max(0, Math.min(1, progress)); 
            
            card.style.setProperty('--scroll-opacity', progress);
        });

        
        requestAnimationFrame(updateScrollEffects);
    }

    
    requestAnimationFrame(updateScrollEffects);
});
