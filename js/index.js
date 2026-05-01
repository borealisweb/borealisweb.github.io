 document.addEventListener('DOMContentLoaded', () => {
            const scrollIndicator = document.getElementById('scroll-indicator');
            
            window.addEventListener('scroll', () => {
                if (!scrollIndicator) return;
                
                if (window.scrollY > 50) {
                    scrollIndicator.classList.add('hidden-indicator');
                } else {
                    scrollIndicator.classList.remove('hidden-indicator');
                }
            }, { passive: true });
            
            console.log('Scroll animado 100% por CSS nativo. Adiós Lag.');
        });