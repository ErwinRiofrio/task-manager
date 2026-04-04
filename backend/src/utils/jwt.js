const jwt = require('jsonwebtoken');

//Función para generar un token JWT
function generateToken(user) {
    return jwt.sign(
      { 
        id: user.id//payload (Datos dentro del token)
      },
      "secreto",//clave secreta para firmar el token, en producción debe ser una variable de entorno
      { 
        expiresIn: '1h' //tiempo de expiración del token
      }
    );
}
module.exports =  generateToken;