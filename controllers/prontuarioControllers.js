const Prontuario = require('../models/prontuarioModel');
const Paciente = require('../models/pacienteModel');
const APISearch = require('../utils/APISearch');

exports.createProntuario = async (req, res) => {
  try {
    const prontuario = await Prontuario.create({
      ...req.body,
      paciente: req.params.pacienteId,
      user: req.userId,
    });

    await prontuario.save();

    await Paciente.findByIdAndUpdate(
      req.params.pacienteId,
      { $addToSet: { prontuario: prontuario._id } },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      status: 'success',
      data: prontuario,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new prontuario' });
  }
};

exports.getAllProntuarios = async (req, res) => {
  try {
    const search = new APISearch(Prontuario.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const prontuarios = await search.query;

    res.status(200).json(prontuarios);
  } catch (err) {
    return res.status(400).send({ error: 'Error to get all prontuarios' });
  }
};

exports.getProntuario = async (req, res) => {
  try {
    const prontuario = await Prontuario.findById(req.params.prontuarioId);

    res.status(200).json({
      status: 'success',
      data: prontuario,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error get prontuario' });
  }
};

exports.addEvolucao = async (req, res) => {
  try {
    const prontuario = await Prontuario.findByIdAndUpdate(
      req.params.prontuarioId,
      { $addToSet: { evolucao: req.body.evolucao } },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
    await prontuario.save();

    res.status(200).json({
      status: 'success',
      data: prontuario,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error to create evolucao', err });
  }
};

exports.updateProntuario = async (req, res) => {
  try {
    const prontuario = await Prontuario.findByIdAndUpdate(
      req.params.prontuarioId,
      req.body,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
    await prontuario.save();

    res.status(200).json({
      status: 'success',
      data: prontuario,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error to update prontuario', err });
  }
};

exports.deleteProntuario = async (req, res) => {
  try {
    await Prontuario.findByIdAndRemove(req.params.pacienteId);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return res.status(400).send({ error: 'Error to delete pacientet' });
  }
};
