const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

//Registro
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    //crear usuario
    const user = await User.create({ username, email, password: hashedPassword });
    res.json({message: 'Usuario registrado exitosamente'});
  } catch (error) {
    console.error
    res.status(500).json({error: 'Error al registrar usuario'},error.message);
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    //validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    //generar token
    const token = jwt.sign(
      {id:User.id},
      "secreto",
      {expiresIn: '1h'}
    )
    res.json({ token });
  } catch (error) {
    res.status(500).json({error: 'Error al iniciar sesion'},error.message);
  }
};