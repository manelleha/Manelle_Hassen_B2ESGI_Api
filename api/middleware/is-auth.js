const jwt = require('jsonwebtoken');
// cette partie nous permettra d'assurer une authentification
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401; // une erreur est renvoyée dans le cas où la condition n'est pas respectée
    throw error;
  }
  req.userId = decodedToken.userId;
  next(); // Appelle la fonction "next()" pour passer au middleware suivant ou au gestionnaire de route
};
