document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    function closeMenu() {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      siteNav.classList.remove('is-open');
    }

    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      siteNav.classList.toggle('is-open', !isOpen);
    });

    siteNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  const countdownElement = document.querySelector('[data-countdown]');

  if (countdownElement) {
    const weddingDate = new Date('2027-03-27T00:00:00');

    function updateCountdown() {
      const now = new Date();
      const distance = weddingDate.getTime() - now.getTime();

      if (distance <= 0) {
        countdownElement.innerHTML = '<span>We are married!</span>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
      const renderUnit = function (value, singularLabel, pluralLabel) {
        const label = value === 1 ? singularLabel : pluralLabel;
        return `<span><strong class="countdown-number">${value}</strong><small class="countdown-unit-label">${label}</small></span>`;
      };

      countdownElement.innerHTML = `
        ${renderUnit(days, 'Day', 'Days')}
        ${renderUnit(hours, 'Hour', 'Hours')}
        ${renderUnit(minutes, 'Minute', 'Minutes')}
        ${renderUnit(seconds, 'Second', 'Seconds')}
      `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.parentElement;
      const expanded = button.getAttribute('aria-expanded') === 'true';

      faqButtons.forEach(function (otherButton) {
        const otherItem = otherButton.parentElement;
        otherButton.setAttribute('aria-expanded', 'false');
        otherItem.classList.remove('open');
      });

      if (!expanded) {
        button.setAttribute('aria-expanded', 'true');
        item.classList.add('open');
      }
    });
  });
});
