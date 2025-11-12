const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Carregar preferência salva
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
}

// Alternar tema
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');

  // Muda ícone
  themeIcon.classList.toggle('bi-moon-fill', !isDark);
  themeIcon.classList.toggle('bi-sun-fill', isDark);

  // Salva preferência
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
