const mongoose = require('mongoose');
const Equipment = require('../models/Equipment'); // Путь до файла с моделью Equipment

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/medmate', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const equipmentData = [
    {
      number: 1,
      class: 'Computer',
      name: 'Dell Inspiron',
      description: 'Office desktop computer',
      condition: 'Good'
    },
    {
      number: 2,
      class: 'Printer',
      name: 'HP LaserJet',
      description: 'High-speed laser printer',
      condition: 'New'
    },
    {
      number: 3,
      class: 'Projector',
      name: 'Epson EB-S41',
      description: 'Portable projector for presentations',
      condition: 'Fair'
    },
    {
      number: 4,
      class: 'Router',
      name: 'Cisco RV340',
      description: 'Business-class VPN router',
      condition: 'Good'
    },
    {
      number: 5,
      class: 'Monitor',
      name: 'Samsung S24F350',
      description: '24-inch LED monitor',
      condition: 'Poor'
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
