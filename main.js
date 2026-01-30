document.addEventListener('DOMContentLoaded', () => {
  const createChart = (canvasId, label, dataPoints, color) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['3달 전', '2달 전', '1달 전', '현재'],
        datasets: [{
          label: `${label} 가격 (예시)`,
          data: dataPoints,
          borderColor: color,
          backgroundColor: color + '33', // Add transparency
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: '#f0f0f0'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  };

  // Mock Data (Price Trends)
  // US
  createChart('chart-aapl', 'Apple', [170, 180, 175, 190], '#3498db');
  createChart('chart-tsla', 'Tesla', [210, 240, 220, 250], '#e74c3c');
  createChart('chart-nvda', 'NVIDIA', [450, 480, 500, 550], '#2ecc71');

  // KR
  createChart('chart-samsung', '삼성전자', [70000, 72000, 71000, 75000], '#3498db');
  createChart('chart-sk', 'SK하이닉스', [110000, 125000, 130000, 140000], '#e74c3c');
  createChart('chart-hyundai', '현대차', [180000, 190000, 185000, 200000], '#2ecc71');

  // Crypto
  createChart('chart-btc', 'Bitcoin', [35000, 38000, 42000, 45000], '#f1c40f');
});
