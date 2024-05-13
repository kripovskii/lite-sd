const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  number: {
    type: Number,  // Используем тип Number для номера заявки
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Новая', 'В работе', 'Решена', 'В ожидании ответа','Закрыта'], // Определяем возможные значения статуса
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
  }
});


ticketSchema.pre('save', async function(next) {
  try {
    if (!this.number) {
    
      const maxNumber = await Ticket.findOne({}, {}, { sort: { 'number': -1 } });
      this.number = maxNumber ? maxNumber.number + 1 : 1; 
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
