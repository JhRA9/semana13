# Zapatería Aether (Bootstrap + TypeScript + Express)

Tienda de zapatos de ejemplo con frontend en Bootstrap y un backend en Express escrito en TypeScript.
El carrito se guarda por sesión (cookie-session) y el catálogo es en memoria.

## Requisitos para el funcionamiento del proyecto

- Node.js 18+
- npm
- (Opcional) Docker Desktop para ejecucion en contenedor

## Opcion 1: Ejecutar con Docker 🐳 (Recomendado)

**Requisito:** Tener Docker Desktop instalado y corriendo

### Comando rapido:

```bash
docker build -t zapateria-app .
docker run -p 3000:3000 --name zapateria-container zapateria-app
```

### O usar el script automatico (Windows):

```powershell
.\docker-run.bat
```

**Visitar:** http://localhost:3000

Ver instrucciones completas en [DOCKER-INSTRUCCIONES.md](DOCKER-INSTRUCCIONES.md)

---

## Opcion 2: Ejecutar localmente (sin Docker)

## Instalacion de dependencias

```bash
npm install
```

## Montar el servidor con ts-node

```bash
npm run dev
```

Visitar: http://localhost:3000

## Paso a paso para correr el proyecto

1. **Instalar las dependencias:**
   ```
   npm install
   ```
2. **Instala las dependencias de cors:**
   ```
   npm install --save-dev @types/cors
   ```
3. **Compilar el proyecto:**
   ```
   npm run build
   ```
4. **Verificamos que el puerto 3000 este libre:**
   Si el puerto esta ocupado, lo liberamos ejecutando:
   ```
   netstat -ano | findstr :3000
   Stop-Process -Id <PID>
   ```
   (el `<PID>` es el numero que aparece en la columna final)
5. **Ejecutamos el servidor:**
   ```
   npm run dev
   ```
   Esto compila y ejecuta el servidor en dist/server.js
6. **Acceder a la aplicacion:**
   Abrir el navegador y pegar la URL:

   http://localhost:3000

## Para produccion el build + start

```bash
npm run build
npm start
```

## Integrantes

Nosotros trabajamos en este proyecto en equipo. Los miembros y roles son:

- Jhon Perez — desarrollador frontend y backend
- Andrea Lopez — documentacion y tester
- Marlly Pineda — documentacion
- Angie Madrigal — desarrolladora front

## Dependencias utilizadas

En el proyecto usamos las siguientes dependencias:

- express: servidor HTTP y manejo de rutas
- cors: manejo de politicas CORS para peticiones desde el frontend
- cookie-session: almacenamiento de sesiones en cookies
- bcrypt: encriptacion de passwords
- express-rate-limit: limitador de peticiones por IP
- dotenv: carga de variables de entorno
- jest: pruebas

Dependencias de desarrollo:

- typescript: compilador de TypeScript
- ts-node: ejecucion de TypeScript en desarrollo
- jest: framework de testing
- supertest: testing de APIs HTTP
- @types: para las librerias de express, cors, cookie-session, bcrypt, jest y supertest

## Estructura del proyecto y rutas del backend

```
zapateria-app/
├─ public/                 → Archivos estaticos del frontend
│  ├─ index.html           → Pagina principal con el catalogo de productos
│  ├─ cart.html            → Pagina del carrito de compras
│  ├─ js/
│  │  ├─ app.js            → Logica del frontend para la carga productos, filtros, toast
│  │  └─ cart.js           → Logica del carrito para mostrar items, eliminar, vaciar
│  └─ img/                 → Imagenes de los productos
│     └─ shoe_*.png
├─ src/                    → Codigo fuente del backend en TypeScript
│  ├─ auth/                → Modulos de seguridad
│  │  ├─ authMiddleware.ts → Valida sesiones activas
│  │  ├─ passwordHash.ts   → Encripta passwords con bcrypt
│  │  ├─ rateLimiter.ts    → Limita peticiones por IP
│  │  ├─ validateInput.ts  → Sanitiza datos del usuario
│  │  └─ envConfig.ts      → Variables de entorno desde .env
│  ├─ data/
│  │  ├─ data.json         → Almacenamiento persistente de productos y carritos
│  │  └─ dataStore.ts      → Funciones para leer o escribir data.json
│  ├─ routes/
│  │  ├─ products.ts       → Rutas API para productos
│  │  └─ cart.ts           → Rutas API para carrito
│  ├─ types/
│  │  └─ index.d.ts        → Definiciones de tipos TypeScript
│  └─ server.ts            → Servidor Express principal
├─ tests/                  → Pruebas unitarias
│  └─ app.test.js          → 10 pruebas del backend
├─ dist/                   → Codigo JavaScript compilado
├─ Dockerfile              → Configuracion de Docker
├─ .dockerignore           → Archivos ignorados por Docker
├─ docker-run.bat          → Script para ejecutar Docker en Windows
├─ DOCKER-INSTRUCCIONES.md → Guia completa de Docker
├─ .env.example            → Plantilla de variables de entorno
├─ .gitignore              → Archivos ignorados en git
├─ jest.config.json        → Configuracion de Jest
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Explicacion breve del funcionamiento del carrito y de la integracion front-back

Nosotros manejamos el carrito del lado del servidor y el frontend interactua mediante peticiones fetch.

1. Cuando la pagina carga, el frontend solicita a products para obtener la lista de productos y los muestra en el DOM.

2. Al agregar un producto el frontend hace un POST al /api/cart/add con el productId y la cantidad. El servidor actualiza el carrito (en la sesion o en `data.json`) y responde OK.

3. El frontend actualiza el contador del carrito y muestra una notificacion visual sin recargar la pagina.

4. Para mostrar el contenido del carrito el frontend hace una consulta por medio de GET a /api/cart y renderiza los items.

Este flujo garantiza que los cambios en el carrito sean persistentes y que el frontend se mantiene sincronizado con el estado del servidor mediante llamadas API asincronas.

## Pruebas de software

Nosotros desarrollamos 10 pruebas unitarias para validar el backend:

Pruebas de estructura de datos:

- Prueba 1 → valida que GET /api/products retorna un array
- Prueba 2 → verifica que cada producto tiene id, name, price, image, description y stock
- Prueba 3 → confirma que los IDs de productos son unicos

Pruebas de validacion de datos:

- Prueba 4 → asegura que los precios son numeros positivos
- Prueba 5 → verifica que el stock es un numero no negativo
- Prueba 6 → valida la estructura correcta de los carritos

Pruebas de integridad del carrito:

- Prueba 7 → confirma que los items tienen productId y qty
- Prueba 8 → verifica que las cantidades son mayores a 0
- Prueba 9 → valida que los productId existen en la lista de productos

Pruebas de persistencia:

- Prueba 10 → comprueba que data.json es un JSON valido

Instalar Jest:

```
npm install --save-dev ts-jest
```

Para ejecutar las pruebas:

```
npm test
```

## Elementos de seguridad

Nosotros implementamos 5 elementos de seguridad:

- authMiddleware.ts → valida sesiones antes de acceder a rutas protegidas
- passwordHash.ts → encripta passwords con bcrypt para no guardarlos en texto plano
- rateLimiter.ts → limita peticiones por IP para prevenir ataques de fuerza bruta
- validateInput.ts → sanitiza y valida datos para prevenir inyecciones
- envConfig.ts → carga variables sensibles desde .env para no exponerlas en el codigo

Configurar variables de entorno:

1. Copiar y cambiar el nombdre de .env.example a .env
2. Modificar los valores
