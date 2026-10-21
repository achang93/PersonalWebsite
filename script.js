(() => {
  'use strict';

  // Keep the entire portfolio readable when JavaScript is unavailable.
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const mobileQuery = window.matchMedia('(max-width: 700px)');
  menuButton.hidden = false;

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  mobileQuery.addEventListener('change', closeMenu);

  const cards = [...document.querySelectorAll('.project-card')];
  const filterButtons = [...document.querySelectorAll('.filter')];
  const projectCount = document.querySelector('.project-count');
  document.querySelector('.project-toolbar').hidden = false;
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach(filter => {
        const active = filter === button;
        filter.classList.toggle('active', active);
        filter.setAttribute('aria-pressed', String(active));
      });
      let count = 0;
      cards.forEach(card => {
        const visible = category === 'all' || card.dataset.categories.split(' ').includes(category);
        card.hidden = !visible;
        if (visible) count += 1;
      });
      projectCount.textContent = `${count} project${count === 1 ? '' : 's'}`;
      updateNavigation();
    });
  });

  const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
  const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  const progress = document.querySelector('.reading-progress');
  const header = document.querySelector('.site-header');
  let scrollQueued = false;
  function updateNavigation() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0})`;
    let activeIndex = -1;
    navSections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= 160) activeIndex = index;
    });
    navLinks.forEach((link, index) => {
      if (index === activeIndex) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation, { passive: true });
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', updateNavigation));
  updateNavigation();

  document.getElementById('year').textContent = new Date().getFullYear();
  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('.copy-status');
  if (navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    let resetCopy;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('albertchang96@gmail.com');
        clearTimeout(resetCopy);
        copyStatus.textContent = 'Email address copied to clipboard.';
        copyButton.firstChild.textContent = 'Copied! ';
        resetCopy = setTimeout(() => {
          copyButton.firstChild.textContent = 'Copy email ';
          copyStatus.textContent = '';
        }, 2500);
      } catch {
        copyButton.firstChild.textContent = 'Copy unavailable ';
        copyStatus.textContent = 'Could not copy. Use the email address below or the Say hello link.';
      }
    });
  }

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverPreference = window.matchMedia('(hover: hover) and (pointer: fine)');
  const chromeSurfaces = [...document.querySelectorAll(
    '.experience-item, .project-card'
  )];
  let chromeFrame = 0;
  let chromePointer;

  // Decorative overlays leave the original borders, content, and hit targets intact.
  chromeSurfaces.forEach(surface => {
    surface.classList.add('chrome-surface');
    // Details use a host pseudo-element so the border remains visible when closed
    // and follows the entire entry when its content expands.
    if (!surface.matches('.experience-item')) {
      const border = document.createElement('span');
      border.className = 'chrome-border';
      border.setAttribute('aria-hidden', 'true');
      surface.append(border);
    }

    surface.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !hoverPreference.matches || motionPreference.matches) return;
      chromePointer = { surface, x: event.clientX, y: event.clientY };
      if (chromeFrame) return;
      chromeFrame = requestAnimationFrame(() => {
        chromeFrame = 0;
        if (!chromePointer) return;
        const { surface: target, x, y } = chromePointer;
        const rect = target.getBoundingClientRect();
        const localX = Math.max(0, Math.min(rect.width, x - rect.left));
        const localY = Math.max(0, Math.min(rect.height, y - rect.top));
        const angle = Math.atan2(localY - rect.height / 2, localX - rect.width / 2) * 180 / Math.PI;
        target.style.setProperty('--chrome-x', `${localX.toFixed(1)}px`);
        target.style.setProperty('--chrome-y', `${localY.toFixed(1)}px`);
        target.style.setProperty('--chrome-angle', `${(angle + 90).toFixed(1)}deg`);
      });
    }, { passive: true });
    surface.addEventListener('pointerleave', () => {
      if (chromePointer?.surface === surface) chromePointer = undefined;
    });
  });

  function resetChromeMotion() {
    cancelAnimationFrame(chromeFrame);
    chromeFrame = 0;
    chromePointer = undefined;
    chromeSurfaces.forEach(surface => {
      ['--chrome-x', '--chrome-y', '--chrome-angle'].forEach(property => surface.style.removeProperty(property));
    });
  }
  motionPreference.addEventListener('change', resetChromeMotion);
  hoverPreference.addEventListener('change', resetChromeMotion);
  window.addEventListener('blur', resetChromeMotion);

  // Enhance scrolling only when supported. Content is visible by default.
  if (!('IntersectionObserver' in window)) return;
  const revealTargets = [...document.querySelectorAll(
    '.education, .proof-item, .section-heading, .experience-item, .project-card, ' +
    '.skill-group, .contact-top, #contact-heading, .contact-bottom, .email-address'
  )];
  const revealed = new WeakSet();
  let revealObserver;

  // Once a divider has shimmered, filtering never restarts its animation.
  document.addEventListener('animationend', event => {
    if (event.animationName === 'rule-scan' && event.target.matches('.project-card, .skill-group')) {
      event.target.classList.add('signal-complete');
    }
  });

  // Short, per-row delays keep each group cohesive without slowing navigation.
  ['.proof-band', '.projects-grid', '.skill-groups'].forEach(selector => {
    const group = document.querySelector(selector);
    const columns = selector === '.skill-groups' ? 3 : 2;
    [...group.children].forEach((target, index) => {
      target.style.setProperty('--reveal-delay', `${(index % columns) * 50}ms`);
    });
  });

  function reveal(target) {
    target.classList.add('is-revealed');
    revealed.add(target);
    revealObserver?.unobserve(target);
  }

  function configureScrollEffects() {
    revealObserver?.disconnect();
    document.documentElement.classList.remove('scroll-motion');
    if (motionPreference.matches) return;

    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    revealTargets.forEach(target => {
      target.classList.add('scroll-reveal');
      // Don't hide content already on screen, including a restored scroll position.
      if (revealed.has(target) || target.getBoundingClientRect().top < window.innerHeight - 24) {
        reveal(target);
      } else {
        target.classList.remove('is-revealed');
        revealObserver.observe(target);
      }
    });
    document.documentElement.classList.add('scroll-motion');

  }

  // Keyboard focus and browser find should never land on transparent content.
  document.addEventListener('focusin', event => {
    const target = event.target.closest('.scroll-reveal');
    if (target) reveal(target);
  });
  document.addEventListener('beforematch', event => {
    const target = event.target.closest('.scroll-reveal');
    if (target) reveal(target);
  });
  motionPreference.addEventListener('change', configureScrollEffects);
  window.addEventListener('pageshow', configureScrollEffects);
  configureScrollEffects();
})();
