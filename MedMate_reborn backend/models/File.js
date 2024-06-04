const mongoose = require ('mongoose');

 const filesSchema = new mongoose.Schema({
    number: {
        type: number,
        required: true,
        unique: true
    },
    customer: {
        type: String
    },
    file: { 
        required: true
    }
 })