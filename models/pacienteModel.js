const mongoose = require('mongoose');
const Prontuario = require('../models/prontuarioModel');

const pacienteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prontuario: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Prontuario',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Paciente', pacienteSchema);
