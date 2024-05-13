const User = require('../models/User');
const argon2 = require('argon2');

// Функция для проверки учетных данных пользователя
async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      return { success: false, message: 'Неправильный пароль' };
    }

    return { success: true, message: 'Успешная аутентификация', user };
  } catch (error) {
    console.error('Ошибка при аутентификации:', error);
    throw new Error('Ошибка при аутентификации');
  }
}

module.exports = { authenticateUser };
