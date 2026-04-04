const User = require('./users');
const Task = require('./task');

//Definir relaciones
//Un usuario puede tener muchas tareas
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

//Una tarea pertenece a un usuario
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {User, Task};