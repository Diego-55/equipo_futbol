const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jugadoresRoutes = require('./routes/jugadores');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/jugadores', jugadoresRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/equipo_futbol')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

module.exports = app;