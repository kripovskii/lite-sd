const mongoose = require('mongoose');
const User = require('./models/User'); // Подключаем модель пользователя

// Строка подключения к MongoDB
const mongoURI = 'mongodb://localhost:27017/medmate';

// Опции подключения к MongoDB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Функция для удаления пользователя по имени пользователя
const deleteUserByUsername = async (username) => {
  try {
    // Подключаемся к базе данных
    await mongoose.connect(mongoURI, options);
    console.log('Успешное подключение к MongoDB');

    // Ищем пользователя по имени пользователя и удаляем его
    const deletedUser = await User.findOneAndDelete({ username });

    if (deletedUser) {
      console.log('Пользователь успешно удален:', deletedUser);
    } else {
      console.log('Пользователь не найден.');
    }
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  } finally {
    // Закрываем соединение с базой данных
    mongoose.disconnect();
    console.log('Соединение с MongoDB закрыто');
  }
};

// Вызываем функцию для удаления пользователя
deleteUserByUsername('admin'); // Здесь указываем имя пользователя, которого нужно удалить
