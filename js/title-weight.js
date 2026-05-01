document.addEventListener('DOMContentLoaded', function() {
    const titleContainer = document.querySelector('.jobs-title');
    const title = document.querySelector('.jobs-text');
    if (!title || !titleContainer) return;
   
    const config = {
        minWeight: 100,      maxWeight: 900,
        smoothness: 0.1 
    };
    
    let current = { progress: 0 };
    let target = { progress: 0 };
    let isVisible = false;
    let rAF;
    
    const lerp = (start, end, factor) => start + (end - start) * factor;

    function render() {
        current.progress = lerp(current.progress, target.progress, config.smoothness);
        const weight = lerp(config.minWeight, config.maxWeight, current.progress);
        
        
        
        title.style.setProperty('--title-weight', weight.toFixed(2));
        
        if (isVisible || Math.abs(target.progress - current.progress) > 0.005) {
           rAF = requestAnimationFrame(render);
        } else {
           cancelAnimationFrame(rAF);
        }
    }
    
    function calculateScroll() {
        if (!isVisible) return;
        
        const rect = titleContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const elementCenter = rect.top + (rect.height / 2);
        
        const triggerStart = windowHeight * 0.95;
        const triggerEnd = windowHeight * 0.45;
        
        let p = (triggerStart - elementCenter) / (triggerStart - triggerEnd);
        target.progress = Math.min(Math.max(p, 0), 1);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isVisible = true;
                calculateScroll();
                cancelAnimationFrame(rAF);
                rAF = requestAnimationFrame(render);
                window.addEventListener('scroll', calculateScroll, { passive: true });
            } else {
                isVisible = false;
                window.removeEventListener('scroll', calculateScroll);
            }
        });
    }, {
        rootMargin: "10% 0px 10% 0px",
        threshold: 0
    });
    
    observer.observe(titleContainer);

    calculateScroll();
    render();
});
