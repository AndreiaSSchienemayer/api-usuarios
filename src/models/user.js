// Modelo de usuário com armazenamento em memória
class UserModel {
  constructor() {
    this.users = [
      { id: 1, username: 'admin', password: '123456' },
      { id: 2, username: 'user', password: 'abcdef' }
    ];
  }

  findByUsername(username) {
    return this.users.find(u => u.username === username);
  }
}

module.exports = new UserModel();
