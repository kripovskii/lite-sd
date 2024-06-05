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
      serviceObject: 'CRM система'
    },
    {
      number: 2,
      status: 'В работе',
      subject: 'Проблемы с печатью',
      description: 'Принтер не печатает с компьютера.',
      files: ['printer_issue.docx'],
      customer: 'Анна Петрова',
      serviceObject: 'Офисный принтер'
    },
    {
      number: 3,
      status: 'Решена',
      subject: 'Настройка сети',
      description: 'Необходима настройка новой сети в офисе.',
      files: [],
      customer: 'Сергей Сидоров',
      serviceObject: 'Сетевая инфраструктура'
    },
    {
      number: 4,
      status: 'В ожидании ответа',
      subject: 'Обновление ПО',
      description: 'Необходимо обновить программное обеспечение.',
      files: ['update_instructions.pdf'],
      customer: 'Елена Кузнецова',
      serviceObject: 'Рабочие станции'
    },
    {
      number: 5,
      status: 'Закрыта',
      subject: 'Установка нового оборудования',
      description: 'Требуется установка нового сервера.',
      files: ['server_installation_guide.pdf'],
      customer: 'Иван Смирнов',
      serviceObject: 'Серверное оборудование'
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
