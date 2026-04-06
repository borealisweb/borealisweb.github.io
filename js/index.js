document.addEventListener('DOMContentLoaded', () => {
            const home = document.querySelector('.home-section');
            let isScrolling = false;

            function onScroll() {
                const scrollY = window.scrollY;
                const vh = window.innerHeight;
                const maxScroll = vh * 0.5; 
                
                if (scrollY <= maxScroll) {
                    home.style.transform = `translate3d(0, ${-scrollY}px, 0)`;
                } else {
                    home.style.transform = `translate3d(0, -${maxScroll}px, 0)`;
                }
                isScrolling = false;
            }

            window.addEventListener('scroll', () => {
                if (!isScrolling) {
                    window.requestAnimationFrame(onScroll);
                    isScrolling = true;
                }
            }, { passive: true });

            window.addEventListener('resize', () => window.requestAnimationFrame(onScroll));
            onScroll();
        });