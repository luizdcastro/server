const Paciente = require('../models/pacienteModel');

exports.createPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.create({ ...req.body, user: req.userId });
    res.status(201).json({
      status: 'success',
      data: paciente,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new paciente', err });
  }
};

exports.getAllPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();

    res.status(200).json({
      status: 'success',
      data: pacientes,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error to get all pacientes' });
  }
};

exports.getPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.pacienteId);

    res.status(200).json({
      status: 'success',
      data: paciente,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error get paciente' });
  }
};

exports.updatePaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.pacienteId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: paciente,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error to update paciente', err });
  }
};

exports.deletePaciente = async (req, res) => {
  try {
    await Paciente.findByIdAndRemove(req.params.pacienteId);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error to delete pacientet' });
  }
};
