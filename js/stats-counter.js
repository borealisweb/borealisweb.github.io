document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");
    let started = false;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && !started){
                    started = true;
                    counters.forEach(counter => animateCounter(counter));
                }
            });
        },
        { threshold: 0.5 }
    );
    observer.observe(document.querySelector(".stats-section"));
    
    function animateCounter(counter){
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 100;
        const updateCounter = () => {
            count += increment;
            if(count < target){
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        requestAnimationFrame(updateCounter);
    }
});
