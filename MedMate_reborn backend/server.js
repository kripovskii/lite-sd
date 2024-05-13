const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const argon2 = require('argon2'); // Импортируем модуль argon2
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Разрешить все CORS запросы

// Функция хеширования пароля с использованием argon2
async function hashPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password); // Хешируем пароль с помощью argon2
    console.log('Хширование на сервере',  );
    password = hashedPassword;
    return hashedPassword;
  } catch (error) {
    console.error('Ошибка при хешировании пароля:', error);
    throw new Error('Ошибка при хешировании пароля');
  }
}

// Функция проверки учетных данных
async function checkUserCredentials(username, password) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return false; // Пользователь не найден
    }
    
    const isMatch = await argon2.verify(user.password, password); 
    console.log(user.password, password)// Проверяем пароль с помощью argon2
    return isMatch;
  } catch (error) {
    console.error('Ошибка проверки учетных данных:', error);
    throw new Error('Ошибка проверки учетных данных');
  }
}

// Маршрут для обработки POST запроса на аутентификацию
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Получен запрос на аутентификацию для пользователя: ${username}`);

  try {
    const isAuthenticated = await checkUserCredentials(username, password);

    if (isAuthenticated) {
      console.log(`Успешная аутентификация для пользователя: ${username}`);
      res.status(200).json({ message: 'Успешная аутентификация' });
    } else {
      console.log(`Ошибка аутентификации для пользователя: ${username}`);
      res.status(401).json({ message: 'Ошибка аутентификации' });
    }
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// Строка подключения к MongoDB
const mongoURI = 'mongodb://localhost:27017/medmate';

// Опции подключения к MongoDB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Подключение к MongoDB и запуск сервера после успешного подключения
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('Успешное подключение к MongoDB');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });
