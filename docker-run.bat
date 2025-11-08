@echo off
REM Script para ejecutar el proyecto en Docker en Windows

echo Construyendo la imagen Docker...
docker build -t zapateria-app .

echo.
echo Iniciando el contenedor...
docker run -p 3000:3000 --name zapateria-container zapateria-app

echo.
echo Aplicacion corriendo en http://localhost:3000
pause
