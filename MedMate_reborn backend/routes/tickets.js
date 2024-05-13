const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// Маршрут для создания новой заявки
router.post('/', async (req, res) => {
  const { subject, description, customer, serviceObject, files, employee } = req.body;

  try {
    const ticketCount = await Ticket.countDocuments();
    const newTicket = new Ticket({
      number: ticketCount + 1,
      status: 'Новая',
      subject,
      description,
      customer,
      serviceObject,
      files,
      employee: employee || null
    });

    await newTicket.save();

    res.status(201).json({ message: 'Заявка успешно создана', ticket: newTicket });
  } catch (error) {
    console.error('Ошибка при создании заявки:', error);
    res.status(500).json({ message: 'Не удалось создать заявку' });
  }
});

// Маршрут для обновления заявки по идентификатору
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { subject, description, customer, serviceObject, files, employee } = req.body;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, {
      subject,
      description,
      customer,
      serviceObject,
      files,
      employee: employee || null
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

// Маршрут для удаления заявки по идентификатору
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
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

module.exports = router;
