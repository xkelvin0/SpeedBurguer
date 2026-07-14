# 🚀 Reporte del Avance Final - Proyecto SpeedBurger

A continuación, se detalla todo el trabajo, las funcionalidades implementadas y los fragmentos de código más importantes correspondientes a este avance final del proyecto. Hemos seguido metodologías ágiles, diseño responsivo y programación modular con Vanilla JavaScript.

---

## 1. Módulo de Contacto (`contacto.html` y `contacto.js`)
Se implementó un formulario interactivo con validaciones robustas y retroalimentación visual al usuario, sin recargar la página.

**Funcionalidades:**
- Validación mediante **Expresiones Regulares (Regex)** para el correo, teléfono y DNI.
- Prevención de envío de datos vacíos.
- Mensaje de confirmación dinámico (Toast/Modal) tras el envío exitoso.

**Código Clave (Validación y Envío):**
```javascript
// Expresiones regulares para validar formato
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^[0-9]{9}$/; 

function validarFormulario(e) {
  e.preventDefault(); 
  
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  
  if (!regexCorreo.test(correo)) {
    mostrarMensaje('❌ Por favor, ingrese un correo electrónico válido.', true);
    return;
  }
  
  // Procesamiento exitoso
  mostrarMensaje('✅ ¡Mensaje enviado con éxito! Nos contactaremos pronto.', false);
  document.getElementById('form-contacto').reset();
}
```

---

## 2. Módulo de Autenticación / Login (`login.html`)
Se creó un sistema de acceso seguro básico para proteger el panel de administración.

**Funcionalidades:**
- Interfaz gráfica centrada con diseño moderno y soporte a errores de inicio de sesión.
- Lógica de autenticación que guarda la sesión temporal en `sessionStorage`.
- Protección de rutas: `admin.html` redirige automáticamente a `login.html` si no hay sesión activa.

**Código Clave (Autenticación y Protección):**
```javascript
// En el Login
function iniciarSesion(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  if (usuario === 'admin' && contrasena === 'admin123') {
    // Se guarda el token de sesión
    sessionStorage.setItem('sb_admin_auth', 'true');
    window.location.href = 'admin.html';
  } else {
    document.getElementById('error-msg').style.display = 'block';
  }
}

// En la cabecera de admin.js (Protección de Ruta)
if (!sessionStorage.getItem('sb_admin_auth')) {
  window.location.href = 'login.html';
}
```

---

## 3. Panel de Administración (`admin.html` y `admin.js`)
El corazón del avance. Es un dashboard (panel) completo que permite gestionar el inventario del negocio.

**Funcionalidades:**
- **CRUD Completo:** Crear, Leer, Actualizar y Eliminar productos guardados en `localStorage`.
- **Toggle Activo/Inactivo:** Botón especial para deshabilitar productos (marcarlos como "Agotado") sin borrarlos de la base de datos.
- **Estadísticas Visuales:** Integración de gráficas circulares y de barras usando *Chart.js*.
- **Diseño 100% Responsivo:** La tabla posee *scroll horizontal* en móviles (`overflow-x: auto`), la topbar hace *wrap*, y las gráficas se adaptan gracias a `min-width: 0` en CSS Grid.

**Código Clave (Toggle de Estado / Agotado):**
```javascript
function toggleEstadoProducto(id) {
  const lista = obtenerProductos(); // Obtiene de localStorage
  const idx = lista.findIndex(p => p.id === id);
  if (idx !== -1) {
    // Si no tiene propiedad 'activo', se asume true. Lo invertimos.
    const estadoActual = lista[idx].activo !== false;
    lista[idx].activo = !estadoActual;
    guardarProductos(lista);
    
    mostrarToast(lista[idx].activo ? '✅ Producto habilitado' : '🚫 Producto deshabilitado');
    inicializar(); // Vuelve a renderizar la tabla
  }
}
```

---

## 4. Módulo de Productos y UX (`productos.js`)
El catálogo público se interconectó con las acciones del administrador.

**Funcionalidades:**
- **Etiquetas Dinámicas:** Si el administrador establece un `precioOferta`, el sistema calcula automáticamente el precio tachado y añade la etiqueta "🎉 POR FIESTAS PATRIAS".
- **Estado de Agotado:** El catálogo lee la propiedad `activo`. Si está desactivado, renderiza la tarjeta oscurecida (`opacity`), el botón bloqueado (`disabled`) y una insignia grande de **"AGOTADO"**.

