const bcrypt = require('bcrypt');
const { User } = require('../models');;
const generateToken = require('../utils/jwt');

//Registro
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    //crear usuario
    const user = await User.create({ username, email, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(500).json({error:error.message});
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
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({error:error.message});
  }
};