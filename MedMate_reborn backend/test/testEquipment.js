const mongoose = require('mongoose');
const Equipment = require('../models/Equipment'); // Путь до файла с моделью Equipment

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/medmate/Equipment', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const equipmentData = [
    {
      number: 1,
      class: 'Компьютер',
      name: 'Ноутбук Lenovo',
      description: 'Мощный ноутбук для работы и игр',
      condition: 'Новое'
    },
    {
      number: 2,
      class: 'Принтер',
      name: 'HP LaserJet',
      description: 'Лазерный принтер для офиса',
      condition: 'Б/у'
    },
    {
      number: 3,
      class: 'Сетевое оборудование',
      name: 'Роутер TP-Link',
      description: 'Беспроводной роутер',
      condition: 'Новое'
    },
    {
      number: 4,
      class: 'Сканер',
      name: 'Canon Scanner',
      description: 'Сканер документов',
      condition: 'Б/у'
    },
    {
      number: 5,
      class: 'Монитор',
      name: 'Samsung Monitor',
      description: 'Монитор с высоким разрешением',
      condition: 'Новое'
    }
  ];

  // Очистка коллекции перед добавлением новых данных
  await Equipment.deleteMany({});

  // Добавление новых данных
  try {
    for (const data of equipmentData) {
      const equipment = new Equipment(data);
      await equipment.save();
      console.log(`Equipment with number ${equipment.number} created successfully`);
    }
  } catch (error) {
    console.error('Error creating equipment:', error);
  }

  // Закрытие соединения
  mongoose.connection.close();
});
