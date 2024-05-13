const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  number: String,
  subject: String,
  description: String,
  files: [String],
  customer: String,
  serviceObject: String
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
