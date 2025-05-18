var express = require('express');
var router = express.Router();
var avaliacoesController = require('../controllers/avaliacoesController');

router.get('/:idUsuario', function(req, res) {
  avaliacoesController.listarAvaliacoes(req, res);
});

router.post('/', function(req, res) {
  avaliacoesController.cadastrarAvaliacao(req, res);
});

module.exports = router;
