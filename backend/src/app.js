//archivo principal del servidor
//configurar express
const express = require('express');
const cors = require('cors');//permitir conectar el frontend con el backend
const helmet = require('helmet');//seguridad proteger http

//inicializamos la app
const app = express();

//middleware para leer json(APIS)
app.use(express.json());
app.use(cors());//seguridad basica
app.use(helmet());//seguridad

//rutas
const routes = require('./routes');
app.use('/api', routes);

//Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando');
});

//Para usar en el server.js
module.exports = app;