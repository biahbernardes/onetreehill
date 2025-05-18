var database = require("../database/config");

function buscarAvaliacaoPorUsuarioEpisodio(idUsuario, idEpisodio) {
    var instrucaoSql = `
        SELECT * FROM avaliacaoEpisodio 
        WHERE fkUsuario = ${idUsuario} AND fkEpisodio = ${idEpisodio};
    `;
    return database.executar(instrucaoSql);
}

function inserirAvaliacao(assistido, reassistido, nota, idUsuario, idEpisodio) {
    var instrucaoSql = `
        INSERT INTO avaliacaoEpisodio (assistido, reassistido, nota, fkUsuario, fkEpisodio) 
        VALUES (${assistido}, ${reassistido}, ${nota !== null ? nota : 'NULL'}, ${idUsuario}, ${idEpisodio});
    `;
    return database.executar(instrucaoSql);
}

function listarAvaliacoesPorUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT ae.*, e.numero AS episodio, t.numero AS temporada, e.img
        FROM avaliacaoEpisodio ae
        JOIN episodio e ON ae.fkEpisodio = e.idEpisodio
        JOIN temporada t ON e.fkTemporada = t.idTemporada
        WHERE ae.fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarAvaliacaoPorUsuarioEpisodio,
    inserirAvaliacao,
    listarAvaliacoesPorUsuario
};
