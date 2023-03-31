import React from "react";
import { Doughnut } from "react-chartjs-2";

function CompoundInterestResults(props) {
  const exp = props.expenses;
  const inv = props.invest;
  const fun = props.fun;

  const chartOptions = {
    cutout: "50%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
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

  const data = {
    labels: ["Spese", "Investimenti", "Divertimento"],
    datasets: [
      {
        data: [exp, inv, fun],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <>
      <div className="chart">
        <Doughnut data={data} options={chartOptions} />
      </div>
      <p>
        Con un risparmio di {parseFloat(props.savings).toFixed(2)} €, devi avere
        come budget di spesa {props.expenses.toFixed(2)} €, come budget per gli
        investimenti {props.invest.toFixed(2)} € e come budget per il tuo
        divertimento puoi usare {props.fun.toFixed(2)} €.
      </p>
    </>
  );
}

export default CompoundInterestResults;
