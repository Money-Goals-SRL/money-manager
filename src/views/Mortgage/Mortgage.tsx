import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
import IRR from "../../Utilities/irr";
/* import MortgageResults from "./MortgageResults"; */
import type { CashFlow, MortgageData, MortgageResult } from "../../types/types";
import Barchart, { BarProps } from "../Components/Barchart";

function Mortgage() {
	// showResults: boolean value to manage the table on screen, if true results are shown.
	// data: object that manages the input field of the page form.
	// results: object that manages the calculations and the results tables shown on page.
	var [showResults, setShowResults] = useState(false);
	var [data, setData] = useState({} as MortgageData);
	var [results, setResults] = useState({} as MortgageResult);
	// var [msg, setMsg] = useState("");

	function reset(event: React.MouseEvent<HTMLElement>) {
		// Removes the result tables from the screen
		event.preventDefault();
		setShowResults(false);
	}

	function calcPayment(r: number, n: number, C: number) {
		// r: interest rate; n: number of periods; C: debt outstanding
		// function returns p: payment per period
		var p = 0;
		if ((r === 0 && n === 0) || n === 0) {
			p = 0;
		} else if (r === 0) {
			p = C / n;
		} else {
			p = C * ((r * (1 + r) ** n) / ((1 + r) ** n - 1));
		}
		return p;
	}

	function calculate(event: React.MouseEvent<HTMLElement>) {
		// Return the results object with data to be shown on the page
		event.preventDefault();
		setShowResults(true);

		// Input validation and data type control
		var principal = data.principal || 0;
		var months = data.years * 12 || 0;
		if (months === 0) {
			// Imposto il valore di default pari a 10 anni
			setData({ ...data, years: 10 });
			months = 10 * 12;
		}
		var rate = data.rate || 0;
		if (data.frequency === "month") {
			rate = rate / 12;
		} else {
			months = months / 12;
		}
		rate = rate / 100;
		var repaidPrincipal = data.repaidPrincipal || 0;

		// Monthly payment calculation
		var payment = 0;
		if ((rate === 0 && months === 0) || months === 0) {
			payment = 0;
		} else if (rate === 0) {
			payment = principal / months;
		} else {
			payment = principal * ((rate * (1 + rate) ** months) / ((1 + rate) ** months - 1));
		}

		// Initialization of results table arrays
		var paymentsArr = [];
		var interestArr = [];
		var totalInterestArr = [];
		var principalArr = [];
		var principalArrAux = [];
		var outstandingDebtArr = [];
		var array = [];

		// Creation of the results table arrays
		// First element
		payment = calcPayment(rate, months, principal);
		paymentsArr[0] = payment;
		interestArr[0] = principal * rate;
		totalInterestArr[0] = interestArr[0];
		principalArr[0] = payment - interestArr[0];
		principalArrAux[0] = payment - interestArr[0];
		outstandingDebtArr[0] = principal - principalArr[0];
		array[0] = 1;

		for (var i = 1; i < months; i++) {
			if (i % 12 === 0) {
				payment = calcPayment(rate, months - i, outstandingDebtArr[i - 1 - (i % 12)]);
			}
			paymentsArr.push(payment);
			interestArr.push(outstandingDebtArr[i - 1] * rate);
			totalInterestArr.push(totalInterestArr[i - 1] + interestArr[i]);
			if ((i + 1) % 12 === 0) {
				if (repaidPrincipal >= outstandingDebtArr[i - 1]) {
					repaidPrincipal = outstandingDebtArr[i - 1];
				}
				principalArr.push(payment - interestArr[i] + repaidPrincipal);
			} else {
				principalArr.push(payment - interestArr[i]);
			}
			principalArrAux.push(payment - interestArr[i]);
			outstandingDebtArr.push(Math.max(0, outstandingDebtArr[i - 1] - principalArr[i]));
			array.push(i + 1);
		}

		// Other results object calculations
		const totalAmount = principal + interestArr.reduce((a, b) => a + b, 0);
		const totalInterest = interestArr.reduce((a, b) => a + b, 0);
		const interestPercentage = (totalInterest / principal) * 100 || 0;
		var currentYear = new Date().getFullYear();
		var cf: CashFlow[] = [];
		paymentsArr.forEach((pm, i) => {
			if (i === 0) {
				cf.push({ date: new Date(currentYear, i, 1), value: -principal });
			} else {
				cf.push({
					date: new Date(currentYear, i + 1, 1),
					value: (i + 1) % 12 === 0 ? pm + repaidPrincipal : pm,
				});
			}
		});
		const cagr = principal === 0 ? 0 : IRR(cf) * 100;

		// Results object assignment
		const result: MortgageResult = {
			paymentsArr: paymentsArr,
			interestArr: interestArr,
			totalInterestArr: totalInterestArr,
			principalArr: principalArr,
			principalArrAux: principalArrAux,
			outstandingDebtArr: outstandingDebtArr,
			totalAmount: totalAmount,
			payment: payment,
			totalInterest: totalInterest,
			interestPercentage: interestPercentage,
			principal: principal,
			cagr: cagr,
			frequency: data.frequency,
		};

		console.log(result);

		setResults(result);

		return;
	}

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		event.target.value = sanitizeInput(event.target.value);
		if (Number(event.target.value) <= 0) event.target.value = "0";
		setData({
			...data,
			[event.target.name]: Number(event.target.value),
		});
	}

	function getChartData(arr: number[]): BarProps[] {
		var data: BarProps[] = [];
		arr.forEach((el, i) => {
			data.push({ xLabel: i, yLabel: el });
		});
		return data;
	}

	return (
		<div>
			<h3>Simulatore Mutuo</h3>
			<p>
				Qui puoi calcolare il piano di ammortamento di un mutuo alla francese, inserendo un
				tasso di interesse, un importo prestato e la durata del mutuo.
			</p>
			<div>
				<form>
					<Input
						name="principal"
						label="Capitale Prestato"
						value={data.principal || ""}
						placeholder="es. 1000"
						function={handleChange}
						postLabel="€"
						type="number"
					/>
					<Input
						name="rate"
						label="Tasso di Interesse"
						value={data.rate || ""}
						placeholder="es. 5 = 5%"
						function={handleChange}
						postLabel="%"
						type="number"
						step=".01"
					/>
					<Input
						name="years"
						label="Durata"
						value={data.years || ""}
						placeholder="es. 15"
						function={handleChange}
						postLabel="Anni"
						type="number"
					/>
					<label htmlFor="frequency">
						<p className="pre-label">Frequenza delle Rate</p>
						<div className="input-container">
							<select name="frequency" id="frequency" onChange={handleChange}>
								<option value="month" defaultValue="month">
									Mensile
								</option>
								<option value="year">Annuale</option>
							</select>
						</div>
					</label>
					<Input
						name="repaidPrincipal"
						label="Principale Restituito"
						value={data.repaidPrincipal || ""}
						placeholder="es. 2000"
						function={handleChange}
						postLabel="€/anno"
						type="number"
					/>
					<button onClick={calculate}>Calcola</button>
					<button onClick={reset}>Cancella</button>
				</form>
				<br />
				{showResults && (
					<>
						<div>
							<Barchart data={getChartData(results.interestArr)} />
							<Barchart data={getChartData(results.principalArr)} />
							<Barchart data={getChartData(results.outstandingDebtArr)} />
						</div>
						{/* <MortgageResults results={results} /> */}
						<div className="mortgageChart"></div>
						<div className="summary-table">
							<div className="head">
								<div>Rata del Mutuo</div>
								<div>Costo Totale</div>
								<div>Interessi Totali</div>
								<div>Interessi %</div>
								<div>CAGR</div>
							</div>
							<div className="body">
								<div>{results.paymentsArr[0].toFixed(2)} €</div>
								<div>{results.totalAmount.toFixed(2)} €</div>
								<div>{results.totalInterest.toFixed(2)} €</div>
								<div>{results.interestPercentage.toFixed(2)} %</div>
								<div>{results.cagr.toFixed(2)} %</div>
							</div>
						</div>
						<div className="summary-table">
							<div className="head">
								<div>{results.frequency === "month" ? "Mese" : "Anno"}</div>
								<div>Importo Rata</div>
								<div>Principale</div>
								<div>Interessi</div>
								<div>Debito Residuo</div>
							</div>
							<div>
								{results.paymentsArr.map((_, i) => {
									return (
										<div className="body">
											<div>{i + 1}</div>
											<div>{results.paymentsArr[i].toFixed(2)} €</div>
											<div>{results.principalArr[i].toFixed(2)} €</div>
											<div>{results.interestArr[i].toFixed(2)} €</div>
											<div>{results.outstandingDebtArr[i].toFixed(2)} €</div>
										</div>
									);
								})}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Mortgage;
