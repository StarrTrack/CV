/* script.js — меню, smooth-scroll, reveal animations */
(function () {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('topNav');
  const downloadBtn = document.getElementById('downloadCvBtn');

  /* BURGER MENU (mobile) */
  if (burger) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      if (!open) {
        nav.style.display = 'block';
        nav.setAttribute('aria-hidden', 'false');
        setTimeout(() => nav.classList.add('nav--visible'), 10);
      } else {
        nav.classList.remove('nav--visible');
        nav.setAttribute('aria-hidden', 'true');
        setTimeout(() => (nav.style.display = ''), 300);
      }
    });
  }

  /* NAV LINKS: smooth scroll + auto-close mobile nav */
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (window.innerWidth <= 900 && burger) {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--visible');
        nav.style.display = '';
        nav.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // fallback for any anchor on page
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* DOWNLOAD: link already points to /assets/Resume_Petr_Starr.pdf */
  if (downloadBtn) {
    // If you later want analytics or a custom flow, you can attach here.
    downloadBtn.addEventListener('click', () => {
      // default behaviour opens link in new tab because of target="_blank"
    });
  }

  /* REVEAL ANIMATIONS: sections + cards */
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((sec) => observer.observe(sec));
  cards.forEach((c, i) => {
    setTimeout(() => observer.observe(c), i * 110);
  });
})();
