# Usa Node.js 18 como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el codigo fuente
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Si data.json no se copio, lo creamos con estructura inicial
RUN if [ ! -f dist/data/data.json ]; then \
    mkdir -p dist/data && \
    echo '{"products":[{"id":1,"name":"Runner Azul","price":199999,"image":"/img/shoe_1.png","description":"Zapatilla ligera para correr, malla transpirable.","stock":12},{"id":2,"name":"Classic Rojo","price":149999,"image":"/img/shoe_2.png","description":"Clasico urbano para uso diario.","stock":24},{"id":3,"name":"Eco Verde","price":179999,"image":"/img/shoe_3.png","description":"Materiales reciclados, comodo y resistente.","stock":8},{"id":4,"name":"Urban Naranja","price":159999,"image":"/img/shoe_4.png","description":"Estilo urbano con suela de alta traccion.","stock":16},{"id":5,"name":"Sport Morado","price":189999,"image":"/img/shoe_5.png","description":"Para entrenamientos de alto rendimiento.","stock":10},{"id":6,"name":"Trail Gris","price":209999,"image":"/img/shoe_6.png","description":"Ideal para montana y terrenos irregulares.","stock":7},{"id":7,"name":"Mocasines Negros","price":200000,"image":"/img/shoe_7.png","description":"Zapatos comodos y sin cordones, con un estilo clasico y versatil.","stock":24},{"id":8,"name":"Botines gamuza","price":150000,"image":"/img/shoe_8.png","description":"Zapatos tipo bota que cubren hasta el tobillo, combinan comodidad y estilo.","stock":15},{"id":9,"name":"Tacones azul rey","price":300999,"image":"/img/shoe_9.png","description":"Calzado femenino con elevacion en el talon que estiliza la figura y aporta elegancia.","stock":25}],"carts":{}}' > dist/data/data.json; \
fi

# Crea el archivo .env si no existe
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Utilizamos el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicacion
CMD ["npm", "start"]
