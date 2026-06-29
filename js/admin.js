// ===== VERIFICAR AUTENTICACIÓN =====
if (sessionStorage.getItem('sb_admin_auth') !== 'true') {
  window.location.href = 'login.html';
}

// ===== DATOS BASE (los mismos de productos.js) =====
const PRODUCTOS_BASE = [
  { id: 1, nombre: "Clásica Burger", descripcion: "Carne 200g, queso cheddar, lechuga, tomate y salsa especial.", precio: 18.90, precioOferta: 12.90, categoria: "Hamburguesas", imagen: "img/burger.png" },
  { id: 2, nombre: "Doble Queso", descripcion: "Doble carne de res, cuádruple queso cheddar y tocino.", precio: 24.50, categoria: "Hamburguesas", imagen: "img/doble_queso.png" },
  { id: 3, nombre: "Bacon BBQ", descripcion: "Carne 200g, tocino crujiente, aros de cebolla y salsa BBQ.", precio: 22.00, categoria: "Hamburguesas", imagen: "img/bacon_bbq.png" },
  { id: 4, nombre: "Spicy Volcano", descripcion: "Carne 200g, jalapeños, queso pepper jack y salsa picante.", precio: 21.50, categoria: "Hamburguesas", imagen: "img/spicy_volcano.png" },
  { id: 5, nombre: "Crispy Chicken Burger", descripcion: "Pechuga de pollo crujiente, lechuga y mayonesa.", precio: 19.90, categoria: "Hamburguesas", imagen: "img/chicken_burger.png" },
  { id: 6, nombre: "Veggie Style", descripcion: "Hamburguesa de lentejas, palta, tomate y lechuga fresca.", precio: 17.00, categoria: "Hamburguesas", imagen: "img/veggie_burger.png" },
  { id: 7, nombre: "Monster Triple", descripcion: "Triple carne, huevo frito, platano, queso y tocino.", precio: 28.90, categoria: "Hamburguesas", imagen: "img/monster_triple.png" },
  { id: 8, nombre: "Nuggets con salsa BBQ", descripcion: "Porción de nuggets crujientes con papas fritas y salsa BBQ.", precio: 12.90, categoria: "Nuggets", imagen: "img/nuggets_bbq.png" },
  { id: 9, nombre: "Nuggets con salsa Acevichada", descripcion: "Porción de nuggets crujientes con papas fritas y salsa acevichada casera.", precio: 13.90, categoria: "Nuggets", imagen: "img/nuggets_acevichada.png" },
  { id: 10, nombre: "Pierna Broaster", descripcion: "1 jugosa pierna de pollo broaster con ensalada y papas.", precio: 10.00, categoria: "Pollo Broaster", imagen: "img/pierna_broaster.png" },
  { id: 11, nombre: "Pecho Broaster", descripcion: "1 gran pieza de pecho broaster crujiente con ensalada y papas.", precio: 12.00, categoria: "Pollo Broaster", imagen: "img/pecho_broaster.png" },
  { id: 12, nombre: "Entrepierna Broaster", descripcion: "1 jugosa pieza de entrepierna broaster con ensalada y papas.", precio: 11.00, categoria: "Pollo Broaster", imagen: "img/entrepierna_broaster.png" },
  { id: 13, nombre: "Alita Broaster", descripcion: "1 pieza de alita broaster con ensalada y papas.", precio: 9.50, categoria: "Pollo Broaster", imagen: "img/alita_broaster.png" },
  { id: 14, nombre: "SalchiClásica", descripcion: "Papas fritas y hot dog frankfurt con cremas.", precio: 10.00, categoria: "Salchipapas", imagen: "img/salchiclasica.png" },
  { id: 15, nombre: "SalchiEspecial", descripcion: "Papas, hot dog, huevo frito y queso derretido.", precio: 16.50, categoria: "Salchipapas", imagen: "img/salchiespecial.png" },
  { id: 16, nombre: "SalchiPechuga", descripcion: "Papas fritas, hotdog y trozos de pechuga broaster.", precio: 15.00, categoria: "Salchipapas", imagen: "img/salchipechuga.png" },
  { id: 17, nombre: "SalchiCarne", descripcion: "Papas fritas, hotdog, carne picada y chorizo.", precio: 18.00, categoria: "Salchipapas", imagen: "img/salchicarne.png" },
  { id: 18, nombre: "SalchiMonster", descripcion: "Papas, hot dog, pollo, carne, huevo, chorizo y tocino.", precio: 25.00, categoria: "Salchipapas", imagen: "img/salchimonster.png" },
  { id: 19, nombre: "Alitas BBQ (6 und)", descripcion: "6 alitas bañadas en nuestra salsa BBQ casera.", precio: 16.00, categoria: "Alitas", imagen: "img/alitas.png" },
  { id: 20, nombre: "Alitas Buffalo (6 und)", descripcion: "6 alitas con salsa buffalo picante y dip de blue cheese.", precio: 17.50, categoria: "Alitas", imagen: "img/alitas_buffalo_papas.png" },
  { id: 21, nombre: "Alitas Teriyaki (6 und)", descripcion: "6 alitas dulces con salsa teriyaki y semillas de sésamo.", precio: 18.00, categoria: "Alitas", imagen: "img/alitas_teriyaki_papas.png" },
  { id: 22, nombre: "Alitas acevichadas (6 und)", descripcion: "6 alitas bañadas en nuestra salsa acevichada casera.", precio: 18.00, categoria: "Alitas", imagen: "img/alitas_acevichada_papas.png" },
  { id: 23, nombre: "Inca Kola 600ml", descripcion: "Gaseosa helada Inca Kola personal.", precio: 4.00, categoria: "Bebidas", imagen: "img/inca_kola_botella.png" },
  { id: 24, nombre: "Coca Cola 600ml", descripcion: "Gaseosa helada Coca Cola personal.", precio: 4.00, categoria: "Bebidas", imagen: "img/coca_cola_botella.png" },
  { id: 25, nombre: "Chicha Morada 1L", descripcion: "Jarra de chicha morada natural y helada.", precio: 10.00, categoria: "Bebidas", imagen: "img/chicha_morada.png" },
  { id: 26, nombre: "Mojito Clásico", descripcion: "Trago refrescante con ron, menta, limón y soda.", precio: 15.00, categoria: "Bebidas", imagen: "img/mojito.png" },
  { id: 27, nombre: "Mojito Maracuyá", descripcion: "Variante tropical del mojito con pulpa de maracuyá.", precio: 16.00, categoria: "Bebidas", imagen: "img/mojito_maracuya.png" },
  { id: 28, nombre: "Pisco Sour", descripcion: "Coctel bandera peruano, preparado al instante.", precio: 18.00, categoria: "Bebidas", imagen: "img/pisco_sour.png" },
  { id: 29, nombre: "Cuba Libre", descripcion: "Clásico trago con ron, Coca Cola y un toque de limón.", precio: 14.00, categoria: "Bebidas", imagen: "img/cuba_libre.png" },
  { id: 30, nombre: "Limonada Frozen", descripcion: "Refrescante limonada batida con hielo granizado.", precio: 6.50, categoria: "Bebidas", imagen: "img/limonada_frozen.png" }
];

