// src/js/login.js

(function(){
	const loginForm = document.getElementById('loginForm');
	const loginMsg  = document.getElementById('loginMsg');
  
	loginForm.addEventListener('submit', e => {
	  e.preventDefault();
	  const user = document.getElementById('loginUser').value.trim();
	  const pass = document.getElementById('loginPass').value.trim();
  
	  // usa el array global usuarios definido en datos.js
	  const valid = usuarios.find(u => u.usuario === user && u.password === pass);
  
	  if (valid) {
		sessionStorage.setItem('user', user);
		window.location.href = 'dashboard.html'; // o 'index.php'
	  } else {
		loginMsg.textContent = 'Usuario o contraseña incorrectos';
		loginMsg.className = 'flash error';
		setTimeout(() => {
		  loginMsg.textContent = '';
		  loginMsg.className = 'flash';
		}, 2500);
	  }
	});
  })();
  