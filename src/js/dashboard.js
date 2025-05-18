// src/js/dashboard.js
(function(){
	if (!sessionStorage.getItem('user')) {
	  window.location.href = 'login.html';
	  return;
	}
  
	const form     = document.getElementById('contactForm');
	const list     = document.getElementById('contactsList');
	const btnText  = document.getElementById('btnText');
	const idField  = document.getElementById('contactId');
	const flashBox = document.getElementById('flash');
	const logout   = document.getElementById('logoutBtn');
  
	logout.addEventListener('click', () => {
	  sessionStorage.removeItem('user');
	  window.location.href = 'login.html';
	});
  
	renderList();
  
	form.addEventListener('submit', e => {
	  e.preventDefault();
	  const data = Object.fromEntries(new FormData(form));
	  if (idField.value) {
		const idx = contactos.findIndex(c => c.id == data.contact_id);
		contactos[idx] = { ...data, id: +data.contact_id };
		flash('Contacto actualizado ✓');
	  } else {
		contactos.push({ ...data, id: Date.now() });
		flash('Contacto añadido ✓');
	  }
	  form.reset();
	  idField.value = '';
	  btnText.textContent = 'Añadir Contacto';
	  renderList();
	});
  
	list.addEventListener('click', e => {
	  const id = e.target.dataset.id;
	  if (!id) return;
	  if (e.target.classList.contains('edit-btn')) {
		const c = contactos.find(x => x.id == id);
		document.getElementById('nombre').value   = c.nombre;
		document.getElementById('telefono').value = c.telefono;
		document.getElementById('email').value    = c.email;
		idField.value = c.id;
		btnText.textContent = 'Guardar Cambios';
	  }
	  if (e.target.classList.contains('delete-btn')) {
		contactos = contactos.filter(x => x.id != id);
		flash('Contacto eliminado ✗');
		renderList();
	  }
	});
  
	function renderList(){
	  list.innerHTML = contactos.map(c => `
		<li class="contact-card">
		  <div class="contact-info">
			<span class="contact-name">${c.nombre}</span>
			<span class="contact-phone">📱 ${c.telefono}</span>
			<span class="contact-email">📧 ${c.email}</span>
		  </div>
		  <div class="contact-actions">
			<button class="action-btn edit-btn" data-id="${c.id}">✎ Editar</button>
			<button class="action-btn delete-btn" data-id="${c.id}">🗑 Eliminar</button>
		  </div>
		</li>
	  `).join('');
	}
  
	function flash(msg){
	  flashBox.textContent = msg;
	  setTimeout(() => flashBox.textContent = '', 2000);
	}
  })();
  