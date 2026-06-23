// Navbar scroll
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  const btnTop = document.getElementById('btnTop');

  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(17, 17, 17, 0.98)';
  } else {
    navbar.style.background = 'rgba(26, 26, 26, 0.95)';
  }

  if (window.scrollY > 400) {
    btnTop.classList.add('show');
  } else {
    btnTop.classList.remove('show');
  }
});

// Menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const navbarLinks = document.getElementById('navbar-links');

if (menuToggle && navbarLinks) {
  menuToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    menuToggle.textContent = navbarLinks.classList.contains('active') ? '✕' : '☰';
  });
}

// Envío del formulario de opinión
function enviarOpinion(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const tipo = document.getElementById('tipo').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  const calificacion = document.querySelector('input[name="calificacion"]:checked');

  if (!calificacion) {
    alert('Por favor selecciona una calificación con estrellas.');
    return;
  }

  const stars = parseInt(calificacion.value);
  const starStr = '★'.repeat(stars) + '☆'.repeat(5 - stars);
  const inicial = nombre.charAt(0).toUpperCase();

  // Crear nueva tarjeta de opinión
  const card = document.createElement('div');
  card.className = 'opinion-card';
  card.innerHTML = `
    <div class="opinion-stars">${starStr}</div>
    <p class="opinion-text">"${mensaje}"</p>
    <div class="opinion-autor">
      <div class="opinion-avatar">${inicial}</div>
      <div>
        <div class="opinion-nombre">${nombre}</div>
        <div class="opinion-fecha">${tipo.charAt(0).toUpperCase() + tipo.slice(1)} · Junio 2026</div>
      </div>
    </div>
  `;

  // Agregar al inicio de las opiniones
  const grid = document.getElementById('opiniones-grid');
  grid.insertBefore(card, grid.firstChild);

  // Mostrar mensaje de éxito y ocultar formulario
  document.getElementById('form-opinion').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';

  // Scroll hacia las opiniones
  setTimeout(() => {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 600);
}
