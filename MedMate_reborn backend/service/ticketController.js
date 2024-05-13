const Ticket = require('../models/Ticket');

// Обработчик для создания новой заявки
exports.createTicket = async (req, res) => {
  const { number, subject, description, files, customer, serviceObject } = req.body;

  try {
    const ticket = new Ticket({
      number,
      subject,
      description,
      files,
      customer,
      serviceObject
    });

    await ticket.save();
    res.status(201).json({ message: 'Заявка успешно создана', ticket });
  } catch (error) {
    console.error('Ошибка при создании заявки:', error);
    res.status(500).json({ message: 'Ошибка создания заявки' });
  }
};

// Обработчик для редактирования заявки по ID
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { number, subject, description, files, customer, serviceObject } = req.body;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, {
      number,
      subject,
      description,
      files,
      customer,
      serviceObject
    }, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.status(200).json({ message: 'Заявка успешно обновлена', ticket: updatedTicket });
  } catch (error) {
    console.error('Ошибка при редактировании заявки:', error);
    res.status(500).json({ message: 'Ошибка редактирования заявки' });
  }
};

// Обработчик для удаления заявки по ID
exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.status(200).json({ message: 'Заявка успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении заявки:', error);
    res.status(500).json({ message: 'Ошибка удаления заявки' });
  }
};

// Обработчик для получения списка всех заявок
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Ошибка при получении списка заявок:', error);
    res.status(500).json({ message: 'Ошибка получения списка заявок' });
  }
};
