document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const video = document.getElementById('slide2-video');
    let currentIndex = 0;
    const totalSlides = slides.length;
    let videoPlayedOnce = false;

    const normalTime = 5000
    const longTime = 10000;

    let slideInterval;

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 2;

        slides.forEach((slide, i) => {
            slide.classList.remove('active-slide');
            if (i === index) slide.classList.add('active-slide');
        });

        dots.forEach(dot => dot.classList.remove('active-dot'));
        dots[index].classList.add('active-dot');

        if (video) {
            if (index === 1 && !videoPlayedOnce) {
                video.play();
                videoPlayedOnce = true;
            } else if (index !== 1) {
                video.pause();
            }
        }

        currentIndex = index;

        resetInterval();
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }

    nextBtn.addEventListener('click', () => { nextSlide();  });
    prevBtn.addEventListener('click', () => { prevSlide(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { showSlide(i); });
    });

    function startInterval() {
        const time = currentIndex === 2 ? longTime : normalTime;
        slideInterval = setInterval(nextSlide, time);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    showSlide(0);
});
