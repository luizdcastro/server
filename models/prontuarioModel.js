const Paciente = require('../models/pacienteModel');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const prontuarioSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.ObjectId,
      ref: 'Paciente',
      required: true,
    },
    etapa: {
      type: Number,
      required: true,
      default: 1,
    },
    sintomas: {
      type: Object,
    },
    evolucao: {
      type: Array,
    },
    alerta: {
      type: String,
      default: 'Cinza',
    },
    atendimento: {
      type: String,
      default: 'Pendente',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

prontuarioSchema.plugin(AutoIncrement, { inc_field: 'id' });

prontuarioSchema.pre('save', async function (next) {
  const alertLevel = Object.values(this.sintomas);
  if (alertLevel.includes(5) || alertLevel.includes(4)) {
    return (this.alerta = 'Vermelho');
  }
  if (alertLevel.includes(3) || alertLevel.includes(2)) {
    return (this.alerta = 'Amarelo');
  }
  if (alertLevel.includes(1)) {
    return (this.alerta = 'Azul');
  } else {
    this.alerta;
  }
  next();
});

prontuarioSchema.pre('save', async function (next) {
  if (this.evolucao.length > 0) {
    return (this.atendimento = 'Realizado');
  } else {
    this.atendimento;
  }
  next();
});

prontuarioSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'paciente',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('Prontuario', prontuarioSchema);
