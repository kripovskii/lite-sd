const mongoose = require ('mongoose');

 const equipmentSchema = new mongoose.Schema({
    number: {
        type: number,
        required: true,
        unique: true
    },
    class: {
        type: string,
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
        type: string
    }
 })