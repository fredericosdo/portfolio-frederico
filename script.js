/* 
  JavaScript obrigatório da atividade.
  Neste arquivo estão: menu mobile, tema claro/escuro, destaque do menu ativo
  e validação/simulação de envio do formulário de contato.
*/

const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('main section[id]');
const currentYear = document.getElementById('current-year');
const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

currentYear.textContent = new Date().getFullYear();

// Abre e fecha o menu em telas menores
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fecha o menu ao clicar em um link da navegação
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Aplica o tema salvo anteriormente no navegador
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeIcon.textContent = '☀️';
}

// Alterna entre tema claro e escuro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const darkModeActive = document.body.classList.contains('dark-theme');
  localStorage.setItem('portfolio-theme', darkModeActive ? 'dark' : 'light');
  themeIcon.textContent = darkModeActive ? '☀️' : '🌙';
});

// Destaca no menu a seção que está visível no momento
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.55 });

sections.forEach((section) => observer.observe(section));

// Funções auxiliares de validação do formulário
function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  field.classList.add('error-field');
  error.textContent = message;
}

function clearError(fieldName) {
  const field = document.getElementById(fieldName);
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  field.classList.remove('error-field');
  error.textContent = '';
}

function validEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Validação obrigatória com simulação de envio
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  let formIsValid = true;
  statusMessage.textContent = '';

  if (!nome) {
    showError('nome', 'Informe seu nome.');
    formIsValid = false;
  } else {
    clearError('nome');
  }

  if (!email) {
    showError('email', 'Informe seu e-mail.');
    formIsValid = false;
  } else if (!validEmail(email)) {
    showError('email', 'Digite um e-mail válido. Exemplo: usuario@dominio.com');
    formIsValid = false;
  } else {
    clearError('email');
  }

  if (!mensagem) {
    showError('mensagem', 'Escreva sua mensagem.');
    formIsValid = false;
  } else {
    clearError('mensagem');
  }

  if (!formIsValid) {
    statusMessage.textContent = 'Corrija os campos destacados para continuar.';
    return;
  }

  form.reset();
  statusMessage.textContent = 'Mensagem enviada com sucesso!';
  alert('Mensagem enviada com sucesso!');
});
