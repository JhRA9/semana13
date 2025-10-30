const fmt = (n) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

// Variable global para almacenar todos los productos
let allProducts = [];

async function loadProducts() {
  const res = await fetch('/api/products');
  allProducts = await res.json();
  renderProducts(allProducts);
  updateCartCount();
}

function renderProducts(products) {
  const list = document.getElementById('product-list');
  const noResults = document.getElementById('no-results');
  const resultsCount = document.getElementById('results-count');

  if (products.length === 0) {
    list.innerHTML = '';
    noResults.classList.remove('d-none');
    resultsCount.textContent = 'No se encontraron productos';
    return;
  }

  noResults.classList.add('d-none');
  resultsCount.textContent = `Mostrando ${products.length} producto${products.length !== 1 ? 's' : ''}`;

  list.innerHTML = products.map(p => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="text-muted mb-2">${p.description}</p>
          <p class="fw-bold">${fmt(p.price)}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-primary" data-id="${p.id}" data-qty="1">Agregar</button>
            <a href="/cart.html" class="btn btn-outline-secondary">Ver carrito</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Agregar eventos de click a los botones
  list.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const productId = Number(btn.dataset.id);
      const qty = Number(btn.dataset.qty);
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, qty })
      });
      updateCartCount();
    });
  });
}

function filterProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

  const filtered = allProducts.filter(product => {
    // Filtrar por nombre
    const matchesName = product.name.toLowerCase().includes(searchTerm) || 
                       product.description.toLowerCase().includes(searchTerm);
    
    // Filtrar por rango de precios
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesName && matchesPrice;
  });

  renderProducts(filtered);
}

function clearFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('min-price').value = '';
  document.getElementById('max-price').value = '';
  renderProducts(allProducts);
}

async function updateCartCount() {
  const res = await fetch('/api/cart');
  const cart = await res.json();
  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById('cart-count').textContent = String(count);
}

// Event listeners para filtrado en tiempo real
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  // Filtrado en tiempo real al escribir
  document.getElementById('search-input').addEventListener('input', filterProducts);
  document.getElementById('min-price').addEventListener('input', filterProducts);
  document.getElementById('max-price').addEventListener('input', filterProducts);

  // Boton para limpiar filtros
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
});

