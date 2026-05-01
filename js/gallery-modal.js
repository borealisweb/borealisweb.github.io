function openModal(modalId, src, isCarousel = false, carouselData = []) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalVideo = document.getElementById('modalVideo');
    const modalCarousel = document.getElementById('modalCarousel');
    const carouselImg = document.getElementById('carouselImg');


    if (modalImg) modalImg.style.display = 'none';
    if (modalVideo) {
        modalVideo.style.display = 'none';
        modalVideo.pause();
    }
    if (modalCarousel) modalCarousel.style.display = 'none';

    modal.classList.add('show');

    if (isCarousel && modalCarousel) {
        modalCarousel.style.display = 'flex';
        window.carouselImages = carouselData;
        window.carouselIndex = 0;


        let counter = modalCarousel.querySelector('.carousel-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'carousel-counter';
            modalCarousel.appendChild(counter);
        }

        if (carouselImg) {
            carouselImg.src = window.carouselImages[window.carouselIndex];
            carouselImg.style.opacity = '1';
        }
        updateCarouselArrows();
    } else if (src && (src.endsWith('.webm') || src.endsWith('.mp4'))) {
        if (modalVideo) {
            modalVideo.style.display = 'block';
            modalVideo.src = src;
            modalVideo.play().catch(err => {
                modalVideo.muted = true;
                modalVideo.play();
            });
        }
    } else if (src) {
        if (modalImg) {
            modalImg.style.display = 'block';
            modalImg.src = src;
            modalImg.style.opacity = '1';
        }
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalVideo = document.getElementById('modalVideo');

    if (modalVideo) {
        modalVideo.pause();
    }

    modal.classList.remove('show');
}

function updateCarouselArrows() {
    const prevBtn = document.querySelector('.modal-carousel .nav.prev');
    const nextBtn = document.querySelector('.modal-carousel .nav.next');
    const counter = document.querySelector('.carousel-counter');

    if (prevBtn) prevBtn.style.visibility = window.carouselIndex === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = window.carouselIndex === window.carouselImages.length - 1 ? 'hidden' : 'visible';

    if (counter && window.carouselImages) {
        counter.textContent = `${window.carouselIndex + 1} / ${window.carouselImages.length}`;
    }
}

function nextCarousel(e) {
    if (e) e.stopPropagation();
    if (window.carouselIndex < window.carouselImages.length - 1) {
        const carouselImg = document.getElementById('carouselImg');
        carouselImg.style.opacity = '0';

        setTimeout(() => {
            window.carouselIndex++;
            carouselImg.src = window.carouselImages[window.carouselIndex];
            carouselImg.style.opacity = '1';
            updateCarouselArrows();
        }, 200);
    }
}

function prevCarousel(e) {
    if (e) e.stopPropagation();
    if (window.carouselIndex > 0) {
        const carouselImg = document.getElementById('carouselImg');
        carouselImg.style.opacity = '0';

        setTimeout(() => {
            window.carouselIndex--;
            carouselImg.src = window.carouselImages[window.carouselIndex];
            carouselImg.style.opacity = '1';
            updateCarouselArrows();
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    modal.onclick = function (e) {
        if (e.target === modal) {
            closeModal();
        }
    };

    const prevBtn = document.querySelector('.modal-carousel .nav.prev');
    const nextBtn = document.querySelector('.modal-carousel .nav.next');
    const carouselImg = document.getElementById('carouselImg');

    if (prevBtn) prevBtn.onclick = prevCarousel;
    if (nextBtn) nextBtn.onclick = nextCarousel;

    if (carouselImg) {
        carouselImg.onclick = (e) => {
            e.stopPropagation();
            if (window.carouselIndex < window.carouselImages.length - 1) {
                nextCarousel();
            } else {

            }
        };
    }

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextCarousel();
        if (e.key === 'ArrowLeft') prevCarousel();
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.onclick = function () {
            const isCarousel = item.classList.contains('is-carousel');
            const src = item.querySelector('img') ? item.querySelector('img').src : '';

            let carouselData = [];
            if (isCarousel) {
                const dataContainer = item.querySelector('.carousel-data');
                if (dataContainer) {
                    carouselData = [...dataContainer.querySelectorAll('img')].map(img => img.src);
                }
            }

            openModal('modal', src, isCarousel, carouselData);
        };

        item.addEventListener('mouseenter', () => document.body.classList.add('gallery-hover'));
        item.addEventListener('mouseleave', () => document.body.classList.remove('gallery-hover'));
    });
});
