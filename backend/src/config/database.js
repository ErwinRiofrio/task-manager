//conexion a base de datos

//importamos sequelize
const { Sequelize } = require('sequelize');

//crear conexion a mysql
const sequelize = new Sequelize('task_manager', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//probar conexion
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa'))
    .catch(err => console.error('Fallo de conexión:', err));

module.exports = sequelize;