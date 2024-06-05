const mongoose = require('mongoose');
const Ticket = require('../models/Ticket'); // путь до файла с моделью Ticket

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/medmate', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const ticketsData = [
    {
      status: 'Новая',
      subject: 'Первый запрос',
      description: 'Описание первого запроса',
      files: ['file1.png', 'file2.docx'],
      customer: 'Иван Иванов',
      serviceObject: 'Объект 1',
      employee: null
    },
    {
      status: 'В работе',
      subject: 'Второй запрос',
      description: 'Описание второго запроса',
      files: [],
      customer: 'Мария Петрова',
      serviceObject: 'Объект 2',
      employee: 'Сергей Сергеев'
    },
    {
      status: 'Решена',
      subject: 'Третий запрос',
      description: 'Описание третьего запроса',
      files: ['file3.pdf'],
      customer: 'Анна Сидорова',
      serviceObject: 'Объект 3',
      employee: 'Алексей Алексеев'
    },
    {
      status: 'В ожидании ответа',
      subject: 'Четвертый запрос',
      description: 'Описание четвертого запроса',
      files: [],
      customer: 'Петр Петров',
      serviceObject: 'Объект 4',
      employee: null
    },
    {
      status: 'Закрыта',
      subject: 'Пятый запрос',
      description: 'Описание пятого запроса',
      files: ['file4.jpg'],
      customer: 'Николай Николаев',
      serviceObject: 'Объект 5',
      employee: 'Дмитрий Дмитриев'
    }
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
