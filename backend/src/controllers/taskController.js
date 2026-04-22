const { where } = require('sequelize');
const Task = require('../models/Tasks');
//obtener la tarea
exports.getTask = async (req, res) => {
  const tasks = await Task.findAll({
    where: { userId: req.user.id, active: true }
  });
  res.json(tasks);
};

//crear tarea
exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id
  });
  res.json(task);
};

//actualizar tarea
exports.updateTask = async (req, res) => {
  const{ id } = req.params;
  await Task.update(req.body, {
    where: { id, userId: req.user.id }
  });
  res.json({ message: 'Tarea actualizada' });
};

//eliminar tarea
exports.deleteTask = async (req, res) => {
  const{ id } = req.params;
  await Task.destroy({
    where: { id, userId: req.user.id }
  });
  res.json({ message: 'Tarea eliminada' });
};

//eliminar tareas de forma lógica
exports.softDeleteTask = async (req, res) => {
  const{ id } = req.params;
  await Task.update({ active: false }, {
    where: { id, userId: req.user.id }
  });
  res.json({ message: 'Tarea eliminada de forma lógica' });
};