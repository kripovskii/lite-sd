const mongoose = require('mongoose');
const Comment = require('../models/Chat'); // Путь до файла с моделью Comment

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/medmate', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const commentsData = [
    {
      number: 1,
      creator: 'Иван Иванов',
      time: new Date('2023-06-01T10:00:00')
    },
    {
      number: 2,
      creator: 'Мария Петрова',
      time: new Date('2023-06-02T12:30:00')
    },
    {
      number: 3,
      creator: 'Анна Сидорова',
      time: new Date('2023-06-03T15:45:00')
    },
    {
      number: 4,
      creator: 'Петр Петров',
      time: new Date('2023-06-04T09:15:00')
    },
    {
      number: 5,
      creator: 'Николай Николаев',
      time: new Date('2023-06-05T14:20:00')
    }
  ];

  // Очистка коллекции перед добавлением новых данных
  await Comment.deleteMany({});

  // Добавление новых данных
  try {
    for (const data of commentsData) {
      const comment = new Comment(data);
      await comment.save();
      console.log(`Comment with number ${comment.number} created successfully`);
    }
  } catch (error) {
    console.error('Error creating comments:', error);
  }

  // Закрытие соединения
  mongoose.connection.close();
});
