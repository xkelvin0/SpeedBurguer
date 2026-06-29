// ============================================
// LÓGICA DE PRODUCTOS (AVANCE 2)
// Array List, Constructores, Métodos, Búsqueda
// ============================================

// 1. CONSTRUCTOR / CLASE DE PRODUCTO
class Producto {
    constructor(id, nombre, descripcion, precio, categoria, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
        this.precioOferta = arguments.length > 6 ? arguments[6] : null;
    }

    // Método para formatear el precio
    getPrecioFormateado() {
        if (this.precioOferta) {
            return `<del style="color:#888; font-size:0.9rem; margin-right:8px;">S/. ${this.precio.toFixed(2)}</del><span style="color:var(--rojo);">S/. ${this.precioOferta.toFixed(2)}</span>`;
        }
        return `S/. ${this.precio.toFixed(2)}`;
    }
}

// 2. ARRAY LIST DE PRODUCTOS (BASE DE DATOS LOCAL - 30 Productos)
const inventarioBase = [
    // --- HAMBURGUESAS (7) ---
    { id: 1, nombre: "Clásica Burger", descripcion: "Carne 200g, queso cheddar, lechuga, tomate y salsa especial.", precio: 18.90, precioOferta: 12.90, categoria: "Hamburguesas", imagen: "img/burger.png" },
    { id: 2, nombre: "Doble Queso", descripcion: "Doble carne de res, cuádruple queso cheddar y tocino.", precio: 24.50, categoria: "Hamburguesas", imagen: "img/doble_queso.png" },
    { id: 3, nombre: "Bacon BBQ", descripcion: "Carne 200g, tocino crujiente, aros de cebolla y salsa BBQ.", precio: 22.00, categoria: "Hamburguesas", imagen: "img/bacon_bbq.png" },
    { id: 4, nombre: "Spicy Volcano", descripcion: "Carne 200g, jalapeños, queso pepper jack y salsa picante.", precio: 21.50, categoria: "Hamburguesas", imagen: "img/spicy_volcano.png" },
    { id: 5, nombre: "Crispy Chicken Burger", descripcion: "Pechuga de pollo crujiente, lechuga y mayonesa.", precio: 19.90, categoria: "Hamburguesas", imagen: "img/chicken_burger.png" },
    { id: 6, nombre: "Veggie Style", descripcion: "Hamburguesa de lentejas, palta, tomate y lechuga fresca.", precio: 17.00, categoria: "Hamburguesas", imagen: "img/veggie_burger.png" },
    { id: 7, nombre: "Monster Triple", descripcion: "Triple carne, huevo frito, platano, queso y tocino.", precio: 28.90, categoria: "Hamburguesas", imagen: "img/monster_triple.png" },

    // --- NUGGETS (2) ---
    { id: 8, nombre: "Nuggets con salsa BBQ", descripcion: "Porción de nuggets crujientes con papas fritas y salsa BBQ.", precio: 12.90, categoria: "Nuggets", imagen: "img/nuggets_bbq.png" },
    { id: 9, nombre: "Nuggets con salsa Acevichada", descripcion: "Porción de nuggets crujientes con papas fritas y salsa acevichada casera.", precio: 13.90, categoria: "Nuggets", imagen: "img/nuggets_acevichada.png" },

    // --- POLLO BROASTER (4) ---
    { id: 10, nombre: "Pierna Broaster", descripcion: "1 jugosa pierna de pollo broaster con ensalada y papas.", precio: 10.00, categoria: "Pollo Broaster", imagen: "img/pierna_broaster.png" },
    { id: 11, nombre: "Pecho Broaster", descripcion: "1 gran pieza de pecho broaster crujiente con ensalada y papas.", precio: 12.00, categoria: "Pollo Broaster", imagen: "img/pecho_broaster.png" },
    { id: 12, nombre: "Entrepierna Broaster", descripcion: "1 jugosa pieza de entrepierna broaster con ensalada y papas.", precio: 11.00, categoria: "Pollo Broaster", imagen: "img/entrepierna_broaster.png" },
    { id: 13, nombre: "Alita Broaster", descripcion: "1 pieza de alita broaster con ensalada y papas.", precio: 9.50, categoria: "Pollo Broaster", imagen: "img/alita_broaster.png" },

    // --- SALCHIPAPAS (5) ---
    { id: 14, nombre: "SalchiClásica", descripcion: "Papas fritas y hot dog frankfurt con cremas.", precio: 10.00, categoria: "Salchipapas", imagen: "img/salchiclasica.png" },
    { id: 15, nombre: "SalchiEspecial", descripcion: "Papas, hot dog, huevo frito y queso derretido.", precio: 16.50, categoria: "Salchipapas", imagen: "img/salchiespecial.png" },
    { id: 16, nombre: "SalchiPechuga", descripcion: "Papas fritas, hotdog y trozos de pechuga broaster.", precio: 15.00, categoria: "Salchipapas", imagen: "img/salchipechuga.png" },
    { id: 17, nombre: "SalchiCarne", descripcion: "Papas fritas, hotdog, carne picada y chorizo.", precio: 18.00, categoria: "Salchipapas", imagen: "img/salchicarne.png" },
    { id: 18, nombre: "SalchiMonster", descripcion: "Papas, hot dog, pollo, carne, huevo, chorizo y tocino.", precio: 25.00, categoria: "Salchipapas", imagen: "img/salchimonster.png" },

    // --- ALITAS (4) ---
    { id: 19, nombre: "Alitas BBQ (6 und)", descripcion: "6 alitas bañadas en nuestra salsa BBQ casera.", precio: 16.00, categoria: "Alitas", imagen: "img/alitas.png" },
    { id: 20, nombre: "Alitas Buffalo (6 und)", descripcion: "6 alitas con salsa buffalo picante y dip de blue cheese.", precio: 17.50, categoria: "Alitas", imagen: "img/alitas_buffalo_papas.png" },
    { id: 21, nombre: "Alitas Teriyaki (6 und)", descripcion: "6 alitas dulces con salsa teriyaki y semillas de sésamo.", precio: 18.00, categoria: "Alitas", imagen: "img/alitas_teriyaki_papas.png" },
    { id: 22, nombre: "Alitas acevichadas (6 und)", descripcion: "6 alitas bañadas en nuestra salsa acevichada casera.", precio: 18.00, categoria: "Alitas", imagen: "img/alitas_acevichada_papas.png" },

    // --- BEBIDAS (6) ---
    { id: 23, nombre: "Inca Kola 600ml", descripcion: "Gaseosa helada Inca Kola personal.", precio: 4.00, categoria: "Bebidas", imagen: "img/inca_kola_botella.png" },
    { id: 24, nombre: "Coca Cola 600ml", descripcion: "Gaseosa helada Coca Cola personal.", precio: 4.00, categoria: "Bebidas", imagen: "img/coca_cola_botella.png" },
    { id: 25, nombre: "Chicha Morada 1L", descripcion: "Jarra de chicha morada natural y helada.", precio: 10.00, categoria: "Bebidas", imagen: "img/chicha_morada.png" },
    { id: 26, nombre: "Mojito Clásico", descripcion: "Trago refrescante con ron, menta, limón y soda.", precio: 15.00, categoria: "Bebidas", imagen: "img/mojito.png" },
    { id: 27, nombre: "Mojito Maracuyá", descripcion: "Variante tropical del mojito con pulpa de maracuyá.", precio: 16.00, categoria: "Bebidas", imagen: "img/mojito_maracuya.png" },
    { id: 28, nombre: "Pisco Sour", descripcion: "Coctel bandera peruano, preparado al instante.", precio: 18.00, categoria: "Bebidas", imagen: "img/pisco_sour.png" },
    { id: 29, nombre: "Cuba Libre", descripcion: "Clásico trago con ron, Coca Cola y un toque de limón.", precio: 14.00, categoria: "Bebidas", imagen: "img/cuba_libre.png" },
    { id: 30, nombre: "Limonada Frozen", descripcion: "Refrescante limonada batida con hielo granizado.", precio: 6.50, categoria: "Bebidas", imagen: "img/limonada_frozen.png" }
];

