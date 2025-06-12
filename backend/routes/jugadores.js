const express = require('express');
const router = express.Router();
const Jugador = require('../models/jugador');

// Obtener todos los jugadores
router.get('/', async (req, res) => {
  try {
    const jugadores = await Jugador.find();
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo jugador
router.post('/', async (req, res) => {
  try {
    const nuevoJugador = new Jugador(req.body);
    await nuevoJugador.save();
    res.status(201).json(nuevoJugador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

