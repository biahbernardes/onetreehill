var episodioModel = require("../models/episodiosModel");

function listarEpisodios(req, res) {
  episodiosModel.listarEpisodios()
    .then(function(resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum episódio encontrado.");
      }
    })
    .catch(function(erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorTemporada(req, res) {
  var idTemporada = req.params.idTemporada;

  episodiosModel.buscarPorTemporada(idTemporada)
    .then(function(resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum episódio encontrado para essa temporada.");
      }
    })
    .catch(function(erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorId(req, res) {
  var idEpisodio = req.params.idEpisodio;

  episodiosModel.buscarPorId(idEpisodio)
    .then(function(resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado[0]);
      } else {
        res.status(204).send("Episódio não encontrado.");
      }
    })
    .catch(function(erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarEpisodios,
  buscarPorTemporada,
  buscarPorId
};
