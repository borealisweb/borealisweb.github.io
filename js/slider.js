document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const videoSlide2 = document.getElementById('slide2-video');
        let currentIndex = 0;
        let slideInterval;
        const slideTime = 10000; 

        function startSlideTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlide(currentIndex + 1);
            }, slideTime);
        }

        function showSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach((slide, i) => {
                slide.classList.remove('active-slide');
                if (i === index) slide.classList.add('active-slide');
            });

            dots.forEach(dot => dot.classList.remove('active-dot'));
            dots[index].classList.add('active-dot');

            if (videoSlide2) {
                if (index === 1) {
                    videoSlide2.currentTime = 0;
                    videoSlide2.play().catch(e => console.log("Autoplay interceptado silenciosamente", e));
                } else {
                    videoSlide2.pause();
                }
            }

            currentIndex = index;
            startSlideTimer(); 
        }

        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => showSlide(i));
        });

       
        startSlideTimer();
    });