const mongoose = require ('mongoose');

 const equipmentSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    condition: {
        type: String
    }
 })

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;