/**
 * Main JavaScript for Afif Athaullah Pranaja Portfolio
 * Handles live clock and dark/light theme switching with persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Live Malang, Indonesia (WIB) Clock
  const clock = document.getElementById('malang-time');
  if (clock) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const updateClock = () => {
      try {
        clock.textContent = `${formatter.format(new Date())} WIB`;
      } catch (e) {
        clock.textContent = new Date().toLocaleTimeString();
      }
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  // Theme Toggle with LocalStorage persistence
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggle && themeIcon) {
    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light');
      themeIcon.setAttribute('href', '#i-sun');
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }

    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      themeIcon.setAttribute('href', isLight ? '#i-sun' : '#i-moon');
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
    });
  }
});
