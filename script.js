document.addEventListener('DOMContentLoaded', () => {
  const experiences = [
    {
      title: 'Front-end Developer',
      desc: 'Crafted responsive web apps and portfolio pages with clean HTML structure and smooth CSS transitions.',
      period: '2024 - Present',
    },
    {
      title: 'UI Designer',
      desc: 'Designed friendly user interfaces with modern layouts, colors, and readable typography.',
      period: '2022 - 2024',
    },
    {
      title: 'JavaScript Creator',
      desc: 'Built interactive widgets, sliders, and animations to bring each page to life.',
      period: '2020 - 2022',
    },
  ];

  const achievements = [
    {
      title: 'International competition',
      desc: 'Secured a bronze medal in the Dr.CT competition in 2024.',
    },
    {
      title: 'Design system',
      desc: 'Created reusable UI cards, buttons, and color themes for faster development.',
    },
    {
      title: 'Interactive features',
      desc: 'Built a custom slider and animated hero section using vanilla JavaScript.',
    },
  ];

  const slidesContainer = document.querySelector('.slides-container');
  const dotsContainer = document.getElementById('dots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const achievementsGrid = document.getElementById('achievementsGrid');
  const loader = document.getElementById('pageLoader');
  const backToTopButton = document.getElementById('backToTop');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  let currentSlide = 0;

  function renderExperiences() {
    experiences.forEach((exp, idx) => {
      const article = document.createElement('article');
      article.className = 'slide' + (idx === 0 ? ' active' : '');
      article.dataset.index = idx;
      article.innerHTML = `
        <h3>${exp.title}</h3>
        <p>${exp.desc}</p>
        <span>${exp.period}</span>
      `;
      slidesContainer.appendChild(article);
    });
  }

  function renderAchievements() {
    achievements.forEach((a) => {
      const card = document.createElement('article');
      card.innerHTML = `
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
      `;
      achievementsGrid.appendChild(card);
    });
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    const slides = document.querySelectorAll('.slide');
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      if (idx === currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => updateSlider(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = dotsContainer.querySelectorAll('button');
    if (!slides.length || !dots.length) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
  }

  function hideLoader() {
    loader.classList.add('hidden');
    document.body.classList.remove('is-loading');
  }

  function setupRevealAnimations() {
    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function setupActiveNav() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const isActive = link.getAttribute('href') === `#${entry.target.id}`;
              link.classList.toggle('active', isActive);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  renderExperiences();
  renderAchievements();
  createDots();

  initializeTheme();
  setupRevealAnimations();
  setupActiveNav();

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  setTimeout(hideLoader, 700);

  prevBtn.addEventListener('click', () => updateSlider(currentSlide - 1));
  nextBtn.addEventListener('click', () => updateSlider(currentSlide + 1));

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    updateThemeButton(nextTheme);
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('show', window.scrollY > 560);
  });
});
