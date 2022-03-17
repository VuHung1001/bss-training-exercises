let myChart = null;

const loadChart = ()=>{
  if(myChart) myChart.destroy();

  let powerData = [50, 100, 90, 40, 30, 60];
  let deviceData = [
    "TV",
    "Washing Machine",
    "Refrigerator",
    "Fan",
    "Laptop",
    "PC",
  ];

  // stored variable was defined in data.js
  if (stored.length > 0) {
    stored.map((value, index) => {
      powerData[index] = value.power;
      deviceData[index] = value.device;
    });
  }

  const dataChart = {
    labels: deviceData,
    datasets: [
      {
        label: "Dataset 1",
        data: powerData,
        backgroundColor: [
          "rgb(255, 95, 129, 0.6)",
          "rgb(255, 159, 64, 0.6)",
          "rgb(75, 192, 192, 0.6)",
          "rgb(54, 162, 235, 0.6)",
          "rgb(255, 206, 86, 0.6)",
          "rgb(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: dataChart,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    },
  };

  myChart = new Chart(document.getElementById("myChart"), config);
}
