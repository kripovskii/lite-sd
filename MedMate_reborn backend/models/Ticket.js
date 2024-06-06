const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Новая', 'В работе', 'Решена', 'В ожидании ответа', 'Закрыта', 'Отложена'],
    default: 'Новая'
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  files: {
    type: [String]
  },
  customer: {
    type: String,
    required: true
  },
  serviceObject: {
    type: String,
    required: true
  },
  employee: {
    type: String,
    default: null
  },
  deadline: {
    type: Date, // Дата и время, когда заявка должна быть решена
    default: null
  },
  createdAt: {
    type: Date, // Дата и время создания заявки
    default: Date.now
  },
  resolvedAt: {
    type: Date, // Дата и время, когда заявка была решена
    default: null
  },
  resolutionTime: {
    type: Number, // Время, затраченное на решение заявки в миллисекундах
    default: null
  }
});

ticketSchema.pre('save', async function(next) {
  try {
    if (!this.number) {
      const maxNumberTicket = await Ticket.findOne({}, {}, { sort: { 'number': -1 } });
      this.number = maxNumberTicket ? maxNumberTicket.number + 1 : 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
