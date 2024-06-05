const mongoose = require('mongoose');
const Comment = require('../models/Chat'); // Путь до файла с моделью Comment

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/medmate/Chat', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const commentsData = [
    {
      creator: 'User1',
      time: new Date(2023, 5, 5, 12, 30) // Используем конструктор Date для создания даты
    },
    {
      creator: 'User2',
      time: new Date(2023, 5, 6, 14, 45)
    },
    {
      creator: 'User3',
      time: new Date(2023, 5, 7, 16, 0)
    },
    {
      creator: 'User4',
      time: new Date(2023, 5, 8, 10, 15)
    },
    {
      creator: 'User5',
      time: new Date(2023, 5, 9, 9, 50)
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
