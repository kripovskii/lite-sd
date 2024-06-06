const mongoose = require('mongoose');
const User = require('../models/User'); // Подключаем модель пользователя

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/medmate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Создание нового пользователя
const createUser = async () => {
  try {
    // Задаем данные нового пользователя
    const userData = {
      username: 'doc',
      password: 'doc',
      name: 'doc',
      isemploye: true,
    };

    // Создаем новый экземпляр пользователя с заданными данными
    const newUser = new User(userData);

    // Сохраняем пользователя в базу данных
    const savedUser = await newUser.save();

    console.log('Новый пользователь успешно создан:', savedUser);
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
  } finally {
    // Закрываем соединение с базой данных после завершения операции
    mongoose.disconnect();
  }
};

// Вызываем функцию создания пользователя
createUser();
