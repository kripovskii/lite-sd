const mongoose = require ('mongoose');

 const equipmentbaseSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    docname: {
        type: String,
        required: true
    }
 })

const EquipmentBase = mongoose.model('EquipmentBase', equipmentbaseSchema);

module.exports = EquipmentBase;