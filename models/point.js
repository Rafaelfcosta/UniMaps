let mongoose = require('mongoose');

let pointSchema = mongoose.Schema({
    numero: Number,
    bloco: String,
    alias: String
});

let Point  = module.exports = mongoose.model('Point', pointSchema);