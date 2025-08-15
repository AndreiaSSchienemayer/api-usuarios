// Serviço de autenticação com JWT
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = 'segredo_super_secreto';

class LoginService {
  authenticate(username, password) {
    const user = userModel.findByUsername(username);
    if (user && user.password === password) {
      // Gera token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
      return { token };
    }
    return null;
  }
}

module.exports = new LoginService();
module.exports.SECRET = SECRET;
