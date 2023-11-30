const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/users.json');

class UserRepository {
  static getAllUsers() {
    const rawData = fs.readFileSync(dataFilePath);
    let result = [];
    try {
      result = JSON.parse(rawData);
    } catch (e) { }
    return result;
  }

  static getUserById(userId) {
    const allUsers = this.getAllUsers();
    return allUsers.find(user => user.id === userId);
  }

  static getUserByEmail(email) {
    const allUsers = this.getAllUsers();
    return allUsers.find(user => user.email === email);
  }

  static addUser(user) {
    const allUsers = this.getAllUsers();
    user.id = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;
    allUsers.push(user);
    fs.writeFileSync(dataFilePath, JSON.stringify(allUsers, null, 2));
    return user;
  }

  static updateUser(userId, updatedUserData) {
    const allUsers = this.getAllUsers();
    const userIndex = allUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], ...updatedUserData };
      fs.writeFileSync(dataFilePath, JSON.stringify(allUsers, null, 2));
      return allUsers[userIndex];
    }
    return null;
  }

  static deleteUser(userId) {
    const allUsers = this.getAllUsers();
    const updatedUsers = allUsers.filter(user => user.id !== userId);
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedUsers, null, 2));
  }
}

module.exports = UserRepository;