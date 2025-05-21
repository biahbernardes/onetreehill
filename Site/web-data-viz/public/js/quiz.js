const idUsuario = sessionStorage.ID_USUARIO;
b_usuario.innerHTML = sessionStorage.NOME_USUARIO || "usuário";

const perguntas = [
  {
    pergunta: "Quem é o verdadeiro pai de Lucas Scott?",
    opcoes: ["Dan Scott", "Keith Scott", "Nathan Scott", "Whitey Durham"],
    resposta: "Dan Scott"
  },
  {
    pergunta: "Qual personagem sonha em ser designer de moda e vai para a Califórnia por um tempo?",
    opcoes: ["Haley James", "Peyton Sawyer", "Brooke Davis", "Rachel Gatina"],
    resposta: "Brooke Davis"
  },
  {
    pergunta: "Qual dessas bandas realmente apareceu tocando no Tric durante a série?",
    opcoes: ["Paramore", "Fall Out Boy", "Coldplay", "Linkin Park"],
    resposta: "Fall Out Boy"
  },
  {
    pergunta: "O que Haley faz antes de se casar com Nathan?",
    opcoes: ["Se muda para Nova York", "Se junta a uma turnê como cantora", "Termina com Nathan", "Vai estudar fora do país"],
    resposta: "Se junta a uma turnê como cantora"
  },
  {
    pergunta: "Quem sofre um acidente de carro e fica em coma durante a 6ª temporada?",
    opcoes: ["Lucas", "Dan", "Quentin", "Peyton"],
    resposta: "Dan"
  },
  {
    pergunta: "Qual mês tem 30 dias?",
    opcoes: ["Janeiro", "Dezembro", "Junho", "Agosto"],
    resposta: "Junho"
  },
  {
    pergunta: "Quantas horas tem em um dia?",
    opcoes: ["30 horas", "38 horas", "48 horas", "24 horas"],
    resposta: "24 horas"
  },
  {
    pergunta: "Qual destes números é ímpar?",
    opcoes: ["Dez", "Doze", "Oito", "Onze"],
    resposta: "Onze"
  }
];

let perguntaAtual = 0;
let pontuacao = 0;

function exibirPergunta() {
  const pergunta = perguntas[perguntaAtual];
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  questionEl.textContent = pergunta.pergunta;
  optionsEl.innerHTML = "";

  pergunta.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(opcao, botao);
    optionsEl.appendChild(botao);
  });

  document.getElementById("next-button").style.display = "none";
}

function verificarResposta(resposta, botaoClicado) {
  const respostaCorreta = perguntas[perguntaAtual].resposta;
  const botoes = document.querySelectorAll("#options button");

  botoes.forEach(botao => {
    botao.disabled = true;
    if (botao.textContent === respostaCorreta) {
      botao.classList.add("correto");
    }
  });

  if (resposta !== respostaCorreta) {
    botaoClicado.classList.add("errado");
  } else {
    pontuacao++;
  }

  document.getElementById("next-button").style.display = "block";
}

document.getElementById("next-button").addEventListener("click", () => {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    exibirPergunta();
  } else {
    exibirResultado();
  }
});

function exibirResultado() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  // document.getElementById("score").textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;

  const fkUsuario = sessionStorage.ID_USUARIO;

  fetch("/quiz/inserirPontuacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pontuacaoServer: pontuacao,
      fkUsuarioServer: fkUsuario
    }),
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(texto => {
        console.error("Erro na resposta do backend:", texto);
      });
    } else {
      console.log("Requisição bem-sucedida");
    }
  })
  .catch(erro => {
    console.error("Erro na requisição:", erro);
  });
}

function tentarNovamente(){
  perguntaAtual = 0;
  pontuacao = 0;
  document.getElementById("result-container").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  exibirPergunta();
}

window.onload = function(){
  exibirPergunta();
  document.getElementById("next-button").style.display = "none";
};