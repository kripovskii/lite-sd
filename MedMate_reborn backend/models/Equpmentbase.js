const mongoose = require ('mongoose');

 const equipmentbaseSchema = new mongoose.Schema({
    number: {
        type: number,
        required: true,
        unique: true
    },
    docname: {
        required: true
    }
 })