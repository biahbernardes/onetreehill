var quizModel = require("../models/quizModel");

function inserirPontuacao(req, res){

    var pontuacao = req.body.pontuacaoServer;
    var fkUsuario = req.body.fkUsuarioServer;
    
    if (pontuacao == undefined) {
        res.status(400).send("Sua pontuacao está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Sua fkUsuario está undefined!");
    }  else {

        quizModel.inserirPontuacao(pontuacao, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o envio da pontuacao! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function Pontuacoes(req, res) {
    const idUsuario = req.params.idUsuario;

    quizModel.Pontuacoes(idUsuario)
        .then(result => res.json(result))
        .catch(erro => {
            console.error("Erro ao buscar pontuações:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    inserirPontuacao,
    Pontuacoes
}