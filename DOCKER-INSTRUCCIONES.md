# 🐳 Instrucciones para ejecutar con Docker

## Requisitos previos

- Tener Docker Desktop instalado: https://www.docker.com/products/docker-desktop/

- Tener Docker Desktop corriendo (icono de ballena en la barra de tareas)

## Correr comando

```powershell
.\docker-run.bat
```

## Opcion 2: Comandos manuales

### Paso 1: Construir la imagen

```bash
docker build -t zapateria-app .
```

### Paso 2: Ejecutar el contenedor

```bash
docker run -p 3000:3000 --name zapateria-container zapateria-app
```

### Paso 3: Abrir en el navegador

Visita: http://localhost:3000

## Comandos utiles

### Ver contenedores corriendo

```bash
docker ps
```

### Detener el contenedor

```bash
docker stop zapateria-container
```

### Eliminar el contenedor

```bash
docker rm zapateria-container
```

### Ver logs del contenedor

```bash
docker logs zapateria-container
```

### Reiniciar desde cero

```bash
docker stop zapateria-container
docker rm zapateria-container
docker build -t zapateria-app .
docker run -p 3000:3000 --name zapateria-container zapateria-app
```

## Ejecutar tests dentro del contenedor

### Opcion 1: Entrar al contenedor

```bash
docker exec -it zapateria-container sh
npm test
exit
```

### Opcion 2: Ejecutar directamente

```bash
docker exec zapateria-container npm test
```

## Problemas comunes

### Error: puerto 3000 ya en uso

```bash
# Detener el proceso que usa el puerto
netstat -ano | findstr :3000
Stop-Process -Id <PID>
```

### Error: contenedor ya existe

```bash
docker rm zapateria-container
```

### Error: Docker no esta corriendo

- Abre Docker Desktop y espera a que inicie
