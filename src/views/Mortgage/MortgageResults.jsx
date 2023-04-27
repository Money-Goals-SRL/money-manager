import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function MortgageResults(props) {
  const payments = props.payments;
  const principals = props.principals;
  const interests = props.interests;
  const outstandingDebt = props.debts;
  const totalInterests = props.totalInterests;

  const chartOptionsPayments = {
    cutout: "40%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },

      tooltips: {
        callbacks: {
          label: function (context) {
            var label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed && context.parsed !== 0) {
              label += "€" + context.parsed.toFixed(2);
            }
            return label;
          },
        },
      },
    },
  };
  var arr = [];

  for (var i = 1; i <= payments.length; i++) {
    arr.push(i);
  }
  const dataPayments = {
    labels: arr,
    datasets: [
      {
        label: "Principale",
        data: principals,
        backgroundColor: "#FF6384",
        hoverBackgroundColor: ["#FF6384"],
      },
      {
        label: "Rata",

        data: payments,
        backgroundColor: "##36A2EB",
        hoverBackgroundColor: "##36A2EB",
      },
      {
        label: "Interessi",

        data: interests,
        backgroundColor: "#FFCE56",
        hoverBackgroundColor: "#FFCE56",
      },
    ],
  };
  const chartOptionsDebt = {
    cutout: "40%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },

      tooltips: {
        callbacks: {
          label: function (context) {
            var label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed && context.parsed !== 0) {
              label += "€" + context.parsed.toFixed(2);
            }
            return label;
          },
        },
      },
    },
  };

  const dataDebt = {
    labels: arr,
    datasets: [
      {
        label: "Debito Residuo",
        data: outstandingDebt,
        backgroundColor: "#FF6384",
        hoverBackgroundColor: ["#FF6384"],
      },
      {
        label: "Interessi Cumulativi",
        data: totalInterests,
        backgroundColor: "##36A2EB",
        hoverBackgroundColor: "##36A2EB",
      },
    ],
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="chart">
        <Line data={dataPayments} options={chartOptionsPayments} />
      </div>
      <div className="chart">
        <Line data={dataDebt} options={chartOptionsDebt} />
      </div>
    </div>
  );
}

export default MortgageResults;
