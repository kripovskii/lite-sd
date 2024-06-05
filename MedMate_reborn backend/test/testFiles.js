const mongoose = require('mongoose');
const Files = require('../models/File'); // Путь до файла с моделью Files

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/medmate/File', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const filesData = [
    {
      number: 1,
      customer: 'Иван Иванов',
      file: 'invoice1.pdf'
    },
    {
      number: 2,
      customer: 'Мария Петрова',
      file: 'contract2.docx'
    },
    {
      number: 3,
      customer: 'Анна Сидорова',
      file: 'report3.xlsx'
    },
    {
      number: 4,
      customer: 'Петр Петров',
      file: 'presentation4.pptx'
    },
    {
      number: 5,
      customer: 'Николай Николаев',
      file: 'image5.png'
    }
  ];

  // Очистка коллекции перед добавлением новых данных
  await Files.deleteMany({});

  // Добавление новых данных
  try {
    for (const data of filesData) {
      const file = new Files(data);
      await file.save();
      console.log(`File with number ${file.number} created successfully`);
    }
  } catch (error) {
    console.error('Error creating files:', error);
  }

  // Закрытие соединения
  mongoose.connection.close();
});
