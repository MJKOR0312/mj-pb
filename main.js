document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Theme Toggle Logic
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    updateCharts(isDarkMode);
  });

  const chartInstances = {};

  const createChart = (canvasId, label, dataPoints, color) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Store chart instance to update later
    if (chartInstances[canvasId]) {
      chartInstances[canvasId].destroy();
    }

    const isDarkMode = document.body.classList.contains('dark-mode');
    const gridColor = isDarkMode ? '#444' : '#f0f0f0';
    const textColor = isDarkMode ? '#e0e0e0' : '#666';

    chartInstances[canvasId] = new Chart(ctx, {
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
              color: gridColor
            },
            ticks: {
              color: textColor
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: textColor
            }
          }
        }
      }
    });
  };

  const updateCharts = (isDarkMode) => {
    const gridColor = isDarkMode ? '#444' : '#f0f0f0';
    const textColor = isDarkMode ? '#e0e0e0' : '#666';

    Object.values(chartInstances).forEach(chart => {
      chart.options.scales.y.grid.color = gridColor;
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.x.ticks.color = textColor;
      chart.update();
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
  createChart('chart-eth', 'Ethereum', [2200, 2500, 2300, 2700], '#8e44ad');
  createChart('chart-sol', 'Solana', [80, 110, 100, 140], '#1abc9c');
});