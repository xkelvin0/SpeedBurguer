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
    }

    // Método para formatear el precio
    getPrecioFormateado() {
        return `S/. ${this.precio.toFixed(2)}`;
    }
}

// 2. ARRAY LIST DE PRODUCTOS (BASE DE DATOS LOCAL - 30 Productos)
const inventario = [
    // --- HAMBURGUESAS (7) ---
    new Producto(1, "Clásica Burger", "Carne 200g, queso cheddar, lechuga, tomate y salsa especial.", 18.90, "Hamburguesas", "img/burger.png"),
    new Producto(2, "Doble Queso", "Doble carne de res, cuádruple queso cheddar y tocino.", 24.50, "Hamburguesas", "img/doble_queso.png"),
    new Producto(3, "Bacon BBQ", "Carne 200g, tocino crujiente, aros de cebolla y salsa BBQ.", 22.00, "Hamburguesas", "img/bacon_bbq.png"),
    new Producto(4, "Spicy Volcano", "Carne 200g, jalapeños, queso pepper jack y salsa picante.", 21.50, "Hamburguesas", "img/spicy_volcano.png"),
    new Producto(5, "Crispy Chicken Burger", "Pechuga de pollo crujiente, lechuga y mayonesa.", 19.90, "Hamburguesas", "img/chicken_burger.png"),
    new Producto(6, "Veggie Style", "Hamburguesa de lentejas, palta, tomate y lechuga fresca.", 17.00, "Hamburguesas", "img/veggie_burger.png"),
    new Producto(7, "Monster Triple", "Triple carne, huevo frito, platano, queso y tocino.", 28.90, "Hamburguesas", "img/monster_triple.png"),

    // --- NUGGETS (2) ---
    new Producto(8, "Nuggets con salsa BBQ", "Porción de nuggets crujientes con papas fritas y salsa BBQ.", 12.90, "Nuggets", "img/nuggets_bbq.png"),
    new Producto(9, "Nuggets con salsa Acevichada", "Porción de nuggets crujientes con papas fritas y salsa acevichada casera.", 13.90, "Nuggets", "img/nuggets_acevichada.png"),

    // --- POLLO BROASTER (4) ---
    new Producto(10, "Pierna Broaster", "1 jugosa pierna de pollo broaster con ensalada y papas.", 10.00, "Pollo Broaster", "img/pierna_broaster.png"),
    new Producto(11, "Pecho Broaster", "1 gran pieza de pecho broaster crujiente con ensalada y papas.", 12.00, "Pollo Broaster", "img/pecho_broaster.png"),
    new Producto(12, "Entrepierna Broaster", "1 jugosa pieza de entrepierna broaster con ensalada y papas.", 11.00, "Pollo Broaster", "img/entrepierna_broaster.png"),
    new Producto(13, "Alita Broaster", "1 pieza de alita broaster con ensalada y papas.", 9.50, "Pollo Broaster", "img/alita_broaster.png"),

    // --- SALCHIPAPAS (5) ---
    new Producto(14, "SalchiClásica", "Papas fritas y hot dog frankfurt con cremas.", 10.00, "Salchipapas", "img/salchiclasica.png"),
    new Producto(15, "SalchiEspecial", "Papas, hot dog, huevo frito y queso derretido.", 16.50, "Salchipapas", "img/salchiespecial.png"),
    new Producto(16, "SalchiPechuga", "Papas fritas, hotdog y trozos de pechuga broaster.", 15.00, "Salchipapas", "img/salchipechuga.png"),
    new Producto(17, "SalchiCarne", "Papas fritas, hotdog, carne picada y chorizo.", 18.00, "Salchipapas", "img/salchicarne.png"),
    new Producto(18, "SalchiMonster", "Papas, hot dog, pollo, carne, huevo, chorizo y tocino.", 25.00, "Salchipapas", "img/salchimonster.png"),

    // --- ALITAS (4) ---
    new Producto(19, "Alitas BBQ (6 und)", "6 alitas bañadas en nuestra salsa BBQ casera.", 16.00, "Alitas", "img/alitas.png"),
    new Producto(20, "Alitas Buffalo (6 und)", "6 alitas con salsa buffalo picante y dip de blue cheese.", 17.50, "Alitas", "img/alitas_buffalo_papas.png"),
    new Producto(21, "Alitas Teriyaki (6 und)", "6 alitas dulces con salsa teriyaki y semillas de sésamo.", 18.00, "Alitas", "img/alitas_teriyaki_papas.png"),
    new Producto(22, "Alitas acevichadas (6 und)", "6 alitas bañadas en nuestra salsa acevichada casera.", 18.00, "Alitas", "img/alitas_acevichada_papas.png"),

    // --- BEBIDAS (6) ---
    new Producto(23, "Inca Kola 600ml", "Gaseosa helada Inca Kola personal.", 4.00, "Bebidas", "img/inca_kola_botella.png"),
    new Producto(24, "Coca Cola 600ml", "Gaseosa helada Coca Cola personal.", 4.00, "Bebidas", "img/coca_cola_botella.png"),
    new Producto(25, "Chicha Morada 1L", "Jarra de chicha morada natural y helada.", 10.00, "Bebidas", "img/chicha_morada.png"),
    new Producto(26, "Mojito Clásico", "Trago refrescante con ron, menta, limón y soda.", 15.00, "Bebidas", "img/mojito.png"),
    new Producto(27, "Mojito Maracuyá", "Variante tropical del mojito con pulpa de maracuyá.", 16.00, "Bebidas", "img/mojito_maracuya.png"),
    new Producto(28, "Pisco Sour", "Coctel bandera peruano, preparado al instante.", 18.00, "Bebidas", "img/pisco_sour.png"),
    new Producto(29, "Cuba Libre", "Clásico trago con ron, Coca Cola y un toque de limón.", 14.00, "Bebidas", "img/cuba_libre.png"),
    new Producto(30, "Limonada Frozen", "Refrescante limonada batida con hielo granizado.", 6.50, "Bebidas", "img/limonada_frozen.png")
];

// 3. ESTRUCTURAS DE PROGRAMACIÓN Y MÉTODOS DE RENDERIZADO

const contenedorProductos = document.getElementById("productos-container");
const inputBusqueda = document.getElementById("input-busqueda");
const botonesFiltro = document.querySelectorAll(".btn-filtro");

// Función para generar el HTML de una tarjeta de producto
function generarHTMLProducto(producto) {
    return `
      <div class="producto-card">
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
    alert(`¡${producto.nombre} agregado a tu pedido! ¿Deseas agregar otro?`);
}

// Renderizar todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(inventario);
});
