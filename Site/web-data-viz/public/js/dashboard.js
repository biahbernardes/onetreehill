const idUsuario = sessionStorage.ID_USUARIO;
b_usuario.innerHTML = sessionStorage.NOME_USUARIO || "usuário";

const ctx = document.getElementById("grafico").getContext("2d");
let chart;

function carregarGrafico() {
  fetch(`/quiz/pontuacao/${idUsuario}`)
    .then(res => res.json())
    .then(pontuacoesUsuario => {
      if (pontuacoesUsuario.length === 0) {
        alert(`O usuário ${idUsuario} não possui registros nesse quiz.`);
        if (chart) chart.destroy();
        return;
      }

      const tentativasLabels = [];
      const acertosPorTentativa = [];
      const errosPorTentativa = [];

      for (let i = 0; i < pontuacoesUsuario.length; i++) {
        tentativasLabels.push(`Tentativa ${i + 1}`);
        acertosPorTentativa.push(pontuacoesUsuario[i].acertos);
        errosPorTentativa.push(8 - pontuacoesUsuario[i].acertos);
      }

      let somaTotalAcertos = 0;
      let somaTotalErros = 0;

      for (let i = 0; i < acertosPorTentativa.length; i++) {
        somaTotalAcertos += acertosPorTentativa[i];
        somaTotalErros += errosPorTentativa[i];
      }

      const totalTentativas = pontuacoesUsuario.length;
      const percentualAcertos = ((somaTotalAcertos / (totalTentativas * 8)) * 100).toFixed();
      const percentualErros = ((somaTotalErros / (totalTentativas * 8)) * 100).toFixed();

      document.getElementById("kpiAcertos").innerText = `${percentualAcertos}%`;
      document.getElementById("kpiErros").innerText = `${percentualErros}%`;

      function atualizarDataHora() {
        const agora = new Date();
        const dataHoraFormatada = agora.toLocaleString("pt-BR");
        document.getElementById("dataHora").textContent = dataHoraFormatada;
      }

      atualizarDataHora();

      if (chart) chart.destroy();
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: tentativasLabels,
          datasets: [
            {
              label: 'Acertos',
              data: acertosPorTentativa,
              backgroundColor: '#00ff00',
              borderColor: '#00d704',
              borderWidth: 2
            },
            {
              label: 'Erros',
              data: errosPorTentativa,
              backgroundColor: '#ff0000',
              borderColor: 'red',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'black'
              }
            }
          }
        }
      });
    });
}

window.onload = () => {
  carregarGrafico();
};
