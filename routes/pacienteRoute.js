const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const pacienteController = require('../controllers/pacienteController');

router
  .route('/')
  .post(authController.protect, pacienteController.createPaciente)
  .get(authController.protect, pacienteController.getAllPacientes);

router
  .route('/:pacienteId')
  .get(authController.protect, pacienteController.getPaciente)
  .patch(authController.protect, pacienteController.updatePaciente)
  .delete(authController.protect, pacienteController.deletePaciente);

module.exports = router;
