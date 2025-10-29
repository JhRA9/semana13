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
