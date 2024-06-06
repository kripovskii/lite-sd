const mongoose = require('mongoose');
const Ticket = require('../models/Ticket'); // Путь до файла с моделью Ticket

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/medmate', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const ticketsData = [
    {
      number: 1,
      status: 'Новая',
      subject: 'Ошибка в системе',
      description: 'Возникает ошибка при входе в систему.',
      files: ['error_screenshot.png'],
      customer: 'Петр Иванов',
      serviceObject: 'Клиника на Окенаском проспекте',
      employe:'admin',
      deadline: new Date('2024-06-20'), // Пример установки дедлайна (20 июня 2024 года)
      createdAt: new Date(), // Пример установки даты и времени создания (текущая дата и время)
      resolvedAt: null, // Пока заявка не решена, установим значение null
      resolutionTime: null // Пока заявка не решена, установим значение null
    },
    // Дополнительные заявки здесь...
  ];

  // Очистка коллекции перед добавлением новых данных
  await Ticket.deleteMany({});

  // Добавление новых данных
  try {
    for (const data of ticketsData) {
      const ticket = new Ticket(data);
      await ticket.save();
      console.log(`Ticket with number ${ticket.number} created successfully`);
    }
  } catch (error) {
    console.error('Error creating tickets:', error);
  }

  // Закрытие соединения
  mongoose.connection.close();
});
