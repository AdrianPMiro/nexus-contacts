// src/js/register.js

(function(){
	const registerForm = document.getElementById('registerForm');
	const regMsg       = document.getElementById('regMsg');
  
	registerForm.addEventListener('submit', e => {
	  e.preventDefault();
	  const user = document.getElementById('regUser').value.trim();
	  const pass = document.getElementById('regPass').value.trim();
  
	  // usa el array global usuarios definido en datos.js
	  if (usuarios.find(u => u.usuario === user)) {
		regMsg.textContent = 'Usuario ya existe';
		regMsg.className = 'flash error';
	  } else {
		usuarios.push({ usuario: user, password: pass });
		regMsg.textContent = 'Cuenta creada ✓';
		regMsg.className = 'flash success';
		registerForm.reset();
	  }
  
	  setTimeout(() => {
		regMsg.textContent = '';
		regMsg.className = 'flash';
	  }, 2500);
	});
  })();
  