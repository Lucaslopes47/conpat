const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
            label: 'Trocas Realizadas',
            data: [12, 19, 3, 5, 2, 3, 6, 7, 10, 15, 19],
            backgroundColor: function (context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;

                if (!chartArea) {
                    return null;
                }
                
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, 'rgb(153, 205, 7)'); // Verde
                gradient.addColorStop(1, 'rgb(66, 66, 66)');  // Preto
                
                return gradient;
            },
            borderColor: 'rgba(66, 66, 66)', // Cor da borda
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 250,
            easing: 'easeInOutBounce'
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#333'
                },
                grid: {
                    color: '#ccc'
                }
            },
            x: {
                ticks: {
                    color: '#333'
                },
                grid: {
                    color: '#ccc'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#333'
                }
            }
        }
    }
});

function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('active'); // Alterna a classe 'active' no menu
}

