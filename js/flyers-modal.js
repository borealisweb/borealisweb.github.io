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
});
