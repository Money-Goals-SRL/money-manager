import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
import type { RentalData, RentalResult } from "../../types/types";

function Rental() {
	var [showResults, setShowResults] = useState(false);
	var [data, setData] = useState({} as RentalData);
	var [results, setResults] = useState({} as RentalResult);
	// var [msg, setMsg] = useState("");

	function blockFinancialInputs() {
		const checkbox = document.getElementsByName("useMortgage")[0] as HTMLInputElement;
		const rateInput = document.getElementsByName("rate")[0] as HTMLInputElement;
		const yearsInput = document.getElementsByName("years")[0] as HTMLInputElement;
		const downPayment = document.getElementsByName("downPayment")[0] as HTMLInputElement;

		rateInput.disabled = checkbox.checked;
		yearsInput.disabled = checkbox.checked;
		downPayment.disabled = checkbox.checked;
	}

	function reset(event: React.MouseEvent<HTMLButtonElement>) {
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

	function calculate(event: React.MouseEvent<HTMLButtonElement>) {
		// Return the results object with data to be shown on the page
		event.preventDefault();
		setShowResults(true);

		// VALIDAZIONE DEGLI INPUT
		// Input Acquisto immobile
		var buyPrice = data.buyPrice || 0;
		var tax = data.tax || 0;
		var agency = data.agency || 0;
		var otherCosts = data.otherCosts || 0;
		// Input Finanziamento operazione
		var downPayment = data.downPayment || 0;
		var principal = buyPrice - downPayment;
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
		// Input Reddito Immobile
		var grossRent = data.grossIncome || 0;
		var incomeTax = ((data.incomeTax || 0) * grossRent) / 100;
		var propertyTax = ((data.propertyTax || 0) * grossRent) / 100;
		var appreciation = (data.appreciation || 0) / 100;

		// GESTIONE DEI DATI E CALCOLI INTERMEDI
		// Acquisto iniziale dell'immobile
		let totalInitialCost = buyPrice + tax + agency + otherCosts;

		// Monthly payment calculation
		var payment = 0;
		if ((rate === 0 && months === 0) || months === 0) {
			payment = 0;
		} else if (rate === 0) {
			payment = principal / months;
		} else {
			payment = principal * ((rate * (1 + rate) ** months) / ((1 + rate) ** months - 1));
		}

		// Reddito immobile
		var netRent = grossRent - incomeTax - propertyTax;
		var initialYield = (netRent / downPayment) * 100 * 12;

		// CREAZIONE DEGLI ARRAY DEI RISULTATI
		// Initialization of results table arrays
		// Debito
		var paymentsArr = [];
		var interestArr = [];
		var totalInterestArr = [];
		var principalArr = [];
		var principalArrAux = [];
		var outstandingDebtArr = [];
		// Affitto
		var equityArr = [];
		var currentYieldArr = [];
		var homeValueArr = [];
		var incomeArr = [];
		// Helpers
		var array = [];

		// First elements of array
		payment = calcPayment(rate, months, principal);
		paymentsArr[0] = payment;
		interestArr[0] = principal * rate;
		totalInterestArr[0] = interestArr[0];
		principalArr[0] = payment - interestArr[0];
		principalArrAux[0] = payment - interestArr[0];
		outstandingDebtArr[0] = principal;
		equityArr[0] = downPayment;
		currentYieldArr[0] = initialYield;
		homeValueArr[0] = buyPrice;
		incomeArr[0] = netRent - interestArr[0];
		array[0] = 0;

		// Creation of the results table arrays
		for (var i = 1; i < months + 1; i++) {
			array.push(i);
			paymentsArr.push(payment);
			if (i === 0) {
				interestArr.push(principal * rate);
			} else {
				interestArr.push(outstandingDebtArr[i - 1] * rate);
			}
			principalArr.push(payment - interestArr[i]);
			if (i === 0) {
				outstandingDebtArr.push(principal - principalArr[i]);
			} else {
				outstandingDebtArr.push(Math.abs(outstandingDebtArr[i - 1] - principalArr[i]));
			}
			homeValueArr.push(homeValueArr[i - 1] * (1 + appreciation / 12));
			equityArr.push(homeValueArr[i] - outstandingDebtArr[i]);
			incomeArr.push(netRent - interestArr[i]);
			currentYieldArr.push((incomeArr[i] / equityArr[i]) * 100 * 12);
		}

		// Other results object calculations
		var cagr;
		if (principal === 0) {
			cagr = 0;
		} else {
			cagr =
				(((payment * months) / principal) **
					((1 / months) * (data.frequency === "month" ? 12 : 1)) -
					1) *
				100;
		}
		const totalAmount = payment * months;
		const totalInterest = payment * months - principal;
		const interestPercentage = ((payment * months) / principal - 1) * 100 || 0;

		// New parameters

		// Results object assignment

		const result: RentalResult = {
			homeValueArr: homeValueArr,
			equityArr: equityArr,
			totalInitialCost: totalInitialCost,
			currentYieldArr: currentYieldArr,
			paymentsArr: paymentsArr,
			interestArr: interestArr,
			principalArr: principalArr,
			outstandingDebtArr: outstandingDebtArr,
			totalAmount: totalAmount,
			payment: payment,
			totalInterest: totalInterest,
			interestPercentage: interestPercentage,
			principal: principal,
			cagr: cagr,
			frequency: data.frequency,
			realEstateValue: 0,
			inFlow: 0,
			outFlow: 0,
			netCashflow: 0,
		};

		setResults(result);

		return;
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.target.value = sanitizeInput(event.target.value);
		if (Number(event.target.value) < 0) event.target.value = "0";
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	}

	return (
		<div>
			<h3>Rendimento da Affitto Immobiliare</h3>
			<p>
				Qui puoi calcolare il rendimento di un investimento immobiliare a partire da una
				serie di input.
			</p>
			<div>
				<form>
					<div className="inputs-container">
						<div className="inputs-block">
							<h4>Acquisto Immobile</h4>
							<Input
								name="buyPrice"
								label="Costo d'Acquisto"
								value={data.buyPrice || 0}
								placeholder="es. 1000"
								function={handleChange}
								postLabel="€"
								type="number"
							/>
							<Input
								name="tax"
								label="Imposte sull'Acquisto"
								value={data.tax || 0}
								placeholder="es. 200"
								function={handleChange}
								postLabel="€"
								type="number"
							/>
							<Input
								name="agency"
								label="Agenzia Immobiliare"
								value={data.agency || 0}
								placeholder="es. 150"
								function={handleChange}
								postLabel="€"
								type="number"
							/>
							<Input
								name="otherCosts"
								label="Altri Costi"
								value={data.otherCosts || 0}
								placeholder="es. 150"
								function={handleChange}
								postLabel="€"
								type="number"
							/>
						</div>
						<div className="inputs-block">
							<h4>Finanziamento Operazione</h4>
							<Input
								name="downPayment"
								label="Equity Iniziale"
								value={data.downPayment || 0}
								placeholder="es. 1000"
								function={handleChange}
								postLabel="€"
								type="number"
							/>
							<label
								htmlFor="useMortgage"
								style={{ display: "flex", margin: "1em 0.5em" }}>
								<b>Non mi serve il Mutuo</b>
								<input
									style={{ width: "auto", margin: "auto" }}
									type="checkbox"
									id="useMortgage"
									name="useMortgage"
									onChange={blockFinancialInputs}></input>
							</label>
							<Input
								name="rate"
								label="Tasso di Interesse Mutuo"
								value={data.rate || ""}
								placeholder="es. 2,5"
								function={handleChange}
								postLabel="%"
								type="number"
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
						</div>
						<div className="inputs-block">
							<h4>Reddito dell'Immobile</h4>
							<Input
								name="grossIncome"
								label="Affitto Lordo"
								value={data.grossIncome || ""}
								placeholder="es. 1000"
								function={handleChange}
								postLabel="€"
								type="number"
							/>
							<Input
								name="incomeTax"
								label="Imposte sull'Affitto"
								value={data.incomeTax || ""}
								placeholder="es. 2,5"
								function={handleChange}
								postLabel="%"
								type="number"
							/>
							<Input
								name="propertyTax"
								label="Imposte sull'Immobile"
								value={data.propertyTax || ""}
								placeholder="es. 2,5"
								function={handleChange}
								postLabel="%"
								type="number"
							/>
							<Input
								name="appreciation"
								label="Apprezzamento Immobile"
								value={data.appreciation || ""}
								placeholder="es. 1.00"
								function={handleChange}
								postLabel="% / Anno"
								type="number"
							/>
						</div>
					</div>
					<button onClick={calculate}>Calcola</button>
					<button onClick={reset}>Cancella</button>{" "}
				</form>
				<br />
				{showResults && (
					<>
						<div style={{ color: "red" }}>
							<h3 style={{ color: "red" }}>
								ATTENZIONE: Calcolatore in costruzione, i risultati potrebbero
								essere sbagliati. Scrivimi su YouTube se vuoi segnalare un bug
							</h3>
						</div>{" "}
						<div className="summary-table">
							<div className="head">
								<div>Anno</div>
								<div>Valore Immobile</div>
								<div>Debito</div>
								<div>Equity</div>
								<div>ROE</div>
							</div>
							<div>
								{results.homeValueArr.map((_, i) => {
									return (
										<div className="body">
											<div>{i}</div>
											<div>{results.homeValueArr[i].toFixed(2)} €</div>
											<div>{results.outstandingDebtArr[i].toFixed(2)} €</div>
											<div>{results.equityArr[i].toFixed(2)} €</div>
											<div>{results.currentYieldArr[i].toFixed(2)} %</div>
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

export default Rental;