// ===== CRUD - FUNCIONES DE DATOS =====

function obtenerProductos() {
  const guardados = localStorage.getItem('sb_admin_productos');
  if (guardados) return JSON.parse(guardados);
  // Primera vez: inicializar con los productos base
  localStorage.setItem('sb_admin_productos', JSON.stringify(PRODUCTOS_BASE));
  return PRODUCTOS_BASE;
}

function guardarProductos(lista) {
  localStorage.setItem('sb_admin_productos', JSON.stringify(lista));
}

function generarId(lista) {
  return lista.length === 0 ? 1 : Math.max(...lista.map(p => p.id)) + 1;
}

// ===== ESTADÍSTICAS =====
function actualizarStats(lista) {
  // 1. Ventas Dinámicas
  const pedidos = JSON.parse(localStorage.getItem('sb_admin_pedidos')) || [];
  const totalPedidos = pedidos.length;
  
  let ingresos = 0;
  let delivery = 0;
  let recojo = 0;

  pedidos.forEach(p => {
    if (p.tipoEntrega === 'delivery') delivery++;
    else recojo++;

    // Sumar ingresos (precio * cantidad del item + costo de delivery opcional)
    let subtotal = p.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    if (p.tipoEntrega === 'delivery') subtotal += 5.00; // Agregar costo de delivery al ingreso
    ingresos += subtotal;
  });

  const ticketPromedio = totalPedidos > 0 ? (ingresos / totalPedidos) : 0;

  document.getElementById('stat-clientes').textContent = totalPedidos;
  document.getElementById('stat-ingresos').textContent = `S/. ${ingresos.toFixed(0)}`;
  document.getElementById('stat-delivery').textContent = delivery;
  document.getElementById('stat-recojo').textContent = recojo;
  document.getElementById('stat-ticket').textContent = `S/. ${ticketPromedio.toFixed(0)}`;

  // 2. Inventario Menú
  document.getElementById('stat-total').textContent = lista.length;
  document.getElementById('stat-hamburguesas').textContent = lista.filter(p => p.categoria === 'Hamburguesas').length;
  document.getElementById('stat-salchipapas').textContent = lista.filter(p => p.categoria === 'Salchipapas').length;
  document.getElementById('stat-broaster').textContent = lista.filter(p => p.categoria === 'Pollo Broaster').length;
  document.getElementById('stat-nuggets-alitas').textContent = lista.filter(p => p.categoria === 'Nuggets' || p.categoria === 'Alitas').length;
  document.getElementById('stat-bebidas').textContent = lista.filter(p => p.categoria === 'Bebidas').length;
}

