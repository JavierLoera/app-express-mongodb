const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaContacto = new Schema({
    nombre: String,
    numero: Number,
    direccion: String,
    email: String
})

const Contacto = mongoose.model('contacto', SchemaContacto);

module.exports = Contacto;