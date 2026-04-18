const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageEl = document.getElementById('message');

const DEMO_USER = {
  email: 'admin@demo.com',
  password: '123456',
};

const setMessage = (text, type = '') => {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`.trim();
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (!email || !password) {
    setMessage('Completa todos los campos.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    setMessage('Ingresa un correo válido.', 'error');
    return;
  }

  if (password.length < 6) {
    setMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setMessage('Validando credenciales...', '');

  setTimeout(() => {
    const isAuthorized =
      email === DEMO_USER.email && password === DEMO_USER.password;

    if (!isAuthorized) {
      setMessage('Credenciales incorrectas. Inténtalo de nuevo.', 'error');
      submitButton.disabled = false;
      return;
    }

    localStorage.setItem(
      'session',
      JSON.stringify({ user: DEMO_USER.email, loginAt: new Date().toISOString() })
    );

    setMessage('¡Login correcto! Redirigiendo...', 'success');

    setTimeout(() => {
      window.location.href = 'welcome.html';
    }, 700);
  }, 800);
});
