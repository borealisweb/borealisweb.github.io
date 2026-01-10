// Hover effects for portfolio items
document.addEventListener('DOMContentLoaded', function() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.body.classList.add('gallery-hover');
    });
    
    item.addEventListener('mouseleave', () => {
      document.body.classList.remove('gallery-hover');
    });
  });
});
