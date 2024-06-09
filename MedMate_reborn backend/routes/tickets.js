const express = require('express');
const Ticket = require('../models/Ticket');
const {createReadStream} = require("fs");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Tickets
 *     description: API для управления заявками
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Создать новую заявку
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               description:
 *                 type: string
 *               customer:
 *                 type: string
 *               serviceObject:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *               employee:
 *                 type: string
 *     responses:
 *       201:
 *         description: Заявка успешно создана
 *       500:
 *         description: Не удалось создать заявку
 */
router.post('/', async (req, res) => {
  const { subject, description, customer, serviceObject, employee } = req.body;
  const { files } = req;

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

/**
 * @swagger
 * /api/tickets/{number}:
 *   put:
 *     summary: Обновить заявку по номеру
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               description:
 *                 type: string
 *               customer:
 *                 type: string
 *               serviceObject:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *               employee:
 *                 type: string
 *     responses:
 *       200:
 *         description: Заявка успешно обновлена
 *       404:
 *         description: Заявка не найдена
 *       500:
 *         description: Не удалось обновить заявку
 */
router.put('/:number', async (req, res) => {
  const { number } = req.params;
  const { subject, description, customer, serviceObject, files, employee } = req.body;

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { number: number },
      {
        subject,
        description,
        customer,
        serviceObject,
        files,
        employee: employee || null
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.json({ message: 'Заявка успешно обновлена', ticket: updatedTicket });
  } catch (error) {
    console.error('Ошибка при обновлении заявки:', error);
    res.status(500).json({ message: 'Не удалось обновить заявку' });
  }
});

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Получить список всех заявок
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Список заявок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   subject:
 *                     type: string
 *                   description:
 *                     type: string
 *                   customer:
 *                     type: string
 *                   serviceObject:
 *                     type: string
 *                   files:
 *                     type: array
 *                     items:
 *                       type: string
 *                   employee:
 *                     type: string
 *       500:
 *         description: Не удалось получить список заявок
 */
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error('Ошибка при получении списка заявок:', error);
    res.status(500).json({ message: 'Не удалось получить список заявок' });
  }
});

router.get('/file/:number/:id', async (req, res) => {
  const { number, id } = req.params;
  try {
    const ticket = await Ticket.findOne({ number: number });
    if (!ticket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }
    const file = ticket.files[id]
    res.setHeader("content-type", file.mimetype);
    createReadStream(file.path).pipe(res);
  } catch (error) {
    console.error('Ошибка при получении заявки:', error);
    res.status(500).json({ message: 'Не удалось получить заявку' });
  }
})

/**
 * @swagger
 * /api/tickets/{number}:
 *   get:
 *     summary: Получить заявку по номеру
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заявка найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 subject:
 *                   type: string
 *                 description:
 *                   type: string
 *                 customer:
 *                   type: string
 *                 serviceObject:
 *                   type: string
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *                 employee:
 *                   type: string
 *       404:
 *         description: Заявка не найдена
 *       500:
 *         description: Не удалось получить заявку
 */

router.get('/:number', async (req, res) => {
  const { number } = req.params;
  try {
    const ticket = await Ticket.findOne({ number: number });
    if (!ticket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Ошибка при получении заявки:', error);
    res.status(500).json({ message: 'Не удалось получить заявку' });
  }
});

/**
 * @swagger
 * /api/tickets/{number}:
 *   delete:
 *     summary: Удалить заявку по номеру
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заявка успешно удалена
 *       404:
 *         description: Заявка не найдена
 *       500:
 *         description: Не удалось удалить заявку
 */
router.delete('/:number', async (req, res) => {
  const { number } = req.params;
  try {
    const deletedTicket = await Ticket.findOneAndDelete({ number: number });
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }
    res.json({ message: 'Заявка успешно удалена', ticket: deletedTicket });
  } catch (error) {
    console.error('Ошибка при удалении заявки:', error);
    res.status(500).json({ message: 'Не удалось удалить заявку' });
  }
});

/**
 * @swagger
 * /api/tickets/{number}/status:
 *   put:
 *     summary: Обновить статус заявки по номеру
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Статус заявки успешно изменен
 *       404:
 *         description: Заявка не найдена
 *       500:
 *         description: Не удалось изменить статус заявки
 */
router.put('/:number/status', async (req, res) => {
  const { number } = req.params;
  const { status } = req.body;

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { number: number },
      { status: status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.json({ message: `Статус заявки успешно изменен на "${status}"`, ticket: updatedTicket });
  } catch (error) {
    console.error(`Ошибка при изменении статуса заявки на "${status}":`, error);
    res.status(500).json({ message: 'Не удалось изменить статус заявки' });
  }
});

module.exports = router;