const dataLocal = localStorage.getItem('sb_admin_productos');
const rawInventario = dataLocal ? JSON.parse(dataLocal) : inventarioBase;

// Solo mantenemos en el inventario público los que no estén deshabilitados
const inventarioPublico = rawInventario.filter(p => p.activo !== false);

// Mapear los datos raw a objetos de la clase Producto para tener el método getPrecioFormateado()
const inventario = inventarioPublico.map(p => new Producto(p.id, p.nombre, p.descripcion, p.precio, p.categoria, p.imagen, p.precioOferta));

// 3. ESTRUCTURAS DE PROGRAMACIÓN Y MÉTODOS DE RENDERIZADO

const contenedorProductos = document.getElementById("productos-container");
const inputBusqueda = document.getElementById("input-busqueda");
const botonesFiltro = document.querySelectorAll(".btn-filtro");

// Función para generar el HTML de una tarjeta de producto
function generarHTMLProducto(producto) {
    return `
      <div class="producto-card">
        ${producto.precioOferta ? `<span class="producto-card-badge oferta" style="top:48px; background:var(--rojo); color:#fff;">🎉 POR FIESTAS PATRIAS</span>` : ''}
        <span class="producto-card-badge">${producto.categoria}</span>
        <div class="producto-img-wrapper">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
        </div>
        <div class="producto-body">
          <h3 class="producto-name">${producto.nombre}</h3>
          <p class="producto-desc">${producto.descripcion}</p>
          <div class="producto-footer">
            <span class="producto-precio">${producto.getPrecioFormateado()}</span>
            <button class="btn-ordenar" onclick="agregarAlCarrito(${producto.id})">🛒 Ordenar</button>
          </div>
        </div>
      </div>
    `;
}

