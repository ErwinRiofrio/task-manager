const User = require('./Users');
const Task = require('./Tasks');

//Definir relaciones
//Un usuario puede tener muchas tareas
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });

//Una tarea pertenece a un usuario
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {User, Task};