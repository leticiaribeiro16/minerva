document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  fetch('http://localhost:3000/users/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.acesso);
      window.location.href = `/${data.acesso}`;
    } else {
      alert('Authentication failed.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});