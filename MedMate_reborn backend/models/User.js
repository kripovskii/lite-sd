const mongoose = require('mongoose');
const argon2 = require('argon2');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true } 
});

// Добавление метода для хэширования пароля перед сохранением
userSchema.pre('save', async function(next) {
  try {
    // Хэширование пароля перед сохранением
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Создание модели пользователя на основе схемы
const User = mongoose.model('User', userSchema);

module.exports = User;
