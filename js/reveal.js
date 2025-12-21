function iniciarAnimacionScroll() {
  const elementos = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elementos.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', iniciarAnimacionScroll);


document.addEventListener("DOMContentLoaded", () => {
  const extraImg = document.querySelector(".keluli-extra");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          extraImg.classList.add("visible");
          observer.unobserve(extraImg);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(extraImg);
});