// ===== RENDERIZAR TABLA =====
function renderTabla(lista) {
  const tbody = document.getElementById('tabla-body');
  document.getElementById('tabla-count').textContent = `${lista.length} producto${lista.length !== 1 ? 's' : ''}`;

  if (lista.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-tabla"><span>🔍</span>No se encontraron productos</div></td></tr>`;
    return;
  }

  tbody.innerHTML = lista.map(p => `
    <tr id="row-${p.id}">
      <td><span class="td-id">#${p.id}</span></td>
      <td><img src="${p.imagen}" alt="${p.nombre}" class="td-img" onerror="this.src='img/logo.png'" /></td>
      <td><span class="td-nombre">${p.nombre}</span></td>
      <td style="max-width:220px; color:#888; font-size:0.82rem;">${p.descripcion}</td>
      <td><span class="td-cat">${p.categoria}</span></td>
      <td>
        <span class="td-precio">
          ${p.precioOferta ? `<del style="color:#888; font-size:0.8rem;">S/. ${p.precio.toFixed(2)}</del><br>S/. ${p.precioOferta.toFixed(2)}` : `S/. ${p.precio.toFixed(2)}`}
        </span>
      </td>
      <td>
        <div class="acciones-td">
          <button class="btn-edit" onclick="editarProducto(${p.id})">✏️ Editar</button>
          <button class="btn-del" onclick="eliminarProducto(${p.id})">🗑️ Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ===== BUSCAR =====
function buscarProducto() {
  const texto = document.getElementById('search-input').value.toLowerCase();
  const cat = document.getElementById('filter-cat').value;
  let lista = obtenerProductos();

  if (texto) {
    lista = lista.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    );
  }
  if (cat) {
    lista = lista.filter(p => p.categoria === cat);
  }

  renderTabla(lista);
}

// ===== MODAL =====
let modoEdicion = false;

function abrirModal(producto = null) {
  modoEdicion = !!producto;
  document.getElementById('modal-titulo').innerHTML = producto
    ? '✏️ Editar <span>Producto</span>'
    : '➕ Añadir <span>Producto</span>';
  document.getElementById('btn-guardar').textContent = producto ? '💾 ACTUALIZAR' : '💾 GUARDAR';

  // Limpiar / llenar formulario
  document.getElementById('form-id').value = producto ? producto.id : '';
  document.getElementById('form-nombre').value = producto ? producto.nombre : '';
  document.getElementById('form-desc').value = producto ? producto.descripcion : '';
  document.getElementById('form-precio').value = producto ? producto.precio : '';
  document.getElementById('form-precio-oferta').value = (producto && producto.precioOferta) ? producto.precioOferta : '';
  document.getElementById('form-cat').value = producto ? producto.categoria : '';
  document.getElementById('form-img').value = producto ? producto.imagen : '';

  document.getElementById('modal-crud').classList.add('active');
  document.getElementById('form-nombre').focus();
}

function cerrarModal() {
  document.getElementById('modal-crud').classList.remove('active');
  document.getElementById('form-crud').reset();
}



// ===== GUARDAR (Añadir o Editar) =====
function guardarProducto(e) {
  e.preventDefault();
  let lista = obtenerProductos();

  const id = document.getElementById('form-id').value;
  const nombre = document.getElementById('form-nombre').value.trim();
  const descripcion = document.getElementById('form-desc').value.trim();
  const precio = parseFloat(document.getElementById('form-precio').value);
  const poRaw = document.getElementById('form-precio-oferta').value;
  const precioOferta = poRaw ? parseFloat(poRaw) : null;
  const categoria = document.getElementById('form-cat').value;
  const imagen = document.getElementById('form-img').value.trim() || 'img/logo.png';

  if (modoEdicion && id) {
    // MODIFICAR producto existente
    const idx = lista.findIndex(p => p.id === parseInt(id));
    if (idx !== -1) {
      lista[idx] = { id: parseInt(id), nombre, descripcion, precio, precioOferta, categoria, imagen };
      mostrarToast('✅ Producto actualizado correctamente');
    }
  } else {
    // AÑADIR nuevo producto
    const nuevoId = generarId(lista);
    lista.push({ id: nuevoId, nombre, descripcion, precio, precioOferta, categoria, imagen });
    mostrarToast('✅ Producto añadido correctamente');
  }

  guardarProductos(lista);
  cerrarModal();
  inicializar();
}

// ===== EDITAR =====
function editarProducto(id) {
  const lista = obtenerProductos();
  const producto = lista.find(p => p.id === id);
  if (producto) abrirModal(producto);
}

// ===== ELIMINAR =====
function eliminarProducto(id) {
  const lista = obtenerProductos();
  const producto = lista.find(p => p.id === id);
  if (!producto) return;

  if (confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`)) {
    const nuevaLista = lista.filter(p => p.id !== id);
    guardarProductos(nuevaLista);
    mostrarToast('🗑️ Producto eliminado', true);
    inicializar();
  }
}

