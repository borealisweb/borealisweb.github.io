document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.mission-statement-banner');
  if (banner) {
    const handleScroll = () => {
      const rect = banner.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const windowWidth = window.innerWidth;
      if (windowWidth < 1024) return; // Deshabilitar en móviles y tablets

      if (rect.top < windowHeight && rect.bottom > 0) {
        let progress = (windowHeight - rect.top) / windowHeight;
        progress = Math.min(Math.max(progress, 0), 1);


        const scale = 1.15 - (0.15 * progress);
        banner.style.setProperty('--bg-scale', scale);
      } else {
        banner.style.setProperty('--bg-scale', '1');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  const statsSection = document.querySelector('.stats-section');
  const statsContainer = document.querySelector('.stats-container');
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statsContainer && statNumbers.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const easeProgress = 1 - Math.pow(1 - progress, 3);
        obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          obj.innerHTML = end;
        }
      };
      window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            animateValue(stat, 0, target, 2000);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statsObserver.observe(statsContainer);
  }


  const pinSection = document.getElementById('valores-pin-section');
  const scrollTrack = document.getElementById('valores-scroll-track');

  if (pinSection && scrollTrack) {
    const handlePinScroll = () => {
      const rect = pinSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance > 0) {
        let progress = -rect.top / scrollableDistance;
        progress = Math.max(0, Math.min(1, progress));

        const trackHeight = scrollTrack.scrollHeight;
        const windowBoxHeight = scrollTrack.parentElement.clientHeight;

        const maxTranslate = trackHeight - windowBoxHeight;

        if (maxTranslate > 0) {
          scrollTrack.style.transform = `translateY(-${progress * maxTranslate}px)`;
        }
      }
    };

    window.addEventListener('scroll', handlePinScroll, { passive: true });
    window.addEventListener('resize', handlePinScroll, { passive: true });

    handlePinScroll();
  }


  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const ctaSection = document.querySelector('.final-cta');
    const ctaCard = document.querySelector('.final-cta-card');

    if (ctaSection && ctaCard) {
      const isMobile = window.innerWidth < 1085;
      
      if (!isMobile) {
        gsap.to(ctaCard, {
          scrollTrigger: {
            trigger: ctaSection,
            start: "top center",
            end: "bottom bottom",
            scrub: 1,
          },
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          borderRadius: "0px",
          padding: "2rem 2rem",
          duration: 1
        });
      } else {
        gsap.set(ctaCard, {
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          borderRadius: "0px",
          padding: "3rem 1.5rem"
        });
      }
    }
  }
});
