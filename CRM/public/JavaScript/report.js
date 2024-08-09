document.addEventListener("DOMContentLoaded", (event) => {
  const ctx = document.getElementById("incomeChart").getContext("2d");
  const incomeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Total Income",
          data: [],
          backgroundColor: "#FCFEFF",
          borderColor: "#FCFEFF",
          borderWidth: 1,
        },
        {
          label: "Deposited",
          data: [],
          backgroundColor: "#BEBEB3",
          borderColor: "#BEBEB3",
          borderWidth: 1,
        },
        {
          label: "Debt",
          data: [],
          backgroundColor: "#DF2524",
          borderColor: "#DF2524",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#fff", // Change text color to white
          },
        },
        x: {
          ticks: {
            color: "#fff", // Change text color to white
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#fff", // Change legend text color to white
          },
        },
      },
    },
  });

  function updateChart(data) {
    incomeChart.data.labels = data.labels;
    incomeChart.data.datasets[0].data = data.income;
    incomeChart.data.datasets[1].data = data.income.map((i) => i * 0.75);
    incomeChart.data.datasets[2].data = data.income.map((i) => i * 0.25);
    incomeChart.update();
  }

  function fetchReportData(type) {
    // Simulate fetching data from a server
    const data = {
      day: {
        labels: [
          "1 Jul",
          "2 Jul",
          "3 Jul",
          "4 Jul",
          "5 Jul",
          "6 Jul",
          "7 Jul",
          "8 Jul",
          "9 Jul",
          "10 Jul",
          "11 Jul",
          "12 Jul",
          "13 Jul",
          "14 Jul",
        ],
        income: [
          50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
        ],
        completedOrder: 50,
        processingOrder: 25,
        cancelledOrder: 10,
      },
      week3and4: {
        labels: [
          "15 Jul",
          "16 Jul",
          "17 Jul",
          "18 Jul",
          "19 Jul",
          "20 Jul",
          "21 Jul",
          "22 Jul",
          "23 Jul",
          "24 Jul",
          "25 Jul",
          "26 Jul",
          "27 Jul",
          "28 Jul",
          "29 Jul",
          "30 Jul",
          "31 Jul",
        ],
        income: [
          190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320,
          330, 340, 350,
        ],
        completedOrder: 80,
        processingOrder: 40,
        cancelledOrder: 20,
      },
      month: {
        labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
        income: [400, 450, 470, 490],
        completedOrder: 40,
        processingOrder: 20,
        cancelledOrder: 10,
      },
      year: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        income: [
          3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000,
          4100,
        ],
        completedOrder: 400,
        processingOrder: 200,
        cancelledOrder: 100,
      },
    };
    return data[type];
  }

  function updateReport(type) {
    const reportData = fetchReportData(type);
    updateChart(reportData);

    // Update the summary
    document.getElementById("totalIncome").innerText =
      reportData.income.reduce((a, b) => a + b, 0).toFixed(2) + " VND";
    document.getElementById("deposited").innerText =
      (reportData.income.reduce((a, b) => a + b, 0) * 0.75).toFixed(2) + " VND";
    document.getElementById("debt").innerText =
      (reportData.income.reduce((a, b) => a + b, 0) * 0.25).toFixed(2) + " VND";
    document.getElementById("completedOrder").innerText =
      reportData.completedOrder;
    document.getElementById("processingOrder").innerText =
      reportData.processingOrder;
    document.getElementById("cancelledOrder").innerText =
      reportData.cancelledOrder;

    // Show or hide the arrow button based on the report type
    const arrowButton = document.querySelector(".arrow-button");
    if (type === "day" || type === "week3and4") {
      arrowButton.style.display = "block";
    } else {
      arrowButton.style.display = "none";
    }
  }

  document
    .querySelector(".arrow-button")
    .addEventListener("click", function () {
      const button = this;
      const currentState = button.getAttribute("data-state");

      if (currentState === "week3and4") {
        updateReport("day");
        button.setAttribute("data-state", "weeks1and2");
        button.textContent = "Tuần 3,4 >";
      } else {
        updateReport("week3and4");
        button.setAttribute("data-state", "week3and4");
        button.textContent = "< Tuần 1,2";
      }
    });

  document.querySelectorAll(".bottom-bar button").forEach((button) => {
    button.addEventListener("click", function () {
      const type = this.getAttribute("onclick")
        .replace("updateReport('", "")
        .replace("')", "");
      updateReport(type);
      // Hide the arrow button for month and year
      const arrowButton = document.querySelector(".arrow-button");
      if (type === "month" || type === "year") {
        arrowButton.style.display = "none";
      }
    });
  });

  updateReport("day"); // Initial report type
});
