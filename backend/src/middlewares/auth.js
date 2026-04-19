const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token){
        return res.status(401).json({ message: 'Acceso Denegado' });
    }

    // Novedad: Si el token empieza con "Bearer ", se lo quitamos.
    // Así funciona con Postman (con Bearer) y con React (sin Bearer).
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
    }

    try{
        // Verificar el token limpio
        const decoded = jwt.verify(token, "secreto");
        req.user = decoded;
        next();
    } catch (err) {
        // Si el token expiró o está mal formado, cae aquí
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = verifyToken;