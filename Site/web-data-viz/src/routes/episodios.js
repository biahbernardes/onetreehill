var express = require("express");
var router = express.Router();

var episodiosController = require("../controllers/episodiosController");

// listar todos os episódios de uma temporada específica
router.get("/listar/:idTemporada", function (req, res) {
    episodiosController.listarPorTemporada(req, res);
});

// buscar um episódio pelo ID
router.get("/buscar/:idEpisodio", function (req, res) {
    episodiosController.buscarPorId(req, res);
});

module.exports = router;
