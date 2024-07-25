import React from "react";
import type { MortgageResult } from "../../types/types";
// import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

function MortgageResults({ results }: { results: MortgageResult }) {
	const payments = results.paymentsArr;
	/* const principals = results.principalArr;
	const interests = results.interestArr;
	const outstandingDebt = results.outstandingDebtArr;
	const totalInterests = results.totalInterestArr; */

	/* const chartOptionsPayments = {
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
	}; */
	var arr = [];

	for (var i = 1; i <= payments.length; i++) {
		arr.push(i);
	}
	/* const dataPayments = {
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
	}; */
	/* const chartOptionsDebt = {
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
	}; */

	/* const dataDebt = {
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
	}; */
	return (
		<div style={{ display: "flex" }}>
			<div className="chart">
				{/* <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
					<VictoryBar
						style={{ data: { fill: "#c43a31" } }}
						data={outstandingDebt}
						domain={{ x: [0, arr.length], y: [0, Math.max(...outstandingDebt)] }}
					/>
					<VictoryBar
						style={{ data: { fill: "#f43a31" } }}
						data={totalInterests}
						domain={{ x: [0, arr.length], y: [0, Math.max(...totalInterests)] }}
					/>
				</VictoryChart> */}
				{/* <Line data={dataPayments} options={chartOptionsPayments} /> */}
			</div>
			<div className="chart">
				{/* <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
					<VictoryBar
						style={{ data: { fill: "#c43a31" } }}
						data={principals}
						domain={{ x: [0, arr.length], y: [0, Math.max(...principals)] }}
					/>
					<VictoryBar
						style={{ data: { fill: "#f43a31" } }}
						data={payments}
						domain={{ x: [0, arr.length], y: [0, Math.max(...payments)] }}
					/>
					<VictoryBar
						style={{ data: { fill: "#343a31" } }}
						data={interests}
						domain={{ x: [0, arr.length], y: [0, Math.max(...interests)] }}
					/>
				</VictoryChart> */}
				{/* <Line data={dataDebt} options={chartOptionsDebt} /> */}
			</div>
		</div>
	);
}

export default MortgageResults;
