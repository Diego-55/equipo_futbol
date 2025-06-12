const mongoose = require('mongoose');


const jugadorSchema = new mongoose.Schema({
  ID_Jugador: { type: Number, required: true, unique: true },
  Nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  position: { type: String, required: true },
  nacionalidad: { type: String, required: true }
});

module.exports = mongoose.model('Jugador', jugadorSchema);