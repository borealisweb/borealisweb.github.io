(function(){
  const DURATION = 360; 

  
  let overlay = document.querySelector('.page-transition');
  function createOverlay() {
    const el = document.createElement('div');
    el.className = 'page-transition page-transition--visible';
    el.setAttribute('aria-hidden', 'true');
    if (document.body) {
      document.body.prepend(el);
    } else {

      window.addEventListener('DOMContentLoaded', () => document.body.prepend(el), { once: true });
    }
    return el;
  }
  if (!overlay) overlay = createOverlay();

  function hideOverlay() {
    if (!overlay) return;
    overlay.classList.remove('page-transition--visible');
  }
  function showOverlay() {
    if (!overlay) return;
    overlay.classList.add('page-transition--visible');
  }



  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => setTimeout(hideOverlay, 40));
  });

  document.addEventListener('click', (ev) => {
    const a = ev.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href) return;


    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (a.target && a.target === '_blank') return;
    if (a.hasAttribute('download')) return;
    if (a.dataset && a.dataset.noTransition !== undefined) return;

    let url;
    try {
      url = new URL(href, location.href);
    } catch (e) { return; }
    if (url.origin !== location.origin) return;

    function normPath(u){
      return (u.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/').toLowerCase() + (u.search || '');
    }

    const currentNorm = normPath(location);
    const targetNorm = normPath(url);


    if (currentNorm === targetNorm) {
      ev.preventDefault();

      
      if (url.hash && document.querySelector(url.hash)) {
        document.querySelector(url.hash).scrollIntoView({ behavior: 'smooth' });
        return;
      }

      
      hideOverlay();
      return;
    }

    ev.preventDefault();
    showOverlay();
    setTimeout(() => { location.href = url.href; }, DURATION);
  }, true);

  
  document.addEventListener('submit', (ev) => {
    const form = ev.target;
    if (!form || form.tagName !== 'FORM') return;
    if (form.target && form.target === '_blank') return;
    if (form.dataset && form.dataset.noTransition !== undefined) return;

    const action = form.getAttribute('action') || location.href;
    let url;
    try { url = new URL(action, location.href); } catch (e) { return; }
    if (url.origin !== location.origin) return;

    ev.preventDefault();
    showOverlay();
    setTimeout(() => { form.submit(); }, DURATION);
  }, true);

 
  window.addEventListener('beforeunload', () => {
    showOverlay();
  });

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) hideOverlay();
  });
})();