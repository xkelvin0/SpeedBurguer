// ===== NAVBAR =====
    window.addEventListener('scroll', function () {
      const navbar = document.getElementById('navbar');
      const btnTop = document.getElementById('btnTop');
      navbar.style.background = window.scrollY > 50 ? 'rgba(17,17,17,0.98)' : 'rgba(26,26,26,0.95)';
      btnTop.classList.toggle('show', window.scrollY > 400);
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navbarLinks = document.getElementById('navbar-links');
    if (menuToggle && navbarLinks) {
      menuToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        menuToggle.textContent = navbarLinks.classList.contains('active') ? '✕' : '☰';
      });
    }

    // ===== CARRITO =====
    const DELIVERY_COSTO = 5.00;
    let tipoEntrega = 'delivery'; // 'delivery' o 'recojo'

    function seleccionarEntrega(tipo) {
      tipoEntrega = tipo;
      document.getElementById('btn-delivery').classList.toggle('activo', tipo === 'delivery');
      document.getElementById('btn-recojo').classList.toggle('activo', tipo === 'recojo');
      document.getElementById('info-recojo').classList.toggle('visible', tipo === 'recojo');
      // Recalcular resumen
      const carrito = obtenerCarrito();
      const subtotal = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
      actualizarResumen(subtotal);
    }

    function obtenerCarrito() {
      return JSON.parse(localStorage.getItem('speedburger_carrito')) || [];
    }

    function guardarCarrito(carrito) {
      localStorage.setItem('speedburger_carrito', JSON.stringify(carrito));
    }

    function actualizarContador(carrito) {
      const total = carrito.reduce((s, i) => s + i.cantidad, 0);
      const c = document.getElementById('carrito-contador');
      if (c) { c.textContent = total; c.style.display = total > 0 ? 'flex' : 'none'; }
    }

    function renderCarrito() {
      const carrito = obtenerCarrito();
      const lista = document.getElementById('carrito-lista');
      actualizarContador(carrito);

      if (carrito.length === 0) {
        lista.innerHTML = `
          <div class="carrito-vacio">
            <span>🛒</span>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos desde nuestro menú para comenzar.</p>
            <a href="productos.html" class="btn-primary" style="display:inline-block; padding:13px 30px; font-size:1rem;">Ver Menú</a>
          </div>`;
        document.getElementById('btn-confirmar').disabled = true;
        actualizarResumen(0);
        return;
      }

      document.getElementById('btn-confirmar').disabled = false;
      lista.innerHTML = carrito.map(item => `
        <div class="carrito-item" id="item-${item.id}">
          <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='img/logo.png'" />
          <div class="carrito-item-info">
            <div class="carrito-item-nombre">${item.nombre}</div>
            <div class="carrito-item-categoria">${item.categoria}</div>
            <div class="carrito-item-precio-unit">S/. ${item.precio.toFixed(2)} c/u</div>
          </div>
          <div class="carrito-qty">
            <button class="qty-btn" onclick="cambiarCantidad(${item.id}, -1)">−</button>
            <span class="qty-num">${item.cantidad}</span>
            <button class="qty-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
          </div>
          <div class="carrito-item-subtotal">S/. ${(item.precio * item.cantidad).toFixed(2)}</div>
          <button class="btn-eliminar" onclick="eliminarItem(${item.id})" title="Eliminar">✕</button>
        </div>
      `).join('');

      const subtotal = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
      actualizarResumen(subtotal);
    }

    function actualizarResumen(subtotal) {
      const esDelivery = tipoEntrega === 'delivery';
      const costoEnvio = (subtotal > 0 && esDelivery) ? DELIVERY_COSTO : 0;
      document.getElementById('label-delivery').textContent = esDelivery ? 'Delivery' : 'Recojo en tienda';
      document.getElementById('res-subtotal').textContent = `S/. ${subtotal.toFixed(2)}`;
      document.getElementById('res-delivery').textContent = costoEnvio > 0 ? `S/. ${costoEnvio.toFixed(2)}` : '🎉 Gratis';
      document.getElementById('res-total').textContent = `S/. ${(subtotal + costoEnvio).toFixed(2)}`;
    }

    function cambiarCantidad(id, delta) {
      let carrito = obtenerCarrito();
      const item = carrito.find(i => i.id === id);
      if (!item) return;
      item.cantidad += delta;
      if (item.cantidad <= 0) {
        carrito = carrito.filter(i => i.id !== id);
      }
      guardarCarrito(carrito);
      renderCarrito();
    }

    function eliminarItem(id) {
      let carrito = obtenerCarrito().filter(i => i.id !== id);
      guardarCarrito(carrito);
      renderCarrito();
    }

    function vaciarCarrito() {
      if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        guardarCarrito([]);
        renderCarrito();
      }
    }

    function confirmarPedido() {
      const carrito = obtenerCarrito();
      if (carrito.length === 0) return;
      // Actualizar mensaje del modal según tipo de entrega
      const msg = tipoEntrega === 'delivery'
        ? 'Tu pedido ha sido recibido. Estamos preparando tu comida con mucho sabor.<br/><strong>🛵 Tiempo estimado de entrega: 10-20 min</strong>'
        : 'Tu pedido ha sido recibido. Pasa a recogerlo a nuestra tienda.<br/><strong>🏪 Av. Principal 123, Surquillo — Listo en 10-15 min</strong>';
      document.querySelector('.modal-box p').innerHTML = msg;
      // Guardar en historial de pedidos para el Admin
      const pedidosGuardados = JSON.parse(localStorage.getItem('sb_admin_pedidos')) || [];
      pedidosGuardados.push({
        fecha: new Date().toISOString(),
        items: carrito,
        tipoEntrega: tipoEntrega
      });
      localStorage.setItem('sb_admin_pedidos', JSON.stringify(pedidosGuardados));

      // Vaciar carrito y mostrar modal
      guardarCarrito([]);
      renderCarrito();
      document.getElementById('modal-confirmacion').classList.add('active');
    }

    function cerrarModal() {
      document.getElementById('modal-confirmacion').classList.remove('active');
      window.location.href = 'index.html';
    }

    // Inicializar
    document.addEventListener('DOMContentLoaded', renderCarrito);