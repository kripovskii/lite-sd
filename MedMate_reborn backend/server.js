const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { authenticateUser } = require('./service/auth');
const { swaggerUi, swaggerSpec } = require('./swagger'); // Добавлено для Swagger

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Подключение Swagger UI

// Middleware
app.use(bodyParser.json());
app.use(cors());

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API для управления авторизацией
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Auth]
 *     summary: Логин пользователя
 *     description: Аутентификация пользователя с возвратом токена
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешная аутентификация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Ошибка аутентификации
 *       500:
 *         description: Внутренняя ошибка сервера
 */
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

// Подключение к MongoDB и запуск сервера
mongoose.connect('mongodb://localhost:27017/medmate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Успешное подключение к MongoDB');
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
})
.catch((error) => {
  console.error('Ошибка подключения к MongoDB:', error);
});

module.exports = app;
