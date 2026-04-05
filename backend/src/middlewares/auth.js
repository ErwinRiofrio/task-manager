const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token){
        return res.status(401).json({ message: 'Acceso Denegado' });
    }

    try{
        //verificar el token
        const decoded = jwt.verify(token, "secreto"); // En producción, usar una variable de entorno
        //guardamos info del usuario en la req para usarla en los controladores
        req.user = decoded;
    } catch (err) {
        return res.status(400).json({ message: 'Token inválido' });
    }
  };
module.exports = verifyToken;