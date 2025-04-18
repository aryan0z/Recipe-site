document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  const errorDiv = document.getElementById('error');

  if (!signupForm || !errorDiv) {
    console.error('Signup form or error div not found');
    return;
  }

  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Reset error state
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');

    // Client-side validation
    if (!email || !password || !confirmPassword) {
      errorDiv.textContent = 'Please fill in all fields';
      errorDiv.classList.remove('hidden');
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.textContent = 'Passwords do not match';
      errorDiv.classList.remove('hidden');
      return;
    }

    // Prepare form data
    const formData = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&confirmPassword=${encodeURIComponent(confirmPassword)}`;

    // Send request to signup.php
    fetch('signup.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
        window.location.href = 'login.html';
      } else {
        errorDiv.textContent = data.message || 'Signup failed';
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