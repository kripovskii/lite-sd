const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { authenticateUser } = require('./service/auth');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/medmate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Успешное подключение к MongoDB');
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
})
.catch((error) => {
  console.error('Ошибка подключения к MongoDB:', error);
});

app.use(bodyParser.json());
app.use(cors());

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Получен запрос на аутентификацию для пользователя: ${username}`);

  try {
    const authResult = await authenticateUser(username, password);

    if (authResult.success) {
      console.log(`Успешная аутентификация для пользователя: ${username}`);
      res.status(200).json({ token: authResult.token });
    } else {
      console.log(`Ошибка аутентификации для пользователя: ${username}`);
      res.status(401).json({ message: authResult.message });
    }
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

module.exports = app;