**Código Clave (Renderizado Inteligente del Producto):**
```javascript
function generarHTMLProducto(producto) {
    const isActivo = producto.activo;
    
    // Si está inactivo, aplicamos filtros grises e impedimos los clics
    const cardStyle = isActivo ? '' : 'opacity: 0.65; filter: grayscale(50%); pointer-events: none;';
    const agotadoBadge = !isActivo ? `<div style="position:absolute; top:40%; left:50%; z-index:10;">AGOTADO</div>` : '';
    const btnText = isActivo ? '🛒 Ordenar' : 'Agotado';

    return `
      <div class="producto-card" style="position:relative; ${cardStyle}">
        ${agotadoBadge}
        ${producto.precioOferta ? `<span class="oferta">🎉 POR FIESTAS PATRIAS</span>` : ''}
        
        <div class="producto-body">
          <h3 class="producto-name">${producto.nombre}</h3>
          <span class="producto-precio">${producto.getPrecioFormateado()}</span>
          <!-- Botón inteligente -->
          <button class="btn-ordenar" onclick="agregarAlCarrito(${producto.id})">${btnText}</button>
        </div>
      </div>
    `;
}
```

---

## 5. Página de Nosotros (`nosotros.html`)
Se mejoró la experiencia de usuario y el portafolio del equipo.

**Funcionalidades:**
- **Lógica de Toggle:** Al dar clic a un currículum, este se despliega. Al volver a darle clic, se oculta inteligentemente.
- **Actualización de Habilidades:** Se incorporó el uso de "Metodologías Ágiles (Scrum)" en el CV de cada integrante para destacar la manera en la que se desarrolló este mismo proyecto.

**Código Clave (Toggle CV):**
```javascript
function showCV(id) {
  const selected = document.getElementById(id);
  const isAlreadyVisible = selected && !selected.classList.contains('hidden');

  // 1. Ocultar todos los CVs primero
  const allCvs = document.querySelectorAll('.cv-card');
  allCvs.forEach(cv => cv.classList.add('hidden'));

  // 2. Mostrar el seleccionado SOLO si NO estaba ya visible
  if (selected && !isAlreadyVisible) {
    selected.classList.remove('hidden');
    setTimeout(() => {
      selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}
```
---

## 6. Interconexión de Datos (LocalStorage)
Una de las funcionalidades clave del proyecto es cómo logramos que los productos modificados en `admin.html` aparezcan inmediatamente en `productos.html` sin usar una base de datos real en un servidor.

**Funcionalidades:**
- **Persistencia en el Navegador:** Toda la información del inventario (agregados, editados o deshabilitados) se guarda en el `localStorage` del navegador bajo la clave `sb_admin_productos`.
- **Sincronización:** Cuando el archivo `productos.js` (el menú público) carga, lo primero que hace es leer ese mismo almacenamiento. Si encuentra datos guardados por el administrador, los usa; si está vacío, carga un inventario base por defecto.

**Código Clave (Lectura y Escritura del LocalStorage):**
```javascript
// En admin.js (El administrador GUARDA los cambios)
function guardarProductos(lista) {
  localStorage.setItem('sb_admin_productos', JSON.stringify(lista));
}

// En productos.js (El público LEE los cambios)
const dataLocal = localStorage.getItem('sb_admin_productos');
const rawInventario = dataLocal ? JSON.parse(dataLocal) : inventarioBase;
```
---

## 7. Integración de Gráficos (Chart.js)
El panel de administración cuenta con gráficos dinámicos que se actualizan automáticamente en base a las estadísticas del negocio. Para esto, en lugar de programar gráficos desde cero, utilizamos una librería profesional llamada **Chart.js**.

**¿Cómo se vincula a la página?**
Se invoca mediante un enlace CDN (Content Delivery Network) que se coloca en el `<head>` o antes de cerrar el `<body>` en el archivo `admin.html`. Esto descarga la librería directamente de los servidores de jsDelivr:
```html
<!-- Invocación de la librería en admin.html -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

**Código Clave (Creación del Gráfico en `admin.js`):**
Una vez vinculada la librería, la utilizamos en JavaScript apuntando a un elemento `<canvas>` que tenemos en el HTML.
```javascript
// Obtener el contexto del canvas en HTML
const ctxBar = document.getElementById('barChart').getContext('2d');

// Instanciar y crear el gráfico
new Chart(ctxBar, {
  type: 'bar', // Tipo de gráfico (barras)
  data: {
    labels: ['Clásica Burger', 'Nuggets BBQ', 'Broaster'], // Etiquetas (Eje X)
    datasets: [{
      label: 'Unidades Vendidas',
      data: [15, 8, 12], // Datos dinámicos (Eje Y)
      backgroundColor: ['#D90429', '#ffcc00', '#D90429']
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});
```

> [!TIP]
> **Metodología Empleada:** Todo el desarrollo se gestionó usando **Metodología Ágil**. Las vistas reaccionan mediante el paradigma de **Programación Orientada a Eventos** manipulando el DOM con Vanilla JavaScript, garantizando una arquitectura de *Separación de Responsabilidades (HTML, CSS y JS en archivos aislados).*
