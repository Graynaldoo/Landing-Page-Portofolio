/* ============================================
   SCRIPT.JS – Portfolio Graynaldo Fahrul
   Student Edition
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  navbarScroll();
  scrollReveal();
  skillBars();
  projectFilter();
  contactForm();
  backToTop();
  smoothScroll();
});

/* ============================================
   1. NAVBAR – Scroll Effect + Active Link
   ============================================ */
function navbarScroll() {
  const nav = document.getElementById('mainNavbar');
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  const update = () => {
    // scrolled class
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.id;
      }
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================
   2. SCROLL REVEAL
   ============================================ */
function scrollReveal() {
  // tag elements automatically
  document.querySelectorAll('.section-head').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.05) + 's';
  });
  document.querySelectorAll('.skill-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.12) + 's';
  });
  document.querySelectorAll('.proj-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = ((i % 2) * 0.1) + 's';
  });
  document.querySelectorAll('.honest-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.about-card').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.contact-info-box').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.contact-form').forEach(el => el.classList.add('reveal-right'));
  document.querySelectorAll('.learning-note').forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => io.observe(el));
}

/* ============================================
   3. SKILL PROGRESS BARS
   ============================================ */
function skillBars() {
  const bars = document.querySelectorAll('.skill-prog .progress-bar');

  // save targets, reset width
  bars.forEach(bar => {
    const target = bar.getAttribute('data-target') || '0';
    bar.setAttribute('data-target', target);
    bar.style.width = '0%';
  });

  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  let done = false;
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      bars.forEach((bar, i) => {
        const t = bar.getAttribute('data-target');
        setTimeout(() => {
          bar.style.transition = 'width 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
          bar.style.width = t + '%';
        }, i * 100);
      });
    }
  }, { threshold: 0.3 });

  io.observe(skillsSection);
}

/* ============================================
   4. PROJECT FILTER
   ============================================ */
function projectFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.proj-item');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        if (match) {
          item.classList.remove('hidden');
          // re-trigger reveal
          item.querySelector('.proj-card')?.classList.remove('in');
          setTimeout(() => {
            item.querySelector('.proj-card')?.classList.add('in');
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================
   5. CONTACT FORM
   ============================================ */
function contactForm() {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('submitBtn');
  if (!form || !btn) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Simple validation highlight
    const inputs = form.querySelectorAll('[required]');
    let ok = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        ok = false;
        inp.style.borderColor = 'rgba(239,68,68,0.6)';
        inp.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.1)';
        inp.addEventListener('input', () => {
          inp.style.borderColor = '';
          inp.style.boxShadow   = '';
        }, { once: true });
      }
    });
    if (!ok) return;

    // Loading
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

    // Simulate send
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Terkirim! 🎉';
      btn.style.background = 'linear-gradient(135deg,#10b981,#06b6d4)';
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-send me-2"></i>Kirim Pesan';
        btn.style.background = '';
      }, 3500);
    }, 1800);
  });
}

/* ============================================
   6. BACK TO TOP
   ============================================ */
function backToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 380);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   7. SMOOTH SCROLL + CLOSE MOBILE MENU
   ============================================ */
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      // close mobile nav
      const collapse = document.getElementById('navbarNav');
      if (collapse?.classList.contains('show')) {
        document.querySelector('.navbar-toggler')?.click();
      }

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
