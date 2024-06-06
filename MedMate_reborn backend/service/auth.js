const jwt = require('jsonwebtoken');
const User = require('../models/User');
const argon2 = require('argon2');

const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return { success: false, message: 'Invalid password' };
    }

    // Включаем name в полезную нагрузку JWT
    const payload = {
      username: user.username,
      name: user.name
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return { success: true, token, message: 'Authentication successful' };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Authentication error' };
  }
}

module.exports = { authenticateUser };
