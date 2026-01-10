// Modal functionality with carousel for social media portfolio
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCarousel = document.getElementById('modalCarousel');
  const carouselImg = document.getElementById('carouselImg');
  const closeModal = document.getElementById('closeModal');

  const btnPrev = document.querySelector('.nav.prev');
  const btnNext = document.querySelector('.nav.next');

  let carouselImages = [];
  let currentIndex = 0;

  function updateArrows() {
    btnPrev.style.display = currentIndex === 0 ? 'none' : 'block';
    btnNext.style.display = currentIndex === carouselImages.length - 1 ? 'none' : 'block';
  }

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      modal.classList.add('active');

      if (item.classList.contains('is-carousel')) {
        modalImg.style.display = 'none';
        modalCarousel.style.display = 'flex';

        carouselImages = [...item.querySelectorAll('.carousel-data img')]
          .map(img => img.src);

        currentIndex = 0;
        carouselImg.src = carouselImages[currentIndex];
        updateArrows();
      } else {
        modalCarousel.style.display = 'none';
        modalImg.style.display = 'block';
        modalImg.src = item.querySelector('img').src;
      }
    });
  });

  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < carouselImages.length - 1) {
      currentIndex++;
      carouselImg.src = carouselImages[currentIndex];
      updateArrows();
    }
  });

  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      currentIndex--;
      carouselImg.src = carouselImages[currentIndex];
      updateArrows();
    }
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});
