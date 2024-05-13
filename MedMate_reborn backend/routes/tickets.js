const express = require('express');
const Ticket = require('../models/Ticket');

const router = express.Router();

// Маршрут для создания новой заявки
router.post('/', async (req, res) => {
    const { subject, description, customer, serviceObject, files } = req.body;
  
    try {
      // Находим количество существующих заявок в базе данных
      const ticketCount = await Ticket.countDocuments();
  
      // Генерируем номер для новой заявки (следующий после последнего номера)
      const newTicketNumber = ticketCount + 1;
  
      // Создаем новую заявку в базе данных с сгенерированным номером
      const newTicket = new Ticket({
        number: newTicketNumber.toString(), // Преобразуем номер в строку
        status: 'Новая', // Устанавливаем статус по умолчанию
        subject,
        description,
        customer,
        serviceObject,
        files,
      });
  
      // Сохраняем заявку в базе данных
      await newTicket.save();
  
      // Отправляем ответ об успешном создании заявки
      res.status(201).json({ message: 'Заявка успешно создана', ticket: newTicket });
    } catch (error) {
      // В случае ошибки отправляем ответ с кодом ошибки
      console.error('Ошибка при создании заявки:', error);
      res.status(500).json({ message: 'Не удалось создать заявку' });
    }
  });

// Маршрут для удаления заявки по идентификатору
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Находим заявку по идентификатору и удаляем её
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.json({ message: 'Заявка успешно удалена', ticket: deletedTicket });
  } catch (error) {
    console.error('Ошибка при удалении заявки:', error);
    res.status(500).json({ message: 'Не удалось удалить заявку' });
  }
});

// Маршрут для обновления заявки по идентификатору
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { subject, description, customer, serviceObject, files } = req.body;

  try {
    // Находим заявку по идентификатору и обновляем её
    const updatedTicket = await Ticket.findByIdAndUpdate(id, {
      subject,
      description,
      customer,
      serviceObject,
      files,
    }, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.json({ message: 'Заявка успешно обновлена', ticket: updatedTicket });
  } catch (error) {
    console.error('Ошибка при обновлении заявки:', error);
    res.status(500).json({ message: 'Не удалось обновить заявку' });
  }
});

// Маршрут для получения списка всех заявок
router.get('/', async (req, res) => {
  try {
    // Получаем список всех заявок из базы данных
    const tickets = await Ticket.find();

    res.json(tickets);
  } catch (error) {
    console.error('Ошибка при получении списка заявок:', error);
    res.status(500).json({ message: 'Не удалось получить список заявок' });
  }
});

// Маршрут для получения заявки по идентификатору
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Находим заявку по идентификатору
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Ошибка при получении заявки:', error);
    res.status(500).json({ message: 'Не удалось получить заявку' });
  }
});

module.exports = router;
