//src//server.js

//importamos la app de app.js
const app = require('./app');

//defino el puerto
const PORT = 3000;

//iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});