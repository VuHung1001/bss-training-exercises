let myChart = null;
let powerData = [50, 100, 90, 40, 30, 60];
let deviceData = [
  "TV",
  "Washing Machine",
  "Refrigerator",
  "Fan",
  "Laptop",
  "PC",
];
let ipData = []


// load data to doughnut chart
const loadChart = ()=>{
  if(myChart) myChart.destroy();

  powerData=[];
  deviceData=[];
  ipData=[];
  // stored variable is declared in file data.js
  if (stored.length > 0) {
    stored.map((value, index) => {
      powerData[index] = value.power;
      deviceData[index] = value.device;
      ipData[index] = value.ip;
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
          text: "Power Consumption",
        },
      },
    },
  };

  myChart = new Chart(document.getElementById("myChart"), config);
}
