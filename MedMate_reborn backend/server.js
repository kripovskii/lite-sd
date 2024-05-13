const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Подключение к MongoDB
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

// Маршруты для операций с заявками
app.use('/api/tickets', ticketRoutes);

module.exports = app;
