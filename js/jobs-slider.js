document.addEventListener("DOMContentLoaded", () => {
  const jobsSlides = document.querySelectorAll('.jobs-slide');
  const prevBtn = document.querySelector('.jobs-prev');
  const nextBtn = document.querySelector('.jobs-next');
  const jobsSlider = document.querySelector('.jobs-slider');
  
  if (jobsSlides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;
  const autoSlideDelay = 5000; 
  
  function updateSliderHeight() {
    if (jobsSlider && jobsSlides[currentSlide]) {
      const activeSlide = jobsSlides[currentSlide];
      const slideHeight = activeSlide.offsetHeight;
      jobsSlider.style.height = slideHeight + 'px';
    }
  }
  
  function showSlide(index) {
    if (index < 0) {
      currentSlide = jobsSlides.length - 1;
    } else if (index >= jobsSlides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    

    jobsSlides.forEach(slide => slide.classList.remove('active-jobs-slide'));
    

    jobsSlides[currentSlide].classList.add('active-jobs-slide');
    
   
    updateSliderHeight();
    
    
    resetInterval();
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  function startInterval() {
    slideInterval = setInterval(nextSlide, autoSlideDelay);
  }
  
  function stopInterval() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }
  
  function resetInterval() {
    stopInterval();
    startInterval();
  }
  

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  }
  

  const sliderContainer = document.querySelector('.jobs-slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopInterval);
    sliderContainer.addEventListener('mouseleave', startInterval);
  }
  

  showSlide(0);
  

  window.addEventListener('resize', updateSliderHeight);
  

  let touchStartX = 0;
  let touchEndX = 0;
  
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopInterval();
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startInterval();
    });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide(); 
      }
    }
  }
});
