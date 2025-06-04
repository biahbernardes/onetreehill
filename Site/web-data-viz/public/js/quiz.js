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
    pergunta: "Quem é a melhor amiga de Peyton Sawyer e tem um relacionamento com Lucas Scott por um tempo?",
    opcoes: ["Brooke Davis", "Haley James", "Rachel Gatina", "Mouth McFadden"],
    resposta: "Brooke Davis"
  },
  {
    pergunta: "Qual é o nome do time de basquete que Lucas Scott joga na faculdade?",
    opcoes: ["Ravens", "Wildcats", "Hurricanes", "Tigers"],
    resposta: "Ravens"
  },
  {
    pergunta: "Qual frase de Peyton expressa a dificuldade dela com perdas?",
    opcoes: [
        "People always leave.",
        "Love is fragile.",
        "The world’s a mess.",
        "People change."],
    resposta: "People always leave."
  }
];

let perguntaAtual = 0;
let pontuacao = 0;

function exibirPergunta() {

   const pergunta = perguntas[perguntaAtual];

   const elementoPergunta = document.getElementById("question");
   const containerOpcoes = document.getElementById("options");
   const botaoProxima = document.getElementById("next-button");

   elementoPergunta.innerHTML = pergunta.pergunta;

   let mensagem = "";
   for (let i = 0; i < pergunta.opcoes.length; i++) {
    mensagem += `<button onclick="verificarResposta('${pergunta.opcoes[i]}')">${pergunta.opcoes[i]}</button>`;
  }
  containerOpcoes.innerHTML = mensagem;

  botaoProxima.style.display = "none";
}

function verificarResposta(respostaSelecionada) {

  const respostaCorreta = perguntas[perguntaAtual].resposta;

  //const botoes = document.getElementById("options").getElementsByTagName("button");
  const botoes = document.querySelectorAll("#options button");

  for (let i = 0; i < botoes.length; i++) {
    const botao = botoes[i]; 
    botao.disabled = true; 

    if (botao.innerText === respostaCorreta) {
      botao.style.backgroundColor = "green";
      botao.style.color = "white"; 
    }

    if (botao.innerText === respostaSelecionada) {
      if (respostaSelecionada !== respostaCorreta) {
        botao.style.backgroundColor = "red"; 
        botao.style.color = "white"; 
      } else {
        pontuacao++; 
      }
    }
  }

  const botaoProxima = document.getElementById("next-button");
  botaoProxima.style.display = "block";
}

function proximaPergunta(){

  perguntaAtual++;

  if (perguntaAtual < perguntas.length){
    exibirPergunta();
  } else {
    exibirResultado();
  }
}

function exibirResultado() {
  
  const quiz = document.getElementById("quiz");
  const resultado = document.getElementById("result-container");

  quiz.style.display = "none";
  resultado.style.display = "block";

  const fkUsuario = sessionStorage.ID_USUARIO;

  fetch("/quiz/inserirPontuacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pontuacaoServer: pontuacao,
      fkUsuarioServer: fkUsuario
    }),
  })
  .then(res => {
    if (!res.ok) {
      res.text().then(texto => console.error("Erro no backend:", texto));
    } else {
      console.log("Pontuação enviada com sucesso");
    }
  })
  .catch(erro => console.error("Erro na requisição:", erro));
}

function tentarNovamente() {
  perguntaAtual = 0;
  pontuacao = 0;

  const resultado = document.getElementById("result-container");
  const quiz = document.getElementById("quiz");

  resultado.style.display = "none";
  quiz.style.display = "block";

  exibirPergunta();
}

function inicializarQuiz() {
  exibirPergunta();
  const botaoProxima = document.getElementById("next-button");
  botaoProxima.onclick = proximaPergunta;
  botaoProxima.style.display = "none";
}

window.onload = inicializarQuiz;
