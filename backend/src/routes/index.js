const express = require('express');
const router = express.Router();

//importamos los controladores
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');
const verifyToken = require('../middlewares/auth');

//Rutas de autenticación (Corregidas)
router.post('/register', authController.register);
router.post('/login', authController.login);

//Rutas protegidas 
router.get('/tasks', verifyToken, taskController.getTask);
router.post('/tasks', verifyToken, taskController.createTask);
router.put('/tasks/:id', verifyToken, taskController.updateTask);
router.delete('/tasks/:id', verifyToken, taskController.deleteTask);

module.exports = router;