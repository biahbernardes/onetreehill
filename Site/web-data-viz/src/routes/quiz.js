var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/inserirPontuacao", function (req, res) {
    quizController.inserirPontuacao(req, res);
});

router.get("/pontuacao/:idUsuario", function (req, res) {
    quizController.Pontuacoes(req, res);
});

module.exports = router;