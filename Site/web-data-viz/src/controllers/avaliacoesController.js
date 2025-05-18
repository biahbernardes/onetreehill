var avaliacoesModel = require("../models/avaliacoesModel");

function listarAvaliacoes(req, res) {
  var idUsuario = req.params.idUsuario;

  avaliacoesModel.listarAvaliacoesPorUsuario(idUsuario)
    .then(function(resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhuma avaliação encontrada para esse usuário.");
      }
    })
    .catch(function(erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarAvaliacao(req, res) {
  var { assistido, reassistido, nota, fkUsuario, fkEpisodio } = req.body;

  avaliacoesModel.inserirAvaliacao(assistido, reassistido, nota, fkUsuario, fkEpisodio)
    .then(function(resultado) {
      res.status(201).json({ message: "Avaliação cadastrada com sucesso." });
    })
    .catch(function(erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarAvaliacoes,
  cadastrarAvaliacao,
};
