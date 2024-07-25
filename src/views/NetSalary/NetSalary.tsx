import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
// import NetSalaryResults from "./NetSalaryResults";
import type { SalaryData, SalaryResults } from "../../types/types";

function NetSalary() {
	var [showResults, setShowResults] = useState(false);

	var [data, setData] = useState({ paymentsPerYear: 12 } as SalaryData);

	var [results, setResults] = useState({} as SalaryResults);

	// var [msg, setMsg] = useState("");

	function reset(event: React.MouseEvent<HTMLButtonElement>) {
		// Removes the result tables from the screen
		event.preventDefault();
		setShowResults(false);
	}

	type Echelon = {
		constant?: number;
		minVal: number;
		maxVal: number;
		percentage: number;
	};

	const irpefEchelons: Echelon[] = [
		{
			minVal: 0,
			maxVal: 28000,
			percentage: 0.23,
		},
		{
			minVal: 28000,
			maxVal: 50000,
			percentage: 0.35,
		},
		{
			minVal: 50000,
			maxVal: Number.MAX_SAFE_INTEGER,
			percentage: 0.43,
		},
	];

	const deductionEchelons: Echelon[] = [
		{
			minVal: 0,
			maxVal: 28000,
			percentage: 0.23,
		},
		{
			minVal: 28000,
			maxVal: 50000,
			percentage: 0.35,
		},
		{
			minVal: 50000,
			maxVal: Number.MAX_SAFE_INTEGER,
			percentage: 0.43,
		},
	];

	const comunalEchelons: Echelon[] = [
		{
			minVal: 0,
			maxVal: Number.MAX_SAFE_INTEGER,
			percentage: 0.008,
		},
	];

	const regionalEchelons: Echelon[] = [
		{
			minVal: 0,
			maxVal: Number.MAX_SAFE_INTEGER,
			percentage: 0.01,
		},
	];

	function calcEchelonValue(gross: number, echelons: Echelon[]): number {
		var net = 0;

		echelons.forEach((element) => {
			if (gross > element.minVal && gross <= element.maxVal) {
				net += (gross - element.minVal) * element.percentage;
			} else if (gross > element.maxVal) {
				net += (element.maxVal - element.minVal) * element.percentage;
			}
		});

		return net;
	}

	function calcPension(gross: number): number {
		return gross * 0.0919;
	}

	/* var regionData = {
		Aosta: [1, 2, 3, 4, 5],
		Piemonte: [1, 2, 3, 4, 5],
		EmiliaRomagna: [1, 2, 3, 4, 5],
		Campania: [1, 2, 3, 4, 5],
		Basilicata: [1, 2, 3, 4, 5],
		Sardegna: [1, 2, 3, 4, 5],
	}; */

	function calculate(event: React.MouseEvent<HTMLButtonElement>) {
		// Return the results object with data to be shown on the page
		event.preventDefault();
		setShowResults(true);

		// Input validation and data type control
		var grossYearlyIncome = data.grossYearlyIncome || 0;
		/* 		
        var comunalTax = data.comunalTax || 0;
		var regionalTax = data.regionalTax || 0; 
        */
		var months = data.paymentsPerYear;

		var pension = calcPension(grossYearlyIncome);

		var imposable = grossYearlyIncome - pension;

		var grossTaxes =
			calcEchelonValue(imposable, irpefEchelons) +
			calcEchelonValue(imposable, regionalEchelons) +
			calcEchelonValue(imposable, comunalEchelons);

		var deduction = calcEchelonValue(grossYearlyIncome, deductionEchelons);

		var netTaxes = Math.min(0, grossTaxes - deduction);

		var netYearlyIncome = imposable - netTaxes;

		var totalNetYearlyIncome = netYearlyIncome + Math.min(0, deduction);

		var grossMonthlyIncome = grossYearlyIncome / months;
		var netMonthlyIncome = totalNetYearlyIncome / months;

		var netMargin = netYearlyIncome / grossYearlyIncome;

		// Results object assignment

		const result: SalaryResults = {
			grossYearlyIncome: grossYearlyIncome,
			pension: pension,
			taxes: grossTaxes,
			netYearlyIncome: netYearlyIncome,
			grossMonthlyIncome: grossMonthlyIncome,
			netMonthlyIncome: netMonthlyIncome,
			deduction: deduction,
			totalNetYearlyIncome: totalNetYearlyIncome,
			netMargin: netMargin,
		};
		console.log(result, months);
		setResults(result);

		return;
	}

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		event.target.value = sanitizeInput(event.target.value);
		if (Number(event.target.value) < 0) event.target.value = "0";
		setData({
			...data,
			[event.target.name]: Number(event.target.value),
		});
	}

	return (
		<div>
			<h3>Calcolo stipendio netto</h3>
			<p>
				Qui puoi calcolare il tuo stipendio netto inserendo alcuni dati relativi al tuo
				stipendio lordo.
			</p>
			<div>
				<form>
					<Input
						name="grossYearlyIncome"
						label="RAL (Reddito Annuo Lordo"
						value={data.grossYearlyIncome || ""}
						placeholder="es. 15000"
						function={handleChange}
						postLabel="€"
						type="number"
					/>
					<Input
						name="regionalTax"
						label="Imposta Regionale"
						value={data.regionalTax || ""}
						placeholder="es. 1"
						function={handleChange}
						postLabel="%"
						type="number"
					/>
					<Input
						name="comunalTax"
						label="Imposta Comunale"
						value={data.comunalTax || ""}
						placeholder="es. 1"
						function={handleChange}
						postLabel="%"
						type="number"
					/>
					{/* <select
            id="region"
            name="region"
            value={data.region}
            onChange={handleChange}
          >
            <option value="Aosta">Valle d'Aosta</option>
            <option value="Piemonte">Piemonte</option>
            <option value="EmiliaRomagna">Emilia-Romagna</option>
            <option value="Basilicata">Basilicata</option>
          </select> */}
					<label htmlFor="paymentsPerYear">
						<p className="pre-label">Mensilità</p>
						<select
							id="payments"
							name="paymentsPerYear"
							value={data.paymentsPerYear}
							onChange={handleChange}>
							<option value={12} selected>
								12
							</option>
							<option value={13}>13</option>
							<option value={14}>14</option>
						</select>
					</label>

					<button onClick={calculate}>Calcola</button>
					<button onClick={reset}>Cancella</button>
				</form>

				<br />
				{showResults && (
					<>
						<div className="NetSalaryChart"></div>
						<div className="summary-table">
							<div className="head">
								<div>RAL</div>
								<div>Netto Annuo + Detrazioni</div>
								<div>Netto Mensile</div>
								<div>Contributi INPS</div>
								<div>IRPEF e Addizionali</div>
								<div>Detrazioni Lavoro Dipendente</div>
							</div>
							<div className="body">
								<div>{results.grossYearlyIncome} €</div>
								<div>{results.totalNetYearlyIncome.toFixed(2)} €</div>
								<div>{results.netMonthlyIncome.toFixed(2)} €</div>
								<div>{results.pension.toFixed(2)} €</div>
								<div>{results.taxes.toFixed(2)} €</div>
								<div>{results.deduction.toFixed(2)} €</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default NetSalary;
