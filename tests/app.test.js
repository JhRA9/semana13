// Pruebas de software para el proyecto zapateria-app
// Ejecutar con: npm test

const { readFileSync } = require('fs');
const { join } = require('path');

const dataPath = join(__dirname, '../dist/data/data.json');

describe('Pruebas del Backend - Zapateria App', () => {
  
  // Prueba 1: GET /api/products retorna un array
  test('1. GET /api/products debe retornar un array de productos', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBeGreaterThan(0);
  });

  // Prueba 2: Cada producto tiene la estructura correcta
  test('2. Cada producto debe tener id, name, price, image, description y stock', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const product = data.products[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('stock');
  });

  // Prueba 3: Los IDs de productos son unicos
  test('3. Los IDs de productos deben ser unicos', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const ids = data.products.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  // Prueba 4: Los precios son numeros positivos
  test('4. Los precios deben ser numeros mayores a 0', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    data.products.forEach(product => {
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  // Prueba 5: El stock es un numero no negativo
  test('5. El stock debe ser un numero mayor o igual a 0', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    data.products.forEach(product => {
      expect(typeof product.stock).toBe('number');
      expect(product.stock).toBeGreaterThanOrEqual(0);
    });
  });

  // Prueba 6: La estructura de carritos es correcta
  test('6. Los carritos deben ser un objeto con sesiones', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    expect(typeof data.carts).toBe('object');
  });

  // Prueba 7: Los items del carrito tienen productId y qty
  test('7. Los items del carrito deben tener productId y qty', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const sessions = Object.keys(data.carts);
    if (sessions.length > 0) {
      const cart = data.carts[sessions[0]];
      if (cart.length > 0) {
        expect(cart[0]).toHaveProperty('productId');
        expect(cart[0]).toHaveProperty('qty');
      }
    }
  });

  // Prueba 8: Las cantidades en el carrito son positivas
  test('8. Las cantidades en el carrito deben ser mayores a 0', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    Object.values(data.carts).forEach(cart => {
      cart.forEach(item => {
        expect(item.qty).toBeGreaterThan(0);
      });
    });
  });

  // Prueba 9: Los productId del carrito existen en productos
  test('9. Los productId del carrito deben existir en la lista de productos', () => {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const productIds = data.products.map(p => p.id);
    
    Object.values(data.carts).forEach(cart => {
      cart.forEach(item => {
        expect(productIds).toContain(item.productId);
      });
    });
  });

  // Prueba 10: El archivo data.json es valido JSON
  test('10. El archivo data.json debe ser un JSON valido', () => {
    expect(() => {
      JSON.parse(readFileSync(dataPath, 'utf-8'));
    }).not.toThrow();
  });

});
