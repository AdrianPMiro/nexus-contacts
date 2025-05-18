// src/js/main.js
const form     = document.getElementById('contactForm');
const list     = document.getElementById('contactsList');
const btnText  = document.getElementById('btnText');
const idField  = document.getElementById('contactId');
const flashBox = document.getElementById('flash');

render(); // dibuja la lista inicial

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  if (idField.value) {
    // EDITAR
    const idx = contactos.findIndex(c => c.id == data.contact_id);
    contactos[idx] = { ...data, id: +data.contact_id };
    flash('Contacto actualizado ✓');
  } else {
    // NUEVO
    contactos.push({ ...data, id: Date.now() });
    flash('Contacto añadido ✓');
  }

  form.reset();
  idField.value = '';
  btnText.textContent = 'Añadir Contacto';
  render();
});

list.addEventListener('click', e => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains('edit-btn')) {
    const contacto = contactos.find(c => c.id == id);
    document.getElementById('nombre').value   = contacto.nombre;
    document.getElementById('telefono').value = contacto.telefono;
    document.getElementById('email').value    = contacto.email;
    idField.value = contacto.id;
    btnText.textContent = 'Guardar Cambios';
  }

  if (e.target.classList.contains('delete-btn')) {
    contactos = contactos.filter(c => c.id != id);
    flash('Contacto eliminado ✗');
    render();
  }
});

function render() {
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

function flash(msg) {
  flashBox.textContent = msg;
  setTimeout(() => flashBox.textContent = '', 2500);
}
