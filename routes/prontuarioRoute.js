const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const prontuarioController = require('../controllers/prontuarioControllers');

router
  .route('/')
  .get(authController.protect, prontuarioController.getAllProntuarios);

router
  .route('/:pacienteId')
  .post(authController.protect, prontuarioController.createProntuario);

router
  .route('/:prontuarioId')
  .get(authController.protect, prontuarioController.getProntuario)
  .patch(authController.protect, prontuarioController.updateProntuario)
  .delete(authController.protect, prontuarioController.deleteProntuario);

router
  .route('/addEvolucao/:prontuarioId')
  .put(authController.protect, prontuarioController.addEvolucao);

module.exports = router;
