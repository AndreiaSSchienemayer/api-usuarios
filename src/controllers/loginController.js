// Controller de login para Express
const loginService = require('../services/loginService');

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }
  const result = loginService.authenticate(username, password);
  if (result) {
    return res.status(200).json({ token: result.token });
  }
  return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
};