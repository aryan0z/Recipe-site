document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const errorDiv = document.getElementById('error');

  if (!loginForm || !errorDiv) {
    console.error('Login form or error div not found');
    return;
  }

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';

    if (!email || !password) {
      errorDiv.textContent = 'Please fill in all fields';
      errorDiv.classList.remove('hidden');
      return;
    }

    const formData = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    fetch('login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        window.location.href = 'index.html';
      } else {
        errorDiv.textContent = data.message || 'Invalid details';
        errorDiv.classList.remove('hidden');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      errorDiv.textContent = 'Server error. Please try again later.';
      errorDiv.classList.remove('hidden');
    });
  });
});