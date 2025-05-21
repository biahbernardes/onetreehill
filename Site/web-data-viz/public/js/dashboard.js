const idUsuario = sessionStorage.ID_USUARIO;
b_usuario.innerHTML = sessionStorage.NOME_USUARIO || "usuário";
const ctx = document.getElementById("grafico").getContext("2d");
  let chart;

  function carregarGrafico() {

    fetch(`/quiz/pontuacao/${idUsuario}`)
      .then(res => res.json())
      .then(data => {
        
        if (data.length === 0) {
          alert(`O usuário ${idUsuario} não possui registros nesse quiz.`);
          if (chart) chart.destroy();
          return;
        }

        const labels = data.map((_, index) => `Tentaiva ${index + 1}`);
        const pontuacoes = data.map(item => item.acertos);
        const erros = data.map(item => (10 - item.acertos));

      const totalTentativas = data.length;
      const totalAcertos = pontuacoes.reduce((soma, val) => soma + val, 0);
      const totalErros = erros.reduce((soma, val) => soma + val, 0);

      const percentualAcertos = ((totalAcertos / (totalTentativas * 10)) * 100).toFixed();
      const percentualErros = ((totalErros / (totalTentativas * 10)) * 100).toFixed();

      document.getElementById("kpiAcertos").innerText = `${percentualAcertos}%`;
      document.getElementById("kpiErros").innerText = `${percentualErros}%`;

      function atualizarDataHora() {
        const agora = new Date();
        const dataHoraFormatada = agora.toLocaleString("pt-BR"); // horario e data brasileiros
        document.getElementById("dataHora").textContent = dataHoraFormatada;
      }

      // Atualiza a hora quanto recarrega a pagina
      atualizarDataHora();

        if (chart) chart.destroy();
        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Acertos',
                data: pontuacoes,
                backgroundColor: '#00ff00',
                borderColor: '#00d704',
                borderWidth: 2
              },
              {
                label: 'Erros',
                data: erros,
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