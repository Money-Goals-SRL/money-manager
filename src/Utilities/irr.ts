// var cashflows = [
//   { date: "2022-01-01", value: 10 },
//   { date: "2023-01-01", value: 0 },
//   { date: "2023-01-01", value: -11 },
//   { date: "2026-04-01", value: 0 },
//   { date: "2025-08-01", value: 0 },
// ];

import type { CashFlow } from "../types/types";

function IRR(cashflow: CashFlow[]) {
	// cashflow: array of objects of type {
	//     date: "yyyy-mm-gg",
	//     value: amount
	// }

	// Riordino la sequenza
	cashflow.sort((a, b) => {
		if (a.date < b.date) return -1;
		else return 1;
	});
	// cashflow.forEach((cf, i) => {
	// 	cf.value = parseFloat(cf.value);
	// });

	// Primo valore della sequenza
	var c_0 = cashflow[0].value;

	let totalValue = 0;
	cashflow.forEach((cf) => {
		totalValue += cf.value;
	});
	var c_t = totalValue - c_0;

	if (Math.abs(c_t) < Math.abs(c_0)) {
		return 0;
	}
	// Calcolo la somma dei valori che hanno lo stesso segno.
	var inSum = 0;
	var outSum = 0;

	cashflow.forEach((cf) => {
		cf.value > 0 ? (inSum += cf.value) : (outSum += cf.value);
	});

	if ((c_0 >= 0 && inSum > Math.abs(outSum)) || (c_0 < 0 && inSum < Math.abs(outSum))) {
		return 0;
	}

	if (c_0 > 0) {
		// Se la somma dei flussi di cassa è negativa
		// devo invertire i segni dei flussi di cassa

		for (var j = 0; j < cashflow.length; j++) {
			cashflow[j].value *= -1;
		}
	}

	var upperbound = 100;
	var lowerbound = -100;
	var tolerance = 0.0001;
	var trials = 100;
	var irr = 0;
	var NPV = 1;

	while (Math.abs(NPV) > tolerance && trials > 0) {
		const date0 = cashflow[0].date;
		NPV = 0;
		irr = (upperbound + lowerbound) / 2;
		for (var i = 0; i < cashflow.length; i++) {
			var cf = cashflow[i].value;
			var date = cashflow[i].date;
			var t = (date.getTime() - date0.getTime()) / (1000 * 60 * 60 * 24) / 365;
			NPV += cf / Math.pow(1 + irr, t);
		}
		if (NPV > 0) {
			lowerbound = irr;
		} else if (NPV < 0) {
			upperbound = irr;
		}
		console.log(NPV);

		trials--;
	}

	if (c_0 > 0) {
		return -irr;
	} else {
		return +irr;
	}
}

export default IRR;
