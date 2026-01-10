// Modal functionality and grid adjustment for soluciones-creativas portfolio
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementById('closeModal');

  document.querySelectorAll('.portfolio-item img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.add('active');
    });
  });

  function close() {
    modal.classList.remove('active');
  }

  closeModal.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });


  window.addEventListener('load', () => {
    const grid = document.querySelector('.portfolio-grid');
    const allItems = document.querySelectorAll('.portfolio-item');
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));

    allItems.forEach(item => {
      const img = item.querySelector('img');
      const span = Math.ceil((img.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${span}`;
    });
  });
});
