/* ===== SimpleTrade – Main Script ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Smooth-scroll nav links ---- */
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a:not(.close-btn)');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      // close mobile menu if open
      document.getElementById('mobileMenu')?.classList.remove('open');
    });
  });

  /* ---- "Join Waitlist" buttons in navbar scroll to CTA ---- */
  document.querySelectorAll('.nav-waitlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cta = document.getElementById('cta');
      if (cta) {
        const top = cta.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Mobile hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobile');
  if (hamburger) hamburger.addEventListener('click', () => mobileMenu?.classList.add('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => mobileMenu?.classList.remove('open'));

  /* ---- Navbar scroll shadow ---- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const updateActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  };
  window.addEventListener('scroll', updateActiveLink);

  /* ---- Email validation helper ---- */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- Wire up hero waitlist form ---- */
  const heroForm = document.getElementById('heroForm');
  if (heroForm) {
    heroForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = heroForm.querySelector('input[type="email"]');
      const msg = heroForm.querySelector('.form-message');
      input.classList.remove('error', 'success');
      msg.classList.remove('visible', 'success-msg', 'error-msg');

      if (validateEmail(input.value.trim())) {
        input.classList.add('success');
        msg.textContent = `You're on the list, ${input.value.trim()}!`;
        msg.classList.add('visible', 'success-msg');
        input.value = '';
        setTimeout(() => { msg.classList.remove('visible'); input.classList.remove('success'); }, 4000);
      } else {
        input.classList.add('error');
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.add('visible', 'error-msg');
        input.addEventListener('animationend', () => input.classList.remove('error'), { once: true });
      }
    });
  }

  /* ---- Wire up CTA waitlist form ---- */
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = ctaForm.querySelector('input[type="email"]');
      const msg = ctaForm.querySelector('.cta-form-message');
      input.classList.remove('error', 'success');

      if (validateEmail(input.value.trim())) {
        input.classList.add('success');
        msg.textContent = `You're on the list, ${input.value.trim()}!`;
        msg.style.color = '#5ddda1';
        input.value = '';
        setTimeout(() => { msg.textContent = ''; input.classList.remove('success'); }, 4000);
      } else {
        input.classList.add('error');
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#ff6b6b';
        input.addEventListener('animationend', () => input.classList.remove('error'), { once: true });
      }
    });
  }

  /* ---- Intersection Observer – reveal animations ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---- Drop & Deploy block animation ---- */
  const ddObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.dd-block--trigger, .dd-block--action, .dd-arrow').forEach(el => {
          el.classList.add('animate');
        });
        ddObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.dd-visual').forEach(el => ddObserver.observe(el));

  /* ---- Stagger children animation (pillar cards, pricing, etc.) ---- */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.stagger-child');
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 150);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.stagger-parent').forEach(el => staggerObserver.observe(el));
});
