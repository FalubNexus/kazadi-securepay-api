const users = new Map();
module.exports = {
  createUser(user) { users.set(user.id, user); },
  findByEmail(email) { return [...users.values()].find(u => u.email === email); },
  findById(id) { return users.get(id); }
};