const UserRepository = require('../repositories/userRepository');

class UserService {
  static getAllUsers() {
    return UserRepository.getAllUsers();
  }

  static getUserById(userId) {
    return UserRepository.getUserById(userId);
  }

  static getUserByEmail(email) {
    return UserRepository.getUserByEmail(email);
  }

  static addUser(userData) {
    if (!userData.username || !userData.email) {
      throw new Error('Username and email are required');
    }

    return UserRepository.addUser(userData);
  }

  static updateUser(userId, updatedUserData) {
    const existingUser = UserRepository.getUserById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    return UserRepository.updateUser(userId, updatedUserData);
  }

  static deleteUser(userId) {
    const existingUser = UserRepository.getUserById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    UserRepository.deleteUser(userId);
  }

  static findUsersByEmail(domain) {
    const allUsers = UserRepository.getAllUsers();
    return allUsers.filter(user => user.email.endsWith(`@${domain}`));
  }

  static generateRandomUsername() {
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `user_${randomSuffix}`;
  }
}

module.exports = UserService;