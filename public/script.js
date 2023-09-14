const passwordField = document.getElementById('password-field');
const togglePassword = document.getElementById('toggle-password');

togglePassword.addEventListener('click', function () {
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    togglePassword.src = 'img/hide.png'; // שינוי לתמונה של עין סגורה
  } else {
    passwordField.type = 'password';
    togglePassword.src = 'img/view.png'; // שינוי לתמונה של עין פתוחה
  }
});