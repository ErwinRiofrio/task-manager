# Usamos una imagen base de Node.js
FROM node:22

# Creamos carpeta dentro del contenedor
WORKDIR /app

# Copiamos todas las dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos al contenedor
COPY . .

# Exponemos el puerto 3000 para la aplicación React
EXPOSE 3000

# ejecutamos la aplicación
CMD ["npm", "run", "dev"]