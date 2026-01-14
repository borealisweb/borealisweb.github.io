document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.jobs-text');
    console.log('Element found:', title);
    if (!title) return;
   
    const config = {
        minWeight: 100,      
        maxWeight: 900,      
        startOffset: 0.3,    
        endOffset: 0.3,      
        smoothness: 0.08     
    };
    
    let currentWeight = config.minWeight;
    let targetWeight = config.minWeight;
    let maxWeightReached = config.minWeight;
    
    function calculateWeight(scrollY) {
        const rect = title.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const titleTop = rect.top + scrollY;
        const titleHeight = rect.height;
        const titleCenter = titleTop + titleHeight / 2;
        
        const viewportCenter = scrollY + windowHeight / 4;
        
        const distanceFromCenter = viewportCenter - titleCenter;
        
        const normalizedDistance = distanceFromCenter / (windowHeight / 2);
        
        let progress;
        
        if (distanceFromCenter > 0) {
            progress = 0;
        } else {
            progress = 1 + normalizedDistance; 
            progress = Math.max(0, Math.min(1, progress)); 
        }
        
        progress = Math.max(0, (progress - config.startOffset) / (1 - config.startOffset - config.endOffset));
        progress = Math.min(1, Math.max(0, progress));
        
        const easedProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        let calculatedWeight = config.minWeight + (easedProgress * (config.maxWeight - config.minWeight));
        
        maxWeightReached = Math.max(maxWeightReached, calculatedWeight);
        
        if (distanceFromCenter >= 0) { 
            calculatedWeight = maxWeightReached;
        }
        
        targetWeight = calculatedWeight;
        return targetWeight;
    }
    
    function smoothUpdate() {
        const diff = targetWeight - currentWeight;
        currentWeight += diff * config.smoothness;
        
        title.style.setProperty('--title-weight', Math.round(currentWeight));
        console.log('Setting weight:', Math.round(currentWeight));
        
        if (Math.abs(diff) > 0.1) {
            requestAnimationFrame(smoothUpdate);
        }
    }
    
    function updateTitleWeight() {
        const scrollY = window.scrollY || window.pageYOffset;
        calculateWeight(scrollY);
        smoothUpdate();
    }
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const rect = title.getBoundingClientRect();
        const titleBottom = rect.bottom + scrollY;
        
        if (scrollY < titleBottom - window.innerHeight * 2) {
            maxWeightReached = config.minWeight;
            currentWeight = config.minWeight;
            targetWeight = config.minWeight;
            title.style.setProperty('--title-weight', config.minWeight);
        }
    }, { passive: true });
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTitleWeight();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    window.addEventListener('resize', updateTitleWeight);
    updateTitleWeight();
});