// Función principal para renderizar la lista en el DOM
function renderizarProductos(lista) {
    contenedorProductos.innerHTML = ""; // Limpiamos el contenedor
    if (lista.length === 0) {
        contenedorProductos.innerHTML = `<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem;">No se encontraron productos.</p>`;
        return;
    }
    lista.forEach(producto => {
        contenedorProductos.innerHTML += generarHTMLProducto(producto);
    });
}

// 4. MÉTODOS DE BÚSQUEDA (Tipos de Búsqueda)

// Búsqueda por Texto (Filtro Dinámico)
inputBusqueda.addEventListener("keyup", (e) => {
    const textoBuscado = e.target.value.toLowerCase();
    
    // Método filter() de Array
    const productosFiltrados = inventario.filter(producto => 
        producto.nombre.toLowerCase().includes(textoBuscado) || 
        producto.descripcion.toLowerCase().includes(textoBuscado)
    );
    
    renderizarProductos(productosFiltrados);
    
    // Quitar "activo" de todos los botones si estoy buscando por texto
    botonesFiltro.forEach(b => b.classList.remove("activo"));
    document.querySelector('.btn-filtro[data-categoria="Todos"]').classList.add("activo");
});

// Búsqueda/Filtrado por Categoría
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        // Remover clase activo de todos
        botonesFiltro.forEach(b => b.classList.remove("activo"));
        // Agregar activo al presionado
        boton.classList.add("activo");
        
        // Limpiar el buscador de texto
        inputBusqueda.value = "";

        const categoriaSeleccionada = boton.getAttribute("data-categoria");
        
        if (categoriaSeleccionada === "Todos") {
            renderizarProductos(inventario);
        } else {
            // Filtrar por categoría
            const productosFiltrados = inventario.filter(producto => producto.categoria === categoriaSeleccionada);
            renderizarProductos(productosFiltrados);
        }
    });
});

// Dummy function para el carrito (Solo UI)
function agregarAlCarrito(id) {
    const producto = inventario.find(p => p.id === id);
    
    // Leer carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('speedburger_carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existente = carrito.find(item => item.id === id);
    
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precioOferta ? producto.precioOferta : producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('speedburger_carrito', JSON.stringify(carrito));
    
    // Actualizar contador del navbar
    actualizarContadorCarrito();
    
    // Mostrar notificación visual
    mostrarToast(producto.nombre);
}

// Actualizar el contador del ícono del carrito en el navbar
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('speedburger_carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById('carrito-contador');
    if (contador) {
        contador.textContent = total;
        contador.style.display = total > 0 ? 'flex' : 'none';
    }
}

// Notificación toast al agregar producto
function mostrarToast(nombre) {
    // Eliminar toast anterior si existe
    const toastExistente = document.getElementById('toast-carrito');
    if (toastExistente) toastExistente.remove();
    
    const toast = document.createElement('div');
    toast.id = 'toast-carrito';
    toast.innerHTML = `🛒 <strong>${nombre}</strong> agregado al carrito`;
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: #2ecc71; color: #fff; padding: 14px 24px; border-radius: 30px;
        font-family: 'Poppins', sans-serif; font-size: 0.95rem; font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4); z-index: 9999;
        animation: slideUpToast 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// Renderizar todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(inventario);
    actualizarContadorCarrito();
});

// CSS para animación del toast
const style = document.createElement('style');
style.textContent = `@keyframes slideUpToast { from { opacity:0; transform: translateX(-50%) translateY(20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`;
document.head.appendChild(style);


/* === LÓGICA DE CONTACTO Y NAVBAR === */
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
