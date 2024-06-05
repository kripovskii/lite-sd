const mongoose = require('mongoose');
const EquipmentBase = require('./path/to/equipmentbaseModel'); // Путь до файла с моделью EquipmentBase

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/equipmentDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to MongoDB");

  // Создание данных для проверки
  const equipmentBaseData = [
    {
      number: 1,
      docname: 'Instruction Manual'
    },
    {
      number: 2,
      docname: 'Maintenance Guide'
    },
    {
      number: 3,
      docname: 'Safety Procedures'
    },
    {
      number: 4,
      docname: 'Warranty Information'
    },
    {
      number: 5,
      docname: 'Installation Guide'
    }
  ];

  // Очистка коллекции перед добавлением новых данных
  await EquipmentBase.deleteMany({});

  // Добавление новых данных
  try {
    for (const data of equipmentBaseData) {
      const equipmentBase = new EquipmentBase(data);
      await equipmentBase.save();
      console.log(`EquipmentBase with number ${equipmentBase.number} created successfully`);
    }
  } catch (error) {
    console.error('Error creating equipmentBase:', error);
  }

  // Закрытие соединения
  mongoose.connection.close();
});
