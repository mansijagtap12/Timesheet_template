import React, { useEffect } from "react";
import { Chart } from "chart.js";

// Import necessary components for charts
import {
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the components you will use
Chart.register(
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartJSComponent = () => {
  useEffect(() => {
    // To store chart instances
    let barChartInstance = null;
    let lineChartInstance = null;

    // Bar Chart
    if (barChartInstance) {
      barChartInstance.destroy(); // Destroy existing chart instance before creating a new one
    }
    barChartInstance = new Chart(document.getElementById("barChart"), {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Bar Dataset",
            data: [65, 59, 80, 81, 56],
            backgroundColor: [
              "rgb(242, 192, 203)", // Red
              "rgb(198, 226, 246)", // Blue
              "rgb(248, 222, 156)", // Yellow
              "rgb(186, 244, 244)", // Green
              "rgb(223, 209, 250)", // Purple
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)", // Red
              "rgba(54, 162, 235, 1)", // Blue
              "rgba(255, 206, 86, 1)", // Yellow
              "rgba(75, 192, 192, 1)", // Green
              "rgba(153, 102, 255, 1)", // Purple
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Monthwise In Time",
          },
        },
      },
    });

    // Line Chart
    if (lineChartInstance) {
      lineChartInstance.destroy(); // Destroy existing chart instance before creating a new one
    }
    lineChartInstance = new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Line Dataset",
            data: [65, 59, 80, 81, 56],
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Line Chart Example",
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (barChartInstance) barChartInstance.destroy();
      if (lineChartInstance) lineChartInstance.destroy();
    };
  }, []);

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">Employee Chart</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Dashboard</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Charts
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Bar Chart</h4>
              <canvas id="barChart" style={{ height: "230px" }}></canvas>
            </div>
          </div>
        </div>

        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Line Chart</h4>
              <canvas id="lineChart" style={{ height: "230px" }}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartJSComponent;