// ===== TOAST =====
function mostrarToast(msg, esError = false) {
  const toast = document.getElementById('admin-toast');
  toast.textContent = msg;
  toast.className = 'admin-toast show' + (esError ? ' error' : '');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== CERRAR SESIÓN =====
function cerrarSesion() {
  sessionStorage.removeItem('sb_admin_auth');
  window.location.href = 'login.html';
}

// ===== INICIALIZAR =====
function inicializar() {
  const lista = obtenerProductos();
  actualizarStats(lista);
  renderTabla(lista);
  // Limpiar búsqueda
  document.getElementById('search-input').value = '';
  document.getElementById('filter-cat').value = '';
}

// ===== INICIALIZAR GRÁFICOS CHART.JS =====
function inicializarGraficos() {
  const pedidos = JSON.parse(localStorage.getItem('sb_admin_pedidos')) || [];

  // -------------------------------------------------------------
  // DATOS DINÁMICOS PARA GRÁFICO DE BARRAS (MÁS VENDIDOS)
  // -------------------------------------------------------------
  const ventasPorProducto = {};
  pedidos.forEach(pedido => {
    pedido.items.forEach(item => {
      if (!ventasPorProducto[item.nombre]) ventasPorProducto[item.nombre] = 0;
      ventasPorProducto[item.nombre] += item.cantidad;
    });
  });
  // Ordenar y obtener los 5 principales
  const top5 = Object.entries(ventasPorProducto).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const etiquetasBarras = top5.length > 0 ? top5.map(t => t[0]) : ['Sin ventas aún'];
  const datosBarras = top5.length > 0 ? top5.map(t => t[1]) : [0];

  const ctxBar = document.getElementById('barChart').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: etiquetasBarras,
      datasets: [{
        label: 'Unidades Vendidas',
        data: datosBarras,
        backgroundColor: 'rgba(217, 4, 41, 0.7)',
        borderColor: '#d90429',
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#333' }, ticks: { color: '#aaa', stepSize: 1 } },
        x: { grid: { display: false }, ticks: { color: '#aaa' } }
      }
    }
  });

  // -------------------------------------------------------------
  // DATOS DINÁMICOS PARA GRÁFICO CIRCULAR (CATEGORÍAS)
  // -------------------------------------------------------------
  const ventasPorCategoria = {};
  pedidos.forEach(pedido => {
    pedido.items.forEach(item => {
      if (!ventasPorCategoria[item.categoria]) ventasPorCategoria[item.categoria] = 0;
      ventasPorCategoria[item.categoria] += item.cantidad;
    });
  });

  const categorias = Object.keys(ventasPorCategoria);
  const datosCats = Object.values(ventasPorCategoria);

  const etiquetasCircular = categorias.length > 0 ? categorias : ['Sin ventas'];
  const datosCircular = categorias.length > 0 ? datosCats : [1];

  const ctxPie = document.getElementById('pieChart').getContext('2d');
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: etiquetasCircular,
      datasets: [{
        data: datosCircular,
        backgroundColor: ['#d90429', '#ffbe00', '#2e86ab', '#f4a261', '#2ecc71', '#9b59b6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right', labels: { color: '#ccc', font: { family: 'Poppins' } } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  inicializar();
  inicializarGraficos();
});
