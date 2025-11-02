# Zapatería Aether (Bootstrap + TypeScript + Express)

Tienda de zapatos de ejemplo con frontend en Bootstrap y un backend en Express escrito en TypeScript.
El carrito se guarda por sesión (cookie-session) y el catálogo es en memoria.

## Requisitos

## Instalación

```bash
npm install
```

## Desarrollo con ts-node

```bash
npm run dev
```

Visita: http://localhost:3000

## Paso a paso para correr el proyecto

1. **Instala las dependencias:**
   ```powershell
   npm install
   ```
2. **Instala los tipos necesarios para dependencias (por ejemplo, cors):**
   ```powershell
   npm install --save-dev @types/cors
   ```
3. **Compila el proyecto:**
   ```powershell
   npm run build
   ```
4. **Verifica que el puerto 3000 esté libre:**
   Si el puerto está ocupado, libéralo ejecutando:
   ```powershell
   netstat -ano | findstr :3000
   Stop-Process -Id <PID>
   ```
   (Reemplaza `<PID>` por el número que aparece en la columna final)
5. **Ejecuta el servidor:**
   ```powershell
   npm run dev
   ```
   Esto compila y ejecuta el servidor en `dist/server.js`.
6. **Accede a la aplicación:**
   Abre tu navegador y visita:
   [http://localhost:3000](http://localhost:3000)

## Producción (build + start)

```bash
npm run build
npm start
```

## Estructura

```
zapateria-app/
├─ public/
│  ├─ index.html
│  ├─ cart.html
│  ├─ js/
│  │  ├─ app.js
│  │  └─ cart.js
│  └─ img/
│     └─ shoe_*.png
├─ src/
│  ├─ routes/
│  │  ├─ products.ts
│  │  └─ cart.ts
│  ├─ types/
│  │  └─ index.d.ts
│  └─ server.ts
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Notas


DESARROLLADO POR:
Jhon Emerson Pérez Ramírez
Andrea Patricia López Guerrero 
Marlly Daniela Pineda Villamil 

_________________________

Dependencias utilizadas
Estas son las principales dependencias del proyecto:

Paquete	Función
express	Framework para crear el servidor HTTP
cookie-session	Manejo de sesiones mediante cookies (persistencia del carrito)
cors	Permite solicitudes entre dominios (útil para desarrollo front-back)
typescript	Tipado estático para mejorar la calidad del código
ts-node	Ejecuta archivos TypeScript sin necesidad de compilarlos previamente
nodemon	Recarga automática del servidor en desarrollo
@types/*	Tipos para dependencias como Express, cookie-session, cors, etc.

___________________________

Descripción general de las rutas del backend
El backend está organizado en dos módulos de rutas:

/products
GET /products: Devuelve el catálogo de productos (zapatos), almacenado en memoria.

/cart
GET /cart: Devuelve el contenido actual del carrito desde la sesión.

POST /cart/add: Agrega un producto al carrito usando su id.

POST /cart/remove: Elimina un producto del carrito.

POST /cart/clear: Vacía completamente el carrito.

Estas rutas están registradas en server.ts, junto con los middlewares necesarios (cookie-session, cors, express.json()).


__________________________________________

Funcionamiento del carrito e integración front-back
Carrito
El carrito se guarda en la sesión del usuario mediante cookie-session.

Cada sesión contiene un arreglo de productos con sus cantidades.

Las operaciones de agregar, eliminar y limpiar se hacen mediante llamadas POST al backend.

Integración Frontend–Backend
El frontend usa Bootstrap y JavaScript plano (app.js, cart.js).

Las páginas HTML (index.html, cart.html) interactúan con el backend usando fetch.

Por ejemplo, al hacer clic en "Agregar al carrito", se ejecuta un fetch('/cart/add', { method: 'POST', body: ... }).

El backend responde con el estado actualizado del carrito, que se refleja dinámicamente en el frontend.




